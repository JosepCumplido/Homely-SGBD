"use client"

import {DestinationSelector} from "@/components/explore/destinationSelector";
import {DatePickerRange} from "@/components/explore/dateRangePicker";
import {GuestsSelection} from "@/components/explore/guestsSelection";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {FiltersDialog} from "@/components/explore/searchFilters/filtersDialog";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import type {FeatureType} from "shared/models/featureType";
import type {AmenityType} from "shared/models/amenityType";

export function SearchBox({priceRange, onPriceRangeChange, searchResults, featureTypes, onFeatureClick, amenityTypes, onAmenityClick, filtersNumber}: {
    priceRange: number[],
    onPriceRangeChange: (range: number[]) => void,
    searchResults: number,
    featureTypes: FeatureType[],
    onFeatureClick: (feature: string) => void,
    amenityTypes: AmenityType[]
    onAmenityClick: (amenity: string) => void,
    filtersNumber: number

}) {
    return (
        <div className={"flex flex-row space-x-4 items-center h-[60px] justify-center"}>
            <DestinationSelector/>
            <Separator orientation="vertical"/>
            <DatePickerRange/>
            <Separator orientation="vertical"/>
            <GuestsSelection/>
            <Separator orientation="vertical"/>
            <Button className={"mt-auto py-[1.25rem]"}><MagnifyingGlassIcon/>Search</Button>
            <FiltersDialog
                priceRange={priceRange}
                onPriceRangeChange={onPriceRangeChange}
                searchResults={searchResults}
                featureTypes={featureTypes}
                onFeatureClick={onFeatureClick}
                amenityTypes={amenityTypes}
                onAmenityClick={onAmenityClick}
                filtersNumber={filtersNumber}
            />
        </div>
    )
}