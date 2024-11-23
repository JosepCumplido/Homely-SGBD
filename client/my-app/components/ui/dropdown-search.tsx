// Dependencies: pnpm install lucide-react

"use client";
import { Country } from 'shared/models/country'
import { Label } from "@/components/ui/label";
import { Check, ChevronDown } from "lucide-react";
import { Fragment, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
    /*const [value, setValue] = useState<string>("");*/

    return (
        <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="select-44"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
                    >
                        {selectedCity ? (
                            <span className="flex min-w-0 items-center gap-2">
                <span className="truncate">{selectedCity}</span>
              </span>
                        ) : (
                            <span className="text-muted-foreground">Select country</span>
                        )}
                        <ChevronDown
                            size={16}
                            strokeWidth={2}
                            className="shrink-0 text-muted-foreground/80"
                            aria-hidden="true"
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                    align="start"
                >
                    <Command>
                        <CommandInput placeholder="Search country..." />
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
        </div>
    );
}
