'use client'

import {PostCard} from "@/components/explore/postCard";
import {Home} from "shared/models/home";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import React, {useCallback, useEffect, useState} from "react";
import {SearchRequest} from "shared/data/searchRequest";
import {Category} from "shared/models/category";
import {fetchPosts} from "@/lib/data";
import {PostsSkeleton} from "@/components/explore/postsSkeleton";

export function Posts({
                          searchCity,
                          guestsNumber,
                          searchCategory,
                          searchPriceRange,
                          selectedFeaturesList,
                          selectedAmenitiesList,
                          onSetSearchResultsNumber
                      }: {
    searchCity: string | null,
    guestsNumber: number | undefined,
    searchCategory: Category | null,
    searchPriceRange: number[],
    selectedFeaturesList: string[],
    selectedAmenitiesList: string[],
    onSetSearchResultsNumber: (results: number) => void,
}) {
    const [homes, setHomes] = useState<Home[]>([])
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const limit = 6

    const searchHomes = useCallback(async (isLoadMore: boolean = false) => {
        setIsLoading(true);

        // Si és una crida per carregar més, incrementa la pàgina; en cas contrari, reinicia la pàgina a 0
        const searchPage = isLoadMore ? page + 1 : 0;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Category " + (searchCategory?.name ?? null))
        const request = new SearchRequest(searchPage, limit, searchCity, guestsNumber, searchCategory?.name ?? null, searchPriceRange, selectedFeaturesList, selectedAmenitiesList)

        try {
            const response = await fetch('http://localhost:4000/home/search', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(request),
            });

            if (!response.ok) new Error('Network response failed');

            const searchResponse = await response.json();
            console.log(searchResponse.homes)

            setHomes(prevHomes => (isLoadMore ? [...prevHomes, ...searchResponse.homes] : searchResponse.homes));
            setPage(searchPage);
            onSetSearchResultsNumber(searchResponse.homes.length);
            setHasMore(searchResponse.homes.length > 0);
        } catch (error) {
            console.error("Error al cercar cases:", error);
            setHasMore(false)
        } finally {
            setIsLoading(false)
        }
    }, [page, searchCity, guestsNumber, searchCategory, searchPriceRange, selectedAmenitiesList, selectedFeaturesList]);

    // Funció per executar la cerca quan els filtres canvien
    useEffect(() => {
        // Si canvia algun filtre, torna a cercar des de la pàgina 0 sense `isLoadMore`
        searchHomes(false);
    }, [searchCity, guestsNumber, searchCategory, searchPriceRange, selectedFeaturesList, selectedAmenitiesList]);

    // Funció per executar la cerca quan es vol mostrar mes contingut amb els mateixos filtres
    const loadMore = () => searchHomes(true);

    return (
        <div className="flex flex-col gap-8">
            {isLoading && (!homes || homes.length === 0) ? (
                // Si està carregant i no hi ha dades, mostra el skeleton
                <PostsSkeleton/>
            ) : (homes && homes.length > 0) ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-6 py-6">
                        {homes.map((home, index) => (
                            <PostCard key={index} home={home}/>
                        ))}
                    </div>
                    {hasMore && (
                        <Button onClick={loadMore} className="m-auto py-[1.25rem]">
                            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>}
                            {isLoading ? "Loading" : "Load more"}
                        </Button>
                    )}
                </>
            ) : (
                <>
                    <div className="text-center font-bold pt-10">No posts found.</div>
                </>
            )}
        </div>
    )
}