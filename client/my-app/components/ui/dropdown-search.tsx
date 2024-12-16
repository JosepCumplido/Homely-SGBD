// Dependencies: pnpm install lucide-react

"use client";
import {Country} from 'shared/models/country'
import {Label} from "@/components/ui/label";
import {Check, ChevronDown} from "lucide-react";
import {Fragment, useState} from "react";

import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";

const europeanCountries = [
    {
        name: "Spain",
        cities: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao"],
    },
    {
        name: "France",
        cities: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
    },
    {
        name: "Germany",
        cities: ["Berlin", "Hamburg", "Munich", "Frankfurt", "Cologne"],
    },
    {
        name: "Italy",
        cities: ["Rome", "Milan", "Naples", "Turin", "Florence"],
    },
    {
        name: "United Kingdom",
        cities: ["London", "Manchester", "Birmingham", "Liverpool", "Edinburgh"],
    },
    {
        name: "Portugal",
        cities: ["Lisbon", "Porto", "Braga", "Faro", "Coimbra"],
    },
    {
        name: "Netherlands",
        cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
    },
    {
        name: "Belgium",
        cities: ["Brussels", "Antwerp", "Ghent", "Bruges", "Leuven"],
    },
    {
        name: "Sweden",
        cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås"],
    },
    {
        name: "Norway",
        cities: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen"],
    },
    {
        name: "Denmark",
        cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg"],
    },
    {
        name: "Austria",
        cities: ["Vienna", "Salzburg", "Innsbruck", "Graz", "Linz"],
    },
    {
        name: "Switzerland",
        cities: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne"],
    },
    {
        name: "Poland",
        cities: ["Warsaw", "Kraków", "Łódź", "Wrocław", "Gdańsk"],
    },
    {
        name: "Greece",
        cities: ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa"],
    },
];

export default function DropdownSearch({selectedCity, onCityChange}: {
    selectedCity: string | null,
    onCityChange: (city: string) => void
}) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id="select-44"
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full h-6 justify-between !bg-transparent !px-0 py-0 font-normal outline-offset-0 focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
                >
                    {selectedCity ? (
                        <span className="flex min-w-0 items-center gap-2">
                            <span className="truncate text-white font-bold">{selectedCity}</span>
                        </span>
                    ) : (
                        <span className="text-muted-foreground text-gray-500">Search destination</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                align="start"
            >
                <Command>
                    <CommandInput placeholder="Search destination"/>
                    <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        {europeanCountries.map((country) => (
                            <Fragment key={country.name}>
                                <CommandGroup heading={country.name}>
                                    {country.cities.map((city) => (
                                        <CommandItem
                                            key={city}
                                            value={city}
                                            onSelect={(currentValue) => {
                                                onCityChange(currentValue);
                                                setOpen(false);
                                            }}
                                        >
                                            {city}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    selectedCity === city ? "opacity-100" : "opacity-0",
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Fragment>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
