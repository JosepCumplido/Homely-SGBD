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
import Link from "next/link";

export function PostCard({home}: { home: Home }) {
    const [isFavorite, setIsFavorite] = useState(false);
    return (
        <Link href={`/home/${home.id}`}>
            <div className={"relative flex flex-col rounded-lg space-y-1 group"}>
                <div className="relative aspect-[27/25.5] overflow-hidden rounded-lg mb-1">
                    <Carousel className="relative rounded-lg w-full h-full">
                        <CarouselContent className={"h-full"}>
                            {home.imagesUrls.map((image, index) => (
                                <CarouselItem key={index} className={"h-full w-full"}>
                                    <Card className={"h-full"}>
                                        <CardContent className="flex items-center justify-center p-0 h-full">
                                            <Image src={`/uploads/${image}`} alt={"Card image"} width={540} height={720}
                                                   className={"object-cover w-full h-full rounded-lg"} priority/>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious
                            className={"absolute left-4 size-6 group-hover:!opacity-80 !opacity-0 transition-opacity duration-300"}/>
                        <CarouselNext
                            className={"absolute right-4 size-6 group-hover:!opacity-80 !opacity-0 transition-opacity duration-300"}/>
                    </Carousel>
                </div>
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={"absolute top-2 right-2 p-1"}
                    aria-label="Add to favorites"
                >
                    {isFavorite ? (
                        <HeartSolid
                            className="h-6 w-6 text-red-500 transform transition-transform duration-200 hover:scale-110"/>
                    ) : (
                        <HeartSolid
                            className="h-6 w-6 text-gray-500 transform transition-transform duration-200 hover:scale-110"
                            stroke={"white"}/>
                    )}
                </button>
                <div className={"flex flex-row justify-between"}>
                    <p className={"font-bold"}>{home.city}, {home.country}</p>
                    <span className={"flex flex-row space-x-1 items-center"}>
                    <StarSolid className={"h-4 w-4"}/>
                    <p className={"font-bold"}>{home.score}</p>
                </span>
                </div>
                <p className={"font-bold"}>€ {home.pricePerNight} <span className={"font-medium"}>night</span></p>
            </div>
        </Link>
    )
}