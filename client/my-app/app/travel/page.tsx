"use client"; // Esto marca el archivo como un componente de cliente
import { useEffect, useState } from "react";
import { TravelCard } from "@/components/travel/travelCard";
import { TravelHistoryList } from "@/components/travel/travelHistoryList";
import { Reservation } from "shared/models/reservation";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";

export default function TravelHistory2() {
    // Estados para almacenar los datos del backend
    const [upcomingReservation, setUpcomingReservation] = useState<Reservation | null>(null);
    const [pastReservations, setPastReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Efecto para cargar los datos del backend
    useEffect(() => {
        const fetchTravelHistory = async () => {
            try {
                const userId = '1';
                setLoading(true);
                const response = await fetch(`/api/user/travel/getAllTravels?userId=${userId}`);
                const data = await response.json();

                const currentDate = new Date();

                const upcoming = data.filter((travel: Reservation) => {
                    const startDate = new Date(travel.start_date);
                    return !isNaN(startDate.getTime()) && startDate >= currentDate;
                });

                const past = data.filter((travel: Reservation) => {
                    const endDate = new Date(travel.end_date);
                    return !isNaN(endDate.getTime()) && endDate < currentDate;
                });

                setUpcomingReservation(upcoming.length > 0 ? upcoming[0] : null);
                setPastReservations(past);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching travel data:", err);
                setError("Failed to load travel data.");
                setLoading(false);
            }
        };

        fetchTravelHistory();
    }, []);


    // Renderizar en caso de error o carga
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                        <ArrowBack /> Back to explore
                    </Link>
                </h2>
                <div className={"w-full relative"}>
                    {/* Renderizar tarjeta del próximo viaje */}
                    {upcomingReservation ? (
                        <TravelCard upcomingReservation={upcomingReservation} />
                    ) : (
                        <p>No upcoming reservations.</p>
                    )}
                </div>
            </div>
            <div className={"flex-1 p-24"}>
                <div className={"space-y-12 overflow-y-auto h-full w-10/12"}>
                    <div className="space-y-8">
                        <h2 className={"font-bold text-2xl"}>Upcoming reservations</h2>
                        <TravelHistoryList travelHistoryList={upcomingReservation ? [upcomingReservation] : []} />
                    </div>
                    <div className="space-y-8">
                        <h2 className={"font-bold text-2xl"}>Where you've been</h2>
                        <TravelHistoryList travelHistoryList={pastReservations} />
                    </div>
                </div>
            </div>
        </div>
    );
}
