import Image from 'next/image'
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"

export default function TravelHistory() {
    // TODO type reserva
    const upcomingTravel = {
        city: "Lisboa",
        country: "Portugal",
        fromDate: "20 de nov.",
        toDate: "23 de nov.",
        cityImageUrl: "/images/lisboa.webp",
        numberOfNights: 3, // TODO calcul
        pricePerNight: 100,
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
        <div className="px-[5vw] m-auto pb-24 w-full h-full overflow-y-scroll">
            <h1 className="text-3xl font-bold mb-4">Reserves i viatges</h1>
            <div className="flex justify-end mb-2">
                <p className="text-blue-600 hover:underline cursor-pointer">No trobes una reserva?</p>
            </div>

            <Card className="mb-8">
                <CardHeader className="p-0">
                    <div className="relative h-64 w-full">
                        <Image
                            src={upcomingTravel.cityImageUrl}
                            alt={upcomingTravel.city}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                        <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full">
                            <h2 className="text-3xl font-bold">{upcomingTravel.city}, {upcomingTravel.country}</h2>
                            <p>{upcomingTravel.fromDate} - {upcomingTravel.toDate}</p>
                        </div>
                    </div>
                </CardHeader>
                {/*<CardContent>
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center">
                            <div>
                            </div>
                        </div>
                        <p className="font-bold">${upcomingTravel.pricePerNight*upcomingTravel.numberOfNights}</p>
                    </div>
                    <p className="text-green-600 mt-4">Confirmada · 1 passatger</p>
                </CardContent>*/}
            </Card>

            <h2 className="text-2xl font-bold mb-4">Viatges anteriors</h2>
            <div className="h-full w-full rounded-md border mb-4">
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
                                    <div
                                        className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full">
                                        <h3 className="text-2xl font-bold">{travel.destination}</h3>
                                        <p>{travel.dates}</p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                        {index < pastTravels.length - 1 && <Separator className="my-4"/>}
                    </div>
                ))}
            </div>
        </div>
    )
}