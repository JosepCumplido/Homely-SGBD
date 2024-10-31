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

export function FiltersDialog({priceRange, onPriceRangeChange, searchResults}: { priceRange: number[], onPriceRangeChange: (range: number[]) => void, searchResults: number }) {

    const handleRangeChange = (newRange: number[]) => {
        onPriceRangeChange(newRange)
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={"mt-auto"}>Filters</Button>
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
                    <div>
                        <p className={"text-lg font-semibold leading-none tracking-tight"}>Rooms and beds</p>
                    </div>
                    <div>
                        <p className={"text-lg font-semibold leading-none tracking-tight"}>Amenities</p>
                    </div>
                </div>
                <DialogFooter>
                    <div className={"flex flex-col w-full h-full gap-4"}>
                        <Separator orientation="horizontal" className={""}/>
                        <div className={"flex flex-row justify-between px-4"}>
                            <Button variant="ghost">Clear all</Button>
                            <Button type="submit">Show {searchResults} places</Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}