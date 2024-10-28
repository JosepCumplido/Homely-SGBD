"use client"

import {DestinationSelector} from "@/components/explore/destinationSelector";
import {DatePickerRange} from "@/components/explore/dateRangePicker";
import {GuestsSelection} from "@/components/explore/guestsSelection";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {FiltersDialog} from "@/components/explore/searchFilters/filtersDialog";

export function SearchBox() {
    return (
        <div className={"flex flex-row space-x-4 items-center h-[60px] justify-center"}>
            <DestinationSelector></DestinationSelector>
            <Separator orientation="vertical" />
            <DatePickerRange></DatePickerRange>
            <Separator orientation="vertical" />
            <GuestsSelection></GuestsSelection>
            <Separator orientation="vertical" />
            <Button className={"mt-auto"}>Search</Button>
            <FiltersDialog/>
        </div>
    )
}