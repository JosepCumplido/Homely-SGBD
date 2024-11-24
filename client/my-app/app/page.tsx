'use client'

import {SearchBox} from "@/components/explore/searchBox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import {CategoryFilter} from "@/components/explore/categoryFilter";
import {Separator} from "@/components/ui/separator";
import {ContentFrame} from "@/components/explore/content-frame";
import {Posts} from "@/components/explore/posts";
import type {Home} from 'shared/models/home';

import jwt from 'jsonwebtoken';

import type {Category} from 'shared/models/category';
import type {FeatureType} from 'shared/models/featureType';
import type {AmenityType} from 'shared/models/amenityType';
import {SearchRequest} from 'shared/data/searchRequest';
import React, {useCallback, useEffect, useState} from "react";
import {
    Building2,
    CableCar,
    Castle,
    Fence,
    Gem,
    LayoutGrid,
    Mountain,
    Sailboat,
    TentTree,
    TreePalm,
    TreePine,
    Waves
} from "lucide-react";

interface DecodedToken {
    username: string;
}

const categories: Category[] = [
    {name: "all", label: "All", icon: <LayoutGrid height={24} width={24} strokeWidth={1.2}/>},
    {name: "beach", label: "Beach", icon: <TreePalm height={24} width={24} strokeWidth={1.2}/>},
    {name: "countryside", label: "Countryside", icon: <Fence height={24} width={24} strokeWidth={1.2}/>},
    {name: "city", label: "City", icon: <Building2 height={24} width={24} strokeWidth={1.2}/>},
    {name: "cabins", label: "Cabins", icon: <TreePine height={24} width={24} strokeWidth={1.2}/>},
    {name: "boats", label: "Boats", icon: <Sailboat height={24} width={24} strokeWidth={1.2}/>},
    {name: "castles", label: "Castles", icon: <Castle height={24} width={24} strokeWidth={1.2}/>},
    {name: "skiing", label: "Skiing", icon: <CableCar height={24} width={24} strokeWidth={1.2}/>},
    {name: "lake", label: "Lake", icon: <Waves height={24} width={24} strokeWidth={1.2}/>},
    {name: "luxe", label: "Luxe", icon: <Gem height={24} width={24} strokeWidth={1.2}/>},
    {name: "mountain", label: "Mountain", icon: <Mountain height={24} width={24} strokeWidth={1.2}/>},
    {name: "camping", label: "Camping", icon: <TentTree height={24} width={24} strokeWidth={1.2}/>}
]

const featureTypes: FeatureType[] = [
    {
        label: "Kitchen",
        features: ["Oven", "Microwave", "Dishwasher", "Refigerator", "Freezer", "Utensils and dishware", "Electric kettle", "Toaster", "Coffee machine"]
    },
    {
        label: "Bathroom",
        features: ["Hairdryer", "Shower", "Bathtub", "Towel warmer", "Towels included", "Accessible bathroom", "Bidet", "Toiletries"]
    },
    {label: "Bedroom", features: ["King-size bed", "Individual beds"]},
    {
        label: "Living areas",
        features: ["TV", "Dedicated workspace", "Hardwood flooring", "Carpet flooring", "Balcony", "Terrace", "Private garden"]
    },
]

const amenityTypes: AmenityType[] = [
    {label: "Comfort", amenities: ["Air conditioning", "Heating", "Soundproofing", "Fireplace"]},
    {
        label: "Conveniences",
        amenities: ["Wi-Fi", "High-speed internet", "Satellite TV", "Washer", "Dryer", "Ironing board", "Vacuum and cleaning tools", "Private parking available", "Elevator"]
    },
    {
        label: "Security and safety",
        amenities: ["Reception or concierge", "Surveillance or cameras", "Alarm", "Smoke detector", "Monoxide detector", "Fire extinguisher", "First aid kit"]
    },
    {
        label: "Additional services",
        amenities: ["Gym", "Pool", "Spa or sauna", "BBQ area", "Meal service", "Green spaces", "Children's play area", "Crib"]
    },
]

export default function Home() {
    // Search filters
    const [searchCity, setSearchCity] = useState<string | null>(null)
    const [guestsNumber, setGuestsNumber] = useState<number | undefined>(undefined)
    const [searchCategory, setSearchCategory] = useState<Category | null>(null)
    const [searchPriceRange, setSearchPriceRange] = useState<number[]>([20, 540])
    /*const [searchScore, setSearchScore] = useState<number[]>([])*/
    const [selectedFeaturesList, setSelectedFeaturesList] = useState<string[]>([]);
    const [selectedAmenitiesList, setSelectedAmenitiesList] = useState<string[]>([]);
    const [searchResultsNumber, setSearchResultsNumber] = useState(0)
    const [appliedFiltersNumber, setAppliedFiltersNumber] = useState(0)

    const [homes, setHomes] = useState<Home[]>([])
    const limit = 6
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const handleProfileClick = () => {
        if (isAuthenticated) {
            router.push("/profile"); // Si está autenticado, redirige al perfil
        } else {
            router.push("/login"); // Si no está autenticado, redirige al login
        }
    };
    const [username, setUsername] = useState<string | null>(null); // Estado para almacenar el username
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        // Obtener el token del localStorage
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                // Decodificamos el token correctamente usando jwtDecode
                const decodedToken = jwt.decode(token) as DecodedToken;  // Aquí usamos jwtDecode en lugar de jwt_decode
                setUsername(decodedToken.username);  // Accedemos al campo username
                console.log("Decoded username:", decodedToken.username);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (username) {
            console.log('Fetching avatar for:', username);  // Verifica que el username sea el esperado
            fetch(`http://localhost:4000/user/profile/${username}`)
                .then((response) => response.json())
                .then((data) => {
                    setAvatarUrl(data.avatarUrl);
                })
                .catch((error) => {
                    console.error("Error fetching avatar URL:", error);
                });
        } else {
            console.error('No username available');
        }
    }, [username]);

    const searchHomes = useCallback(async (isLoadMore: boolean) => {
        setLoading(true);

        // Si és una crida per carregar més, incrementa la pàgina; en cas contrari, reinicia la pàgina a 0
        const searchPage = isLoadMore ? page + 1 : 0;

        console.log("Category " + (searchCategory?.name ?? null))
        const request = new SearchRequest(searchPage, limit, searchCity, guestsNumber, searchCategory?.name ?? null, searchPriceRange, selectedFeaturesList, selectedAmenitiesList)

        try {
            const response = await fetch('http://localhost:4000/home/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            });

            if (!response.ok) new Error('Network response failed');

            const searchResponse = await response.json()

            if (isLoadMore) {
                setHomes(prevHomes => [...prevHomes, ...searchResponse.homes])
                setPage(prevPage => prevPage + 1);
                console.log("Search page: " + searchPage)
            } else {
                setHomes(searchResponse.homes)
                setPage(0);
            }

            setSearchResultsNumber(searchResponse.homes.length)
            setHasMore(searchResponse.homes.length > 0)

        } catch (error) {
            console.error("Error al cercar cases:", error);
            setHasMore(false)
        } finally {
            setLoading(false)
        }
    }, [page, searchCity, guestsNumber, searchCategory, searchPriceRange, selectedAmenitiesList, selectedFeaturesList]);

    // Funció per executar la cerca quan els filtres canvien
    useEffect(() => {
        // Si canvia algun filtre, torna a cercar des de la pàgina 0 sense `isLoadMore`
        searchHomes(false);
    }, [searchCity, guestsNumber, searchCategory, searchPriceRange, selectedFeaturesList, selectedAmenitiesList]);

    // Funció per executar la cerca quan es vol mostrar mes contingut amb els mateixos filtres
    const infiniteScrollSearch = () => {
        console.log("Load more")
        searchHomes(true);
    }

    const onCityChange = useCallback((city: string) => {
        setSearchCity(city)
    }, [])

    const onGuestsNumberChange = useCallback((guests: number) => {
        setGuestsNumber(guests)
    }, [])

    const onCategoryChange = useCallback((category: Category) => {
        setSearchCategory(category)
    }, [])

    // Modificar rang de preus filtres cerca
    const onPriceRangeChange = useCallback((range: number[]) => {
        setSearchPriceRange(range)
    }, [])

    // Modificar features filtres cerca
    const onFeatureClick = (feature: string) => {
        setSelectedFeaturesList((prevSelected) =>
            prevSelected.includes(feature)
                ? prevSelected.filter((item) => item !== feature) // Remove if already selected
                : [...prevSelected, feature] // Add if not selected
        );
    }

    // Modificar amenities filtres cerca
    const onAmenityClick = (amenity: string) => {
        setSelectedAmenitiesList((prevSelected) =>
            prevSelected.includes(amenity)
                ? prevSelected.filter((item) => item !== amenity) // Remove if already selected
                : [...prevSelected, amenity] // Add if not selected
        );
    }

    useEffect(() => {
        let totalFilters = selectedFeaturesList.length + selectedAmenitiesList.length
        if(searchPriceRange[0] != 20 || searchPriceRange[1] != 540) totalFilters++
        setAppliedFiltersNumber(totalFilters)
    }, [searchPriceRange, selectedFeaturesList, selectedAmenitiesList]);

    const onClearAllFilters = () => {
        setSearchPriceRange([20, 540])
        setSelectedFeaturesList([])
        setSelectedAmenitiesList([])
        setAppliedFiltersNumber(0)
    }

    return (
        <>
            <div className={"flex flex-col space-y-6 justify-center py-4 m-auto"}>
                <SearchBox
                    city={searchCity}
                    onCityChange={onCityChange}
                    guests={guestsNumber}
                    onGuestsChange={onGuestsNumberChange}
                    priceRange={searchPriceRange}
                    onPriceRangeChange={onPriceRangeChange}
                    searchResults={searchResultsNumber}
                    featureTypes={featureTypes}
                    onFeatureClick={onFeatureClick}
                    amenityTypes={amenityTypes}
                    onAmenityClick={onAmenityClick}
                    filtersNumber={appliedFiltersNumber}
                    onClearAllFilters={onClearAllFilters}
                />
                <Avatar onClick={handleProfileClick} className="cursor-pointer hover:ring hover:ring-offset-2">
                    <AvatarImage src={avatarUrl || "explore/avatar/post_1.png"} alt="User Profile" />
                    <AvatarFallback>{username ? username[0] : 'U'}</AvatarFallback>
                </Avatar>

                <Separator orientation="horizontal"/>
                <div className={"max-h-[85vh] !mt-0 pb-24 overflow-y-scroll no-scrollbar"}>
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={searchCategory}
                        onCategoryChange={onCategoryChange}
                    />
                    <ContentFrame>
                        {
                            homes && homes.length > 0 ? (
                                <Posts homes={homes} isLoading={loading} hasMore={hasMore}
                                       loadMore={infiniteScrollSearch}/>
                            ) : (
                                <div className="text-center font-bold pt-10">
                                    No hi ha resultats per mostrar.
                                </div>
                            )
                        }
                    </ContentFrame>
                </div>
            </div>
        </>
    );
}