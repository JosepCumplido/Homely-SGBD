import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Separator} from "@/components/ui/separator";
import * as React from "react";
import {PriceRange} from "@/components/explore/searchFilters/priceRange";
import {MixerHorizontalIcon} from "@radix-ui/react-icons";
import type {FeatureType} from 'shared/models/featureType';
import type {AmenityType} from 'shared/models/amenityType';
import {FeatureSelector} from "@/components/explore/searchFilters/featureSelector";
import {useState} from "react";

export function FiltersDialog({
                                  priceRange,
                                  onPriceRangeChange,
                                  searchResults,
                                  featureTypes,
                                  onFeatureClick,
                                  amenityTypes,
                                  onAmenityClick,
                                  filtersNumber,
                                  onClearAllFilters
                              }: {
    priceRange: number[],
    onPriceRangeChange: (range: number[]) => void,
    searchResults: number,
    featureTypes: FeatureType[],
    onFeatureClick: (feature: string) => void,
    amenityTypes: AmenityType[]
    onAmenityClick: (amenity: string) => void,
    filtersNumber: number,
    onClearAllFilters: () => void,
}) {

    const [selectedFeaturesList, setSelectedFeaturesList] = useState<string[]>([]);
    const [selectedAmenitiesList, setSelectedAmenitiesList] = useState<string[]>([]);

    const handleRangeChange = (newRange: number[]) => {
        onPriceRangeChange(newRange)
    };

    const handleFeatureClick = (feature: string) => {
        onFeatureClick(feature)

        setSelectedFeaturesList((prevSelected) =>
            prevSelected.includes(feature)
                ? prevSelected.filter((item) => item !== feature) // Remove if already selected
                : [...prevSelected, feature] // Add if not selected
        );
    };

    const handleAmenityClick = (amenity: string) => {
        onAmenityClick(amenity)

        setSelectedAmenitiesList((prevSelected) =>
            prevSelected.includes(amenity)
                ? prevSelected.filter((item) => item !== amenity) // Remove if already selected
                : [...prevSelected, amenity] // Add if not selected
        );
    };

    const handleClearAllFilters = () => {
        onClearAllFilters()
        setSelectedFeaturesList([])
        setSelectedAmenitiesList([])
        onPriceRangeChange([20, 540])
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}
                        className={"!border-black mt-auto rounded-full h-[55px] w-[55px] absolute right-2.5 shadow-lg transition-transform duration-300 hover:scale-[1.01]"}>
                    <MixerHorizontalIcon/>
                </Button>
                {/*<Button variant={"outline"} className={"!border-black mt-auto py-[1.25rem] relative"}>
                    <MixerHorizontalIcon/>
                    Filters
                    {filtersNumber > 0 && <FiltersNumberBadge filtersNumber={filtersNumber}/>}
                </Button>*/}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] w-[700px] px-0 py-4 gap-0">
                <DialogHeader className={"gap-0"}>
                    <DialogTitle className="px-4">Filters</DialogTitle>
                    <DialogDescription className={"mb-0"}>
                        <Separator orientation="horizontal" className={"mt-2"}/>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-16 pt-4 max-h-[75vh] w-full overflow-y-auto overflow-x-hidden px-4">
                    <div>
                        <p className={"text-lg font-semibold leading-none tracking-tight"}>Price range</p>
                        <PriceRange
                            priceRange={priceRange}
                            onRangeChange={handleRangeChange}
                        />
                    </div>
                    <div className={"flex flex-col gap-8 pb-1"}>
                        <p className={"text-lg font-semibold leading-none tracking-tight"}>Property features</p>
                        {featureTypes.map((featureTypes, index) => (
                            <div key={index} className={"flex flex-col gap-4"}>
                                <p className={"text-md font-semibold leading-none tracking-tight"}>{featureTypes.label}</p>
                                <div key={index} className={"flex flex-wrap gap-3"}>
                                    {featureTypes.features.map((feature, index) => {
                                        const selected = selectedFeaturesList.includes(feature);
                                        return (
                                            <FeatureSelector
                                                key={index}
                                                label={feature}
                                                selected={selected}
                                                onClick={() => handleFeatureClick(feature)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"flex flex-col gap-8 pb-8"}>
                        <p className={"text-lg font-semibold leading-none tracking-tight"}>Property amenities</p>
                        {amenityTypes.map((amenityTypes, index) => (
                            <div key={index} className={"flex flex-col gap-4"}>
                                <p className={"text-md font-semibold leading-none tracking-tight"}>{amenityTypes.label}</p>
                                <div key={index} className={"flex flex-wrap gap-3"}>
                                    {amenityTypes.amenities.map((amenity, index) => {
                                        const selected = selectedAmenitiesList.includes(amenity);
                                        return (
                                            <FeatureSelector
                                                key={index}
                                                label={amenity}
                                                selected={selected}
                                                onClick={() => handleAmenityClick(amenity)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <DialogFooter>
                    <div className={"flex flex-col w-full h-full gap-4"}>
                        <Separator orientation="horizontal" className={""}/>
                        <div className={"flex flex-row justify-between px-4"}>
                            <Button variant="ghost" onClick={handleClearAllFilters}>Clear all</Button>
                            <Button type="submit">Show {searchResults} places</Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}