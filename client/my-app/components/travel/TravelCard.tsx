"use client"

import Image from "next/image";
import React, {useState} from "react";
import {HeartIcon as HeartSolid} from '@heroicons/react/24/solid';
import {StarIcon as StarSolid} from '@heroicons/react/24/solid'

import {Card, CardContent} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {Home} from "shared/models/home";
import {Share} from "lucide-react";

const imageUrl = "/explore/posts/post_1_1.webp"

export function TravelCard() {
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

    return (
        <div className={"relative flex flex-col rounded-xl space-y-1 group h-1/2 w-1/2"}>
            <div className="relative aspect-[27/25.5] overflow-hidden rounded-lg mb-1">
                <Image src={imageUrl} alt={"Card image"} width={540} height={720}
                       className={"object-cover w-full h-full"} priority/>
            </div>
            <button
                className={"absolute top-2 right-2 p-1 opacity-90"}
                aria-label="Share"
            >
                <Share className="h-6 w-6 transform transition-transform duration-200 hover:scale-110 border-1.5 border-black border-opacity-90 p-1 rounded-full"/>
            </button>
            <div className={"flex flex-row justify-between"}>
                <p className={"font-bold"}>{upcomingTravel.city}, {upcomingTravel.country}</p>
                <p className={"font-bold"}>€ {upcomingTravel.pricePerNight} <span
                    className={"font-medium"}>night</span></p>
            </div>
            <p className={"text-gray-400"}>{upcomingTravel.fromDate} - {upcomingTravel.toDate}</p>
        </div>
    )
}