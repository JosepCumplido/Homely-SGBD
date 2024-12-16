
import React from "react";
import {HeartIcon as HeartSolid, StarIcon as StarSolid} from "@heroicons/react/24/solid";
import {Skeleton} from "@/components/ui/skeleton";

export function PostCardSkeleton() {

    return (
        <div className={"relative flex flex-col rounded-xl space-y-1 group"}>
            <Skeleton className="relative aspect-[27/25.5] overflow-hidden rounded-lg mb-1"></Skeleton>
            <div className={"flex flex-row justify-between"}>
                <Skeleton className={"w-2/3 h-5"}></Skeleton>
                <Skeleton className={"space-x-1 w-1/6 h-5"}/>
            </div>
            <Skeleton className={"w-1/2 h-5"}></Skeleton>

        </div>
    )
}