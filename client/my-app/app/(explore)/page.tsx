'use client'

import {SearchBox} from "@/components/explore/searchBox";
import {CategoryFilter} from "@/components/explore/categoryFilter";
import ContentFrame from "@/components/explore/content-frame"
import {Posts} from "@/components/explore/posts";
import type {Category} from 'shared/models/category';
import type {FeatureType} from 'shared/models/featureType';
import type {AmenityType} from 'shared/models/amenityType';
import React, {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import {DateRange} from "react-day-picker";
import {addDays} from "date-fns";

const iconRoute = "/explore/category-icons"
const categories: Category[] = [
    {
        name: "all",
        label: "All",
        icon: <Image src={`${iconRoute}/all.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "cabins",
        label: "Cabins",
        icon: <Image src={`${iconRoute}/cabins.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "design",
        label: "Design",
        icon: <Image src={`${iconRoute}/design.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "countryside",
        label: "Countryside",
        icon: <Image src={`${iconRoute}/countryside.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "luxe",
        label: "Luxe",
        icon: <Image src={`${iconRoute}/luxe.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "mansions",
        label: "Mansions",
        icon: <Image src={`${iconRoute}/mansions.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "city",
        label: "City",
        icon: <Image src={`${iconRoute}/city.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "treehouses",
        label: "Treehouses",
        icon: <Image src={`${iconRoute}/tree-houses.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "castles",
        label: "Castles",
        icon: <Image src={`${iconRoute}/castles.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "skiing",
        label: "Skiing",
        icon: <Image src={`${iconRoute}/sking.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "beach",
        label: "Beach",
        icon: <Image src={`${iconRoute}/beach.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "lake",
        label: "Lake",
        icon: <Image src={`${iconRoute}/lake.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "mountain",
        label: "Mountain",
        icon: <Image src={`${iconRoute}/mountain.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "boats",
        label: "Boats",
        icon: <Image src={`${iconRoute}/boats.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
    {
        name: "camping",
        label: "Camping",
        icon: <Image src={`${iconRoute}/camping.jpg`} height={24} width={24} alt={"Beach category icon"}/>
    },
]

const featureTypes: FeatureType[] = [
    {
        label: "Kitchen",
        features: ["Oven", "Microwave", "Dishwasher", "Refrigerator", "Freezer", "Utensils and dishware", "Electric kettle", "Toaster", "Coffee machine"]
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
    const [dateRange, setDate] = React.useState<DateRange>({
        from: addDays(new Date(), 7),
        to: addDays(new Date(), 10),
    })
    const [guestsNumber, setGuestsNumber] = useState<number>(2)
    const [searchCategory, setSearchCategory] = useState<Category | null>(null)
    const [searchPriceRange, setSearchPriceRange] = useState<number[]>([20, 540])
    const [selectedFeaturesList, setSelectedFeaturesList] = useState<string[]>([]);
    const [selectedAmenitiesList, setSelectedAmenitiesList] = useState<string[]>([]);
    const [searchResultsNumber, setSearchResultsNumber] = useState(0)
    const [appliedFiltersNumber, setAppliedFiltersNumber] = useState(0)

    if (typeof window !== "undefined") {
        sessionStorage.setItem("dateRange", JSON.stringify(dateRange))
        sessionStorage.setItem("guests", JSON.stringify(guestsNumber))
    }

    const onCityChange = useCallback((city: string) => {
        setSearchCity(city)
    }, [])

    const onDateRangeChange = useCallback((dateRange: DateRange) => {
        setDate(dateRange)
        console.log(dateRange)
        if (typeof window !== "undefined") {
            sessionStorage.setItem("dateRange", JSON.stringify(dateRange))
        }
    }, [])

    const onGuestsNumberChange = useCallback((guests: number) => {
        setGuestsNumber(guests)
        if (typeof window !== "undefined") {
            sessionStorage.setItem("guests", JSON.stringify(guests))
        }
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
        <>
            {/* banner */}
            <section>
                <div className={"relative"}>
                    <Image
                        src="/explore/background/background.jpg"
                        width={1802}
                        height={1200}
                        alt={"Background image showing a big house"}
                        quality={100}
                        className={"h-[30vh] w-full"}
                        style={{objectFit: 'cover'}}
                    />
                    {/* search params */}
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
                        dateRange={dateRange}
                        onDateRangeChange={onDateRangeChange}
                    />
                </div>

                <CategoryFilter
                    categories={categories}
                    selectedCategory={searchCategory}
                    onCategoryChange={onCategoryChange}
                />
                <ContentFrame className={"mb-16"}>
                    <Posts
                        searchCity={searchCity}
                        guestsNumber={guestsNumber}
                        searchCategory={searchCategory}
                        searchPriceRange={searchPriceRange}
                        selectedFeaturesList={selectedFeaturesList}
                        selectedAmenitiesList={selectedAmenitiesList}
                        onSetSearchResultsNumber={onSetSearchResultsNumber}
                    />
                </ContentFrame>
            </section>
        </>
    );
}