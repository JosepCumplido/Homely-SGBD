import * as React from "react"

import {clsx} from "clsx";
import {Category} from "shared/models/category";

export function CategoryFilter({categories, selectedCategory, onCategoryChange}: {
    categories: Category[],
    selectedCategory: Category | null,
    onCategoryChange: (category: Category) => void
}) {
    return (
        <div className={"shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] pt-4 z-10 flex flex-row gap-[3.5rem] items-center bg-white w-full overflow-x-scroll no-scrollbar lg:justify-center"}>
            {categories.map((value, index) => (
                <div
                    key={index}
                    onClick={() => onCategoryChange(value)}
                    className={clsx(
                        {
                            'border-b-2 border-gray-600 font-semibold': selectedCategory != null && selectedCategory.name === value.name,
                            'hover:border-gray-200 hover:font-semibold': selectedCategory == null || selectedCategory.name !== value.name,
                        },
                        "flex flex-col gap-2 items-center justify-center border-b-2 border-transparent pb-3 cursor-pointer opacity-70"
                    )}
                >
                    {value.icon}
                    <div
                        title={value.label}
                        className={"text-sm text-center before-content"}>{value.label} </div>
                </div>
            ))}
        </div>
    )
}
