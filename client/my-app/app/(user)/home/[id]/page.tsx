import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
    Building2,
    CableCar,
    Castle,
    Fence,
    Gem,
    Mountain,
    Sailboat,
    TentTree,
    TreePalm,
    TreePine,
    Waves,
    Euro,
    MapPin
} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Home} from "shared/models/home";
import {useRouter} from "next/router";

const fetchHomeData = async (id: string) => {
    const res = await fetch(`http://88.223.95.53:4000/home/${id}`, {cache: 'no-store'});
    if (!res.ok) return null;
    return res.json();
};

export default async function HomePage({params}: { params: { id: string } }) {
    const home: Home | null = await fetchHomeData(params.id);

    if (!home) {
        notFound();
    }

    console.log(home)
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-3xl font-bold">{home.city}, {home.country}</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                    {home.categories && home.categories.length > 0 ? (
                        home.categories.map((category, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-2">
                                <span>{category}</span>
                            </Badge>
                        ))
                    ) : (
                        <span className="text-muted-foreground">No categories available</span>
                    )}
                </div>
            </div>

            <Carousel className="w-full max-w-4xl mx-auto mb-8">
                <CarouselContent>
                    {home.imagesUrls && home.imagesUrls.length > 0 ? (
                        home.imagesUrls.map((imageName, index) => (
                            <CarouselItem key={index}>
                                <div className="relative aspect-video">
                                    <Image
                                        src={`/uploads/${imageName}`}
                                        alt={`Image of home in ${home.city}`}
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))
                    ) : (
                        <CarouselItem>
                            <div className="relative aspect-video bg-muted flex items-center justify-center">
                                <span className="text-muted-foreground">No images available</span>
                            </div>
                        </CarouselItem>
                    )}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>About this place</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="features">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="features">Features</TabsTrigger>
                                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                            </TabsList>
                            <TabsContent value="features">
                                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                    {home.features && home.features.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-2">
                                            {home.features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <Badge variant="outline">{feature}</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground">No features available</span>
                                    )}
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="amenities">
                                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                    {home.amenities && home.amenities.length > 0 ? (
                                        <ul className="grid grid-cols-2 gap-2">
                                            {home.amenities.map((amenity, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <Badge variant="outline">{amenity}</Badge>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="text-muted-foreground">No amenities available</span>
                                    )}
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Booking Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold">{`€ ${home.pricePerNight}`}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">per night</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="text-blue-600" size={20} color={"black"}/>
                                <span>{home.city}, {home.country}</span>
                            </div>
                            <div className="flex-col items-stretch">
                                <Link href={`/chat?chat=${home.hostUsername}`} className="w-full">
                                    <Button variant="outline" className="w-full mb-4">Message host</Button>
                                </Link>
                                <Link href={`/reservation?home=${home.id}`} className="w-full">
                                    <Button className="w-full">Reserve now</Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

