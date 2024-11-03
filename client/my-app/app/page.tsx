'use client'

import {SearchBox} from "@/components/explore/searchBox";
import {CategoryFilter} from "@/components/explore/categoryFilter";
import {Separator} from "@/components/ui/separator";
import {ContentFrame} from "@/components/explore/content-frame";
import {Posts} from "@/components/explore/posts";
import type {Home} from 'shared/models/home';
import type {Category} from 'shared/models/category';
import type {FeatureType} from 'shared/models/featureType';
import type {AmenityType} from 'shared/models/amenityType';
import {SearchRequest} from 'shared/data/searchRequest';
import React, {useEffect, useState} from "react";
import {
    Building2,
    CableCar, Castle,
    Fence,
    Gem,
    LayoutGrid,
    Mountain,
    Sailboat,
    TentTree,
    TreePalm,
    TreePine, Waves
} from "lucide-react";

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
    const [homes, setHomes] = useState<Home[]>([])
    const [searchCity, setSearchCity] = useState<string | null>(null)
    const [searchCountry, setSearchCountry] = useState<string | null>(null)
    const [searchPriceRange, setSearchPriceRange] = useState<number[]>([20, 540])
    const [searchScore, setSearchScore] = useState<number | null>(null)
    const [selectedFeaturesList, setSelectedFeaturesList] = useState<string[]>([]);
    const [selectedAmenitiesList, setSelectedAmenitiesList] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [searchResults, setSearchResults] = useState(0)
    const [filtersNumber, setFiltersNumber] = useState(0)

    const searchHomes = async (city: string | null, country: string | null, priceRange: number[], score: number | null, featuresList: string[], amenitiesList: string[]) => {
        try {
            console.log("Search params: " + city, country, priceRange, score, featuresList, amenitiesList)
            const request = new SearchRequest(city, country, priceRange, score, featuresList, amenitiesList)
            const response = await fetch('http://localhost:4000/home/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
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

    // Configura el debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if(selectedFeaturesList.length > 0) {
                searchHomes(searchCity, searchCountry, searchPriceRange, searchScore, selectedFeaturesList, selectedAmenitiesList)
            }
        }, 500); // Temps d'espera de 300 ms

        return () => clearTimeout(timer); // Neteja el temporitzador en canviar els filtres
    }, [selectedFeaturesList]);

    useEffect(() => {
        setFiltersNumber(selectedFeaturesList.length + selectedAmenitiesList.length)
    }, [selectedFeaturesList, selectedAmenitiesList])

    const onPriceRangeChange = (range: number[]) => {
        setSearchPriceRange(range)
    }

    const onFeatureClick = (feature: string) => {
        setSelectedFeaturesList((prevSelected) =>
            prevSelected.includes(feature)
                ? prevSelected.filter((item) => item !== feature) // Remove if already selected
                : [...prevSelected, feature] // Add if not selected
        );
    }

    const onAmenityClick = (amenity: string) => {
        setSelectedAmenitiesList((prevSelected) =>
            prevSelected.includes(amenity)
                ? prevSelected.filter((item) => item !== amenity) // Remove if already selected
                : [...prevSelected, amenity] // Add if not selected
        );
    }

    useEffect(() => {
        searchHomes(searchCity, searchCountry, searchPriceRange, searchScore, selectedFeaturesList, selectedAmenitiesList)
    }, [searchCity, searchCountry, searchPriceRange, searchScore])

    return (
        <>
            <div className={"flex flex-col space-y-6 justify-center py-14 m-auto"}>
                <ContentFrame>
                    <SearchBox
                        priceRange={searchPriceRange}
                        onPriceRangeChange={onPriceRangeChange}
                        searchResults={searchResults}
                        featureTypes={featureTypes}
                        onFeatureClick={onFeatureClick}
                        amenityTypes={amenityTypes}
                        onAmenityClick={onAmenityClick}
                        filtersNumber={filtersNumber}
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