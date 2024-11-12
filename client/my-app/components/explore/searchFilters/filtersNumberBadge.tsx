import * as React from "react";

export function FiltersNumberBadge({filtersNumber}:{filtersNumber:number}) {
    return (
        <div
            className={"block ps-1 pe-1 text-center leading-4 h-5 min-w-5 rounded-full bg-gray-950 text-white text-[9px] border-white border-solid border-2 absolute -top-2.5 -right-2.5"}>{filtersNumber}</div>

    )
}