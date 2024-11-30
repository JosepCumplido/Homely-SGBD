"use client"

import * as React from "react"
import DropdownSearch from "@/components/ui/dropdown-search";

export function DestinationSelector({city, onCityChange}: {
    city: string | null,
    onCityChange: (city: string) => void
}) {

    return (
        <div className={"flex flex-col"}>
            <p className={"text-white text-xs"}>Select destination</p>
            <div>
                <DropdownSearch selectedCity={city} onCityChange={onCityChange} />
            </div>
        </div>
    )
}

