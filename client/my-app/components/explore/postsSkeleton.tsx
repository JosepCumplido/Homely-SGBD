import React from "react";
import {PostCardSkeleton} from "@/components/explore/postCardSkeleton";

export function PostsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-6 py-6">
            {Array.from({ length: 60 }).map((_, i) => (
                <PostCardSkeleton key={i} />
            ))}
        </div>
    );
}