"use client"

import * as React from "react"
import {Check, ChevronsUpDown} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react";

const destinations = [
    {
        value: "barcelona",
        label: "Barcelona",
    },
    {
        value: "madrid",
        label: "Madrid",
    },
    {
        value: "lisbon",
        label: "Lisbon",
    },
    {
        value: "paris",
        label: "Paris",
    },
    {
        value: "berlin",
        label: "Berlin",
    },
    {
        value: "amsterdam",
        label: "Amsterdam",
    },
    {
        value: "brussels",
        label: "Brussels",
    },
    {
        value: "rome",
        label: "Rome",
    },
    {
        value: "vienna",
        label: "Vienna",
    },
    {
        value: "prague",
        label: "Prague",
    },
    {
        value: "warsaw",
        label: "Warsaw",
    },
    {
        value: "budapest",
        label: "Budapest",
    },
    {
        value: "copenhagen",
        label: "Copenhagen",
    },
    {
        value: "oslo",
        label: "Oslo",
    },
    {
        value: "stockholm",
        label: "Stockholm",
    },
    {
        value: "helsinki",
        label: "Helsinki",
    },
    {
        value: "dublin",
        label: "Dublin",
    },
    {
        value: "athens",
        label: "Athens",
    },
    {
        value: "zurich",
        label: "Zurich",
    },
    {
        value: "sofia",
        label: "Sofia",
    },
    {
        value: "belgrade",
        label: "Belgrade",
    },
    {
        value: "bucharest",
        label: "Bucharest",
    },
    {
        value: "zagreb",
        label: "Zagreb",
    },
    {
        value: "ljubljana",
        label: "Ljubljana",
    },
    {
        value: "sarajevo",
        label: "Sarajevo",
    },
    {
        value: "tirana",
        label: "Tirana",
    },
    {
        value: "skopje",
        label: "Skopje",
    },
    {
        value: "sofia",
        label: "Sofia",
    },
    {
        value: "reykjavik",
        label: "Reykjavik",
    },
    {
        value: "vilnius",
        label: "Vilnius",
    },
    {
        value: "riga",
        label: "Riga",
    },
    {
        value: "tallinn",
        label: "Tallinn",
    },
    {
        value: "luxembourg",
        label: "Luxembourg",
    },
    {
        value: "monaco",
        label: "Monaco",
    },
    {
        value: "andorra-la-vella",
        label: "Andorra la Vella",
    },
    {
        value: "san-marino",
        label: "San Marino",
    },
    {
        value: "valletta",
        label: "Valletta",
    },
    {
        value: "krakow",
        label: "Krakow",
    },
    {
        value: "gothenburg",
        label: "Gothenburg",
    },
    {
        value: "hamburg",
        label: "Hamburg",
    },
    {
        value: "munich",
        label: "Munich",
    },
    {
        value: "stuttgart",
        label: "Stuttgart",
    },
    {
        value: "florence",
        label: "Florence",
    },
    {
        value: "turin",
        label: "Turin",
    },
    {
        value: "naples",
        label: "Naples",
    },
    {
        value: "seville",
        label: "Seville",
    },
    {
        value: "valencia",
        label: "Valencia",
    },
    {
        value: "bordeaux",
        label: "Bordeaux",
    },
    {
        value: "marseille",
        label: "Marseille",
    },
    {
        value: "nice",
        label: "Nice",
    },
]

export function DestinationSelector() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <div className={"flex flex-col space-y-1"}>
            <p>Select destination</p>
            <div>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                        >
                            {value
                                ? destinations.find((destination) => destination.value === value)?.label
                                : "Search destinations"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search destinations"/>
                            <CommandList>
                                <CommandEmpty>No destination found.</CommandEmpty>
                                <CommandGroup>
                                    {destinations.map((destination) => (
                                        <CommandItem
                                            key={destination.value}
                                            value={destination.value}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === destination.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {destination.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

