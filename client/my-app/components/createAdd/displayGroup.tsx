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
                                                       layoutClass = "grid grid-cols-2 gap-4",
                                                   }) => (
    <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className={layoutClass}>
            {groups.map(({ label, subItems }) => (
                <div key={label} className="flex flex-col gap-4">
                    <h3 className="text-md font-semibold">{label}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {subItems.map((item) => (
                            <div
                                key={item}
                                onClick={() => onItemClick(item)} // Selecció quan fa click
                                className={clsx(
                                    "p-4 border rounded-md cursor-pointer",
                                    selectedItems.includes(item)
                                        ? "bg-gray-300 font-semibold"
                                        : "hover:bg-gray-100"
                                )}
                            >
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default DisplayGroup;
