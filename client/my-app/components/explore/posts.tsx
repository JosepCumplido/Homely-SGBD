'use client'
import {PostCard} from "@/components/explore/postCard";
import {Home} from "shared/models/home";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import React from "react";

export function Posts({homes, isLoading, hasMore, loadMore}: {
    homes: Home[],
    isLoading: boolean,
    hasMore: boolean,
    loadMore: () => void
}) {
    return (
        homes && homes.length > 0 ? (
            <div className={"flex flex-col gap-8 "}>
                <div className={"grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-6 py-6"}>
                    {homes.map((home, index) => (
                        <PostCard key={index} home={home}></PostCard>
                    ))}
                </div>
                {hasMore && <Button
                    onClick={loadMore}
                    className={"m-auto py-[1.25rem]"}
                >
                    {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>}
                    {isLoading ? "Loading" : "Load more"}
                </Button>}
            </div>
        ) : (
            <div className="text-center font-bold pt-10">
                No posts found.
            </div>
        )
    )
}