import {SearchBox} from "@/components/explore/searchBox";
import {CategoryFilter} from "@/components/explore/categoryFilter";
import {Separator} from "@/components/ui/separator";
import {Frame2xl} from "@/components/explore/frame-2xl";
import {Posts} from "@/components/explore/posts";

export default async function Home() {
    /*const response = await fetch("http://localhost:4000/user", { cache: 'no-store' })
    const users: User[] = await response.json()*/

    return (
        <>
            <div className={"flex flex-col space-y-6 justify-center p-14 m-auto"}>
                <Frame2xl>
                    <SearchBox/>
                </Frame2xl>
                <Separator orientation="horizontal"/>
                <Frame2xl>
                    <CategoryFilter></CategoryFilter>
                </Frame2xl>
                <Posts/>
            </div>
        </>
    );
}