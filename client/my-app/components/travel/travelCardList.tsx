import React from "react";
import Image from "next/image";
import type {Reservation} from "shared/models/reservation"
import {User} from "lucide-react";

export function TravelCardList({reservation}: { reservation: Reservation }) {
    const fromDateString = new Date(reservation.fromDate).toLocaleDateString("es-ES");
    const toDateString = new Date(reservation.toDate).toLocaleDateString("es-ES");
    return (
        <div className={"flex flex-row gap-4 h-20 w-[70%] max-w-[500px]"}>
            <Image
                src={reservation.home.imagesUrls && reservation.home.imagesUrls.length > 0
                    ? "/uploads/" + reservation.home.imagesUrls[0]
                    : "/uploads/default_image.webp"}
                alt={"Card image"} width={540} height={720}
                className={"h-20 w-20 aspect-square rounded-lg"} priority/>
            <div className={"flex flex-col gap-2 w-full"}>
                <div className={"flex flex-row justify-between"}>
                    <p className={"font-bold"}>{reservation.home.city}, {reservation.home.country}</p>
                    <span className={"flex flex-row space-x-1 items-center"}>
                    <User className={"h-4 w-4"}/>
                    <p className={"font-bold"}>{reservation.numberOfGuests}</p>
                </span>
                </div>
                <p className={"text-gray-400 text-sm"}>{fromDateString} - {toDateString}</p>
            </div>
        </div>
    )
}