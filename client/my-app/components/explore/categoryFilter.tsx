import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {clsx} from "clsx";
import {Category} from "shared/models/category";

export function CategoryFilter({categories, selectedCategory, onCategoryChange}: {
    categories: Category[],
    selectedCategory: Category | null,
    onCategoryChange: (category: Category) => void
}) {
    return (
        <div className={"flex flex-row space-x-4 items-center justify-center w-full"}>
            <Carousel opts={{align: "start"}} className="w-full">
                <CarouselContent className={"flex gap-8 ml-6"}>
                    {categories.map((value, index) => (
                        <CarouselItem
                            key={index}
                            className={clsx({'border-b-2 border-b-gray-900 border-solid': (selectedCategory != null && selectedCategory.name === value.name)})}
                            onClick={() => onCategoryChange(value)}
                        >
                            <div className="flex flex-col gap-2 items-center justify-center">
                                {value.icon}
                                <span className={clsx({'font-semibold': (selectedCategory != null && selectedCategory.name === value.name)})}>{value.label}</span>
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
