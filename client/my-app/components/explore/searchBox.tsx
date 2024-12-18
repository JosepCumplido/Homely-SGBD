"use client"

import {DatePickerRange} from "@/components/explore/dateRangePicker";
import {GuestsSelector} from "@/components/explore/guestsSelector";
import {Separator} from "@/components/ui/separator";
import * as React from "react";
import {FiltersDialog} from "@/components/explore/searchFilters/filtersDialog";
import type {FeatureType} from "shared/models/featureType";
import type {AmenityType} from "shared/models/amenityType";
import DropdownSearch from "@/components/ui/dropdown-search";
import {DateRange} from "react-day-picker";

export function SearchBox({
                              city,
                              onCityChange,
                              guests,
                              onGuestsChange,
                              priceRange,
                              onPriceRangeChange,
                              searchResults,
                              featureTypes,
                              onFeatureClick,
                              amenityTypes,
                              onAmenityClick,
                              filtersNumber,
                              onClearAllFilters,
                              dateRange,
                              onDateRangeChange,
                          }: {
    city: string | null,
    onCityChange: (city: string) => void,
    guests: number | undefined,
    onGuestsChange: (guests: number) => void,
    priceRange: number[],
    onPriceRangeChange: (range: number[]) => void,
    searchResults: number,
    featureTypes: FeatureType[],
    onFeatureClick: (feature: string) => void,
    amenityTypes: AmenityType[]
    onAmenityClick: (amenity: string) => void,
    filtersNumber: number,
    onClearAllFilters: () => void,
    dateRange: DateRange,
    onDateRangeChange: (dateRange: DateRange) => void,

}) {
    return (
        <div
            className={"h-[75px] w-[850px] rounded-full flex flex-row items-center bg-gray-900 absolute bottom-6 left-1/2 transform -translate-x-1/2 shadow-lg"}>
            <div className={"flex flex-col space-y-1 w-[28%] px-10"}>
                <p className={"text-white text-xs"}>Select destination</p>
                <DropdownSearch selectedCity={city} onCityChange={onCityChange}/>
            </div>

            <Separator orientation="vertical" className={"h-3/4 rounded opacity-70"}/>

            <div className={"flex flex-col space-y-1 w-[36%] px-10"}>
                <p className={"text-white text-xs"}>Select stay</p>
                <DatePickerRange dateRange={dateRange} onDateRangeChange={onDateRangeChange}/>
            </div>

            <Separator orientation="vertical" className={"h-3/4 rounded opacity-70"}/>

            <div className={"flex flex-col space-y-1 px-10"}>
                <label className={"text-white text-xs"}>Select guests</label>
                <GuestsSelector guests={guests} onGuestsChange={onGuestsChange}/>
            </div>

            <FiltersDialog
                priceRange={priceRange}
                onPriceRangeChange={onPriceRangeChange}
                searchResults={searchResults}
                featureTypes={featureTypes}
                onFeatureClick={onFeatureClick}
                amenityTypes={amenityTypes}
                onAmenityClick={onAmenityClick}
                filtersNumber={filtersNumber}
                onClearAllFilters={onClearAllFilters}
            />
        </div>
    )
}