"use client"; // Esto marca el archivo como un componente de cliente
import {useEffect, useState} from "react";
import {TravelCard} from "@/components/travel/travelCard";
import {TravelHistoryList} from "@/components/travel/travelHistoryList";
import {Reservation} from "shared/models/reservation";
import Link from "next/link";
import {ArrowBack} from "@mui/icons-material";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/authContext";
import {ReservationsResponse} from 'shared/data/reservationsRequest'
import {Button} from "@/components/ui/button";

export default function TravelHistory2() {
    const {user, isAuthenticated} = useAuth();
    const router = useRouter();

    const [upcomingReservation, setUpcomingReservation] = useState<Reservation>();
    const [upcomingReservationsList, setUpcomingReservationsList] = useState<Reservation[]>([]);
    const [pastReservationsList, setPastReservationsList] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        const fetchTravelHistory = async () => {
            try {
                setLoading(true);
                console.log(user?.username)
                if (user != null) {
                    const response: Response = await fetch(`http://localhost:4000/user/reservations/${user.username}`);

                    if (response.ok) {
                        const result: ReservationsResponse = await response.json();
                        if (result.upcomingReservations.length > 0) {
                            setUpcomingReservation(result.upcomingReservations[0]);
                            setUpcomingReservationsList(result.upcomingReservations.slice(1, result.upcomingReservations.length));
                        }
                        setPastReservationsList(result.pastReservations);
                        console.log(`Results: ${JSON.stringify(result.upcomingReservations[0])}`);
                    }

                    setLoading(false);
                }
            } catch (err) {
                console.error("Error fetching travel data:", err);
                setError("Failed to load travel data.");
                setLoading(false);
            }
        };

        fetchTravelHistory();
    }, [user]);

    return (
        <div className="flex flex-row w-full h-full">
            <div className={"flex-1 p-20 space-y-8 relative"}>
                <h2 className={"font-bold text-2xl w-1/2 m-auto relative"}>
                    Upcoming reservation
                    <Link
                        href={"/"}
                        className={
                            "absolute -top-16 -left-4 font-normal transition-all duration-200 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                        }
                    >
                        <ArrowBack/> Back to explore
                    </Link>
                </h2>
                <div className={"w-full relative"}>
                    {upcomingReservation != undefined ? (
                        <TravelCard upcomingReservation={upcomingReservation}/>
                    ) : (
                        <Link href={"/"} className={"block w-1/2 m-auto"}>
                            <Button>Book your next dream home</Button>
                        </Link>
                    )}
                </div>
            </div>
            <div className={"flex-1 p-24"}>
                <div className={"space-y-12 overflow-y-auto h-full w-10/12"}>
                    <div className="space-y-8">
                        <h2 className={"font-bold text-2xl"}>Upcoming reservations</h2>
                        {upcomingReservationsList.length > 0 ? (
                            <TravelHistoryList travelHistoryList={upcomingReservationsList}/>
                        ) : (
                            <p>Nothing coming up</p>
                        )}

                    </div>
                    <div className="space-y-8">
                        <h2 className={"font-bold text-2xl"}>Where you've been</h2>
                        {pastReservationsList.length > 0 ? (
                            <TravelHistoryList travelHistoryList={pastReservationsList}/>
                        ) : (
                            <p>No history available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
