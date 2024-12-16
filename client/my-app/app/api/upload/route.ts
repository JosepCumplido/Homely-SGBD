import { NextRequest, NextResponse } from 'next/server';
import path from "path";
import fs from "fs/promises";

export const POST = async (req: NextRequest) => {
    try {
        // Obtenim el contingut de la petició
        const formData = await req.formData();
        const file = formData.get("file");  // El fitxer que rep la petició

        if (!file  || !(file instanceof Blob)) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        if (!file.type.startsWith("image/")) {
            return NextResponse.json({ error: "Invalid file type." }, { status: 400 });
        }

        // Si el fitxer es tracta com a un blob, cal tractar-lo adequadament
        const buffer = await file.arrayBuffer();  // Obtenir el contingut del fitxer en format buffer
        const filename = Date.now() + file.name.replaceAll(" ", "_");  // Generar un nom únic per al fitxer
        const filePath = path.join(process.cwd(), "public/uploads", filename);  // Ruta per desar el fitxer

        // Escrivim el fitxer al directori d'uploads
        await fs.writeFile(filePath, Buffer.from(buffer));  // Escrivim el fitxer a la carpeta pública

        // Retornar la URL pública per accedir al fitxer carregat
        const imageUrl = `${filename}`;
        return NextResponse.json({ message: "Success", url: imageUrl, status: 201 });
    } catch (error) {
        console.error("Error occurred while uploading file:", error);
        return NextResponse.json({ message: "Failed", status: 500 });
    }
};