import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface PhotoUploaderProps {
    onPhotosChange: (photos: File[]) => void;
    maxFiles?: number; // Opcional: per configurar el màxim de fitxers
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onPhotosChange, maxFiles = 10 }) => {
    const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
        setUploadedPhotos((prev) => [...prev, ...acceptedFiles]);
        onPhotosChange([...uploadedPhotos, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles,
    });

    return (
        <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold leading-none tracking-tight">Add Images</p>
            <div
                {...getRootProps()}
                className="border-dashed border-2 border-gray-400 rounded-md p-4 text-center cursor-pointer hover:border-gray-600"
            >
                <input {...getInputProps()} />
                <p>Drag & drop photos here, or click to select files</p>
            </div>
            <div className="flex flex-wrap gap-3">
                {uploadedPhotos.map((photo, index) => (
                    <div key={index} className="w-24 h-24 relative border border-gray-300 rounded overflow-hidden">
                        <img
                            src={URL.createObjectURL(photo)}
                            alt="Uploaded"
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
