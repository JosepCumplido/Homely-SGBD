import {PostCard} from "@/components/explore/postCard";
import {Home} from "../../../../shared/models/home";

export function Posts({homes}: {homes: Home[] }) {
    return (
        <div className={"grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-6 p-6"}>
            {homes.map((home, index) => (
                <PostCard key={index} home={home}></PostCard>
            ))}
        </div>
    )
}