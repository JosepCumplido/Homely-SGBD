'use client'
import jwt from 'jsonwebtoken';
import {useAuth} from '@/hooks/useAuth';
import {useRouter} from 'next/navigation';
import {SearchBox} from "@/components/explore/searchBox";
import {CategoryFilter} from "@/components/explore/categoryFilter";
import {Separator} from "@/components/ui/separator";
import ContentFrame from "@/components/explore/content-frame"
import {Posts} from "@/components/explore/posts";
import type {Category} from 'shared/models/category';
import type {FeatureType} from 'shared/models/featureType';
import type {AmenityType} from 'shared/models/amenityType';
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
import {User} from "shared/models/user";

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
    const [selectedFeaturesList, setSelectedFeaturesList] = useState<string[]>([]);
    const [selectedAmenitiesList, setSelectedAmenitiesList] = useState<string[]>([]);
    const [searchResultsNumber, setSearchResultsNumber] = useState(0)
    const [appliedFiltersNumber, setAppliedFiltersNumber] = useState(0)

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

    const onSetSearchResultsNumber = (results: number) => {
        setSearchResultsNumber(results)
    }

    useEffect(() => {
        let totalFilters = selectedFeaturesList.length + selectedAmenitiesList.length
        if (searchPriceRange[0] != 20 || searchPriceRange[1] != 540) totalFilters++
        setAppliedFiltersNumber(totalFilters)
    }, [searchPriceRange, selectedFeaturesList, selectedAmenitiesList]);

    const onClearAllFilters = () => {
        setSearchPriceRange([20, 540])
        setSelectedFeaturesList([])
        setSelectedAmenitiesList([])
        setAppliedFiltersNumber(0)
    }

    return (
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
            <Separator orientation="horizontal"/>
            <div className={"max-h-[85vh] !mt-0 pb-24 overflow-y-scroll no-scrollbar"}>
                <CategoryFilter
                    categories={categories}
                    selectedCategory={searchCategory}
                    onCategoryChange={onCategoryChange}
                />
                <ContentFrame>
                    {/*<Suspense fallback={<PostsSkeleton/>}>*/}
                        <Posts
                            searchCity={searchCity}
                            guestsNumber={guestsNumber}
                            searchCategory={searchCategory}
                            searchPriceRange={searchPriceRange}
                            selectedFeaturesList={selectedFeaturesList}
                            selectedAmenitiesList={selectedAmenitiesList}
                            onSetSearchResultsNumber={onSetSearchResultsNumber}
                        />
                    {/*</Suspense>*/}
                </ContentFrame>
            </div>
        </div>
    );
}