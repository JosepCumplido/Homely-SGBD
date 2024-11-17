import React from 'react';
import { clsx } from 'clsx';

interface DisplayGroupProps {
    title: string;
    groups: { label: string; subItems: string[] }[]; // Subitems per mostrar
    selectedItems: string[]; // Quins elements estan seleccionats
    onItemClick: (item: string) => void; // Funció per gestionar la selecció
    layoutClass?: string; // Personalització del layout
}

const DisplayGroup: React.FC<DisplayGroupProps> = ({
                                                       title,
                                                       groups,
                                                       selectedItems,
                                                       onItemClick,
                                                       layoutClass = "flex flex-wrap gap-3", // Flexbox i espaiat entre elements
                                                   }) => (
    <div className="flex flex-col gap-8 pb-8">
        <p className="text-lg font-semibold leading-none tracking-tight">{title}</p>
        {groups.map(({ label, subItems }) => (
            <div key={label} className="flex flex-col gap-4">
                <p className="text-md font-semibold leading-none tracking-tight">{label}</p>
                <div className={layoutClass}>
                    {subItems.map((item) => {
                        const selected = selectedItems.includes(item);
                        return (
                            <div
                                key={item}
                                onClick={() => onItemClick(item)} // Selecció quan fa click
                                className={clsx(
                                    "px-5 py-2 rounded-full m-[1px] border border-solid border-gray-400 w-max cursor-pointer transition-all duration-200 ease-in-out",
                                    selected
                                        ? "border-gray-900 border-2 !m-0 font-semibold"
                                        : "hover:border-gray-800"
                                )}
                            >
                                <p className={clsx({ 'font-semibold': selected })}>{item}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        ))}
    </div>
);

export default DisplayGroup;
