import Image from 'next/image'
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {TravelCard} from '@/components/travel/TravelCard'

export default function TravelHistory2() {
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
        <div className="flex flex-row w-full h-full">
            <div className={"flex-auto bg-blue-200 relative"}>
                <div className={"absolute m-auto"}>
                    <TravelCard/>
                </div>
            </div>
            <div className={"flex-auto bg-blue-700"}></div>
        </div>
    )
}