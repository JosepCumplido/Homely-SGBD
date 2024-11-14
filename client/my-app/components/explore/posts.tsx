'use client'
import {PostCard} from "@/components/explore/postCard";
import {Home} from "shared/models/home";
/*import InfiniteScroll from '@/components/ui/infinite-scroll';*/
import {Loader2} from 'lucide-react';
import InfiniteScroll from "react-infinite-scroll-component";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";

export function Posts({homes, isLoading, hasMore, loadMore}: {
    homes: Home[],
    isLoading: boolean,
    hasMore: boolean,
    loadMore: () => void
}) {
    return (
        <div className={"flex flex-col overflow-y-scroll"}>
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
    )
}