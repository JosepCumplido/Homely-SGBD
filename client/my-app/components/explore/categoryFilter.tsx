import * as React from "react"

import {Card, CardContent} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {clsx} from "clsx";

export function CategoryFilter({categories, selectedCategory, onCategoryChange}: {categories: string[], selectedCategory: string|null, onCategoryChange: (category: string) => void }) {
    return (
        <div className={"flex flex-row space-x-4 items-center justify-center w-full"}>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {categories.map((value, index) => (
                        <CarouselItem key={index} className={clsx("md:basis-1/2 lg:basis-1/12", {'bg-black': selectedCategory === value})} onClick={() => onCategoryChange(value)}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="font-semibold">{value}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    )
}
