import * as React from "react"

import {clsx} from "clsx";
import {Category} from "shared/models/category";

export function CategoryFilter({categories, selectedCategory, onCategoryChange}: {
    categories: Category[],
    selectedCategory: Category | null,
    onCategoryChange: (category: Category) => void
}) {
    return (
        <div className={"flex flex-row gap-8 items-center w-full overflow-x-scroll no-scrollbar lg:justify-center"}>
            {categories.map((value, index) => (
                <div
                    key={index}
                    onClick={() => onCategoryChange(value)}
                    className={clsx(
                        {
                            'border-b-2 border-gray-600 font-semibold': selectedCategory != null && selectedCategory.name === value.name,
                            'hover:border-gray-200 hover:font-semibold': selectedCategory == null || selectedCategory.name !== value.name,
                        },
                        "flex flex-col gap-2 items-center justify-center border-b-2 border-transparent pb-1.5 cursor-pointer"
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
