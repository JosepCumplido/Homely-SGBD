"use client"

import {DestinationSelector} from "@/components/explore/destinationSelector";
import {DatePickerRange} from "@/components/explore/dateRangePicker";
import {GuestsSelection} from "@/components/explore/guestsSelection";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {FiltersDialog} from "@/components/explore/searchFilters/filtersDialog";

export function SearchBox({priceRange, onPriceRangeChange, searchResults}: { priceRange: number[], onPriceRangeChange: (range: number[]) => void, searchResults: number }) {
    return (
        <div className={"flex flex-row space-x-4 items-center h-[60px] justify-center"}>
            <DestinationSelector/>
            <Separator orientation="vertical" />
            <DatePickerRange/>
            <Separator orientation="vertical" />
            <GuestsSelection/>
            <Separator orientation="vertical" />
            <Button className={"mt-auto"}>Search</Button>
            <FiltersDialog
                priceRange={priceRange}
                onPriceRangeChange={onPriceRangeChange}
                searchResults={searchResults}
            />
        </div>
    )
}