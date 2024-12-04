import {TravelCard} from '@/components/travel/travelCard'
import {TravelHistoryList} from "@/components/travel/travelHistoryList";
import {Reservation} from "shared/models/reservation"
import Link from "next/link";
import {ArrowBack} from "@mui/icons-material";

export default function TravelHistory2() {
    const travelHistoryList: Reservation[] = [
        {
            city: "Lisboa",
            country: "Portugal",
            fromDate: new Date('2024-12-21'),
            toDate: new Date('2024-12-07'),
            imageUrl: "post_1_2.webp",
            pricePerNight: 100,
            numberOfGuests: 4,
        },
        {
            city: "Lisboa",
            country: "Portugal",
            fromDate: new Date('2025-01-02'),
            toDate: new Date('2024-12-07'),
            imageUrl: "post_1_1.webp",
            pricePerNight: 100,
            numberOfGuests: 2,
        },
        {
            city: "Lisboa",
            country: "Portugal",
            fromDate: new Date('2025-03-14'),
            toDate: new Date('2024-12-07'),
            imageUrl: "post_1_3.webp",
            pricePerNight: 100,
            numberOfGuests: 3,
        },

    ]

    return (
        <div className="flex flex-row w-full h-full">
            <div className={"flex-1 p-20 space-y-8 relative"}>
                <h2 className={"font-bold text-2xl w-1/2 m-auto relative"}>Upcoming reservation
                    <Link href={"/"} className={"absolute -top-16 -left-4 font-normal transition-all duration-200 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"}><ArrowBack/> Back to explore</Link>
                </h2>
                <div className={"w-full relative"}>
                    <TravelCard upcomingReservation={travelHistoryList[0]}/>
                </div>
            </div>
            <div className={"flex-1 p-24"}>
                <div className={"space-y-12 overflow-y-auto h-full w-10/12"}>
                    <div className="space-y-8">
                        <h2 className={"font-bold text-2xl"}>Upcoming reservations</h2>
                        <TravelHistoryList travelHistoryList={travelHistoryList}/>
                    </div>
                    <div className="space-y-8">
                        <h2 className={"font-bold text-2xl"}>Where you've been</h2>
                        <TravelHistoryList travelHistoryList={travelHistoryList}/>
                    </div>
                </div>
            </div>
        </div>
    )
}