"use client"

import Image from "next/image";
import React from "react";
import {Share} from "lucide-react";
import {Reservation} from "shared/models/reservation"
import {differenceInDays} from "date-fns";

export function TravelCard({upcomingReservation} : {upcomingReservation: Reservation}) {
    const today = new Date()
    return (
        <div className={"relative flex flex-col rounded-xl space-y-1 group h-1/2 w-1/2 m-auto"}>
            <div className="relative aspect-[27/25.5] overflow-hidden rounded-lg mb-1">
                <Image src={"/explore/posts/" + upcomingReservation.imageUrl} alt={"Card image"} width={540} height={720}
                       className={"object-cover w-full h-full"} priority/>
            </div>
            <button
                className={"absolute top-3 right-3 p-1.5 opacity-90 rounded-full bg-zinc-200 border-1.5 border-black border-opacity-90 transform transition-transform duration-200 hover:scale-105"}
                aria-label="Share"
            >
                <Share className="h-4 w-4"/>
            </button>
            <div
                className={"absolute top-3 left-3 px-3 py-0.5 opacity-90 rounded-full bg-zinc-200 border-1.5 border-black border-opacity-90"}
                aria-label="Share"
            >
                <p className={"text-sm"}>{differenceInDays(upcomingReservation.fromDate, today)} days left</p>
            </div>
            <div className={"flex flex-row justify-between"}>
                <p className={"font-bold"}>{upcomingReservation.city}, {upcomingReservation.country}</p>
                <p className={"font-bold"}>€ {upcomingReservation.pricePerNight} <span
                    className={"font-medium"}>night</span></p>
            </div>
            <p className={"text-gray-400 text-sm"}>{upcomingReservation.fromDate.toDateString()} - {upcomingReservation.toDate.toDateString()}</p>
        </div>
    )
}