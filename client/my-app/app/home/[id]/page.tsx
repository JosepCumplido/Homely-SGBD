import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Home = {
    id: number,
    city: string,
    country: string,
    imagesUrls: string[],  // Aquí continuem amb l'array d'URLs d'imatges
    pricePerNight: number,
    score: number,
    features: string[],
    amenities: string[],
    categories: string[]
}

const fetchHomeData = async (id: string) => {
    const res = await fetch(`http://localhost:4000/home/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
};

export default async function HomePage({ params }: { params: { id: string } }) {
    const home: Home | null = await fetchHomeData(params.id);

    if (!home) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{home.city}, {home.country}</h1>

            <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {home.imagesUrls.map((imageName, index) => (
                        // Ens construïm la ruta de la imatge a partir del nom del fitxer
                        <Image
                            key={index}
                            src={`/uploads/${imageName}`}  // Afegim la ruta correcta a la imatge
                            alt={`Image of home in ${home.city}`}
                            width={500}
                            height={300}
                            className="rounded-lg object-cover w-full h-64"
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold mb-2">${home.pricePerNight} <span className="text-sm font-normal">per night</span></p>
                        <div className="space-y-2">
                            {home.features.map((feature, index) => (
                                <Badge key={index} variant="secondary">{feature}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Amenities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside">
                            {home.amenities.map((amenity, index) => (
                                <li key={index}>{amenity}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {home.categories.map((category, index) => (
                            <Badge key={index} variant="outline">{category}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
