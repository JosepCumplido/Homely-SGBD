import Image from 'next/image'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TravelHistory() {
    const upcomingTravel = {
        destination: "Lisboa",
        dates: "20 de nov. - 23 de nov.",
        imageUrl: "/images/lisboa.webp",
        flights: [
            {
                airline: "Vueling",
                logo: "/placeholder.svg?height=40&width=40&text=Vueling",
                from: "Barcelona (BCN)",
                to: "Lisboa (LIS)",
                departure: "20 de nov., 7:25",
                arrival: "20 de nov., 8:30",
                price: "€ 168,99"
            },
            {
                airline: "Vueling",
                logo: "/placeholder.svg?height=40&width=40&text=Vueling",
                from: "Lisboa (LIS)",
                to: "Barcelona (BCN)",
                departure: "23 de nov., 21:05",
                arrival: "23 de nov., 23:55",
                price: "Included"
            }
        ]
    }

    const pastTravels = [
        {
            destination: "Paris",
            dates: "10 de oct. - 15 de oct.",
            imageUrl: "/images/paris.webp"
        },
        {
            destination: "Roma",
            dates: "5 de sep. - 10 de sep.",
            imageUrl: "/images/roma.webp"
        },
        {
            destination: "Londres",
            dates: "1 de ago. - 7 de ago.",
            imageUrl: "/images/londres.webp"
        }
    ]

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Reserves i viatges</h1>
            <div className="flex justify-end mb-2">
                <a href="#" className="text-blue-600 hover:underline">No trobes una reserva?</a>
            </div>

            <Card className="mb-8">
                <CardHeader className="p-0">
                    <div className="relative h-64 w-full">
                        <Image
                            src={upcomingTravel.imageUrl}
                            alt={upcomingTravel.destination}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                        <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full">
                            <h2 className="text-3xl font-bold">{upcomingTravel.destination}</h2>
                            <p>{upcomingTravel.dates}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {upcomingTravel.flights.map((flight, index) => (
                        <div key={index} className="flex items-center justify-between py-4">
                            <div className="flex items-center">
                                <Image
                                    src={flight.logo}
                                    alt={flight.airline}
                                    width={40}
                                    height={40}
                                    className="rounded-full mr-4"
                                />
                                <div>
                                    <p className="font-semibold">{`${flight.from} → ${flight.to}`}</p>
                                    <p className="text-sm text-gray-600">{`${flight.departure} - ${flight.arrival} · Directe · ${flight.airline}`}</p>
                                </div>
                            </div>
                            <p className="font-bold">{flight.price}</p>
                        </div>
                    ))}
                    <p className="text-green-600 mt-4">Confirmada · 1 passatger</p>
                </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-4">Viatges anteriors</h2>
            <ScrollArea className="h-96 w-full rounded-md border">
                {pastTravels.map((travel, index) => (
                    <div key={index}>
                        <Card className="mb-4">
                            <CardHeader className="p-0">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={travel.imageUrl}
                                        alt={travel.destination}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-t-lg"
                                    />
                                    <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full">
                                        <h3 className="text-2xl font-bold">{travel.destination}</h3>
                                        <p>{travel.dates}</p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                        {index < pastTravels.length - 1 && <Separator className="my-4" />}
                    </div>
                ))}
            </ScrollArea>
        </div>
    )
}