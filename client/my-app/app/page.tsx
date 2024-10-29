'use client'
import {SearchBox} from "@/components/explore/searchBox";
import {CategoryFilter} from "@/components/explore/categoryFilter";
import {Separator} from "@/components/ui/separator";
import {ContentFrame} from "@/components/explore/content-frame";
import {Posts} from "@/components/explore/posts";
import type {Home} from '../../../shared/models/home';
import {useState} from "react";

const categories: string[] = ["All", "Beach", "Countryside", "Cabins", "Boats", "Mansions", "Treehouses", "Castles", "Skiing", "Lake", "Luxe", "Mountain", "Riad", "Camping"]

export default function Home() {
    const [homes, setHomes] = useState<Home[]>([])
    const [priceRange, setPriceRange] = useState<number[]>([20, 540])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [searchResults, setSearchResults] = useState(0)

    const searchHomes = async (priceRange: number[]) => {
        try {
            const response = await fetch('http://localhost:4000/home/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(priceRange)
            });

            if (!response.ok) {
                new Error('Network response failed');
            }

            const homes: Home[] = await response.json();
            setSearchResults(homes.length);
            setHomes(homes)
        } catch (error) {
            console.error("Error al cercar cases:", error);
        }
    }

    const onPriceRangeChange = (range: number[]) => {
        setPriceRange(range)
        searchHomes(range)
    }

    searchHomes(priceRange)

    return (
        <>
            <div className={"flex flex-col space-y-6 justify-center py-14 m-auto"}>
                <ContentFrame>
                    <SearchBox
                        priceRange={priceRange}
                        onPriceRangeChange={onPriceRangeChange}
                        searchResults={searchResults}
                    />
                </ContentFrame>
                <Separator orientation="horizontal"/>
                <ContentFrame>
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />
                    <Posts homes={homes}/>
                </ContentFrame>
            </div>
        </>
    );
}