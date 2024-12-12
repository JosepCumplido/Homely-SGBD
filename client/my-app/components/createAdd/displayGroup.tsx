import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

interface DisplayGroupProps {
    title?: string;
    groups: {
        label: string;
        subItems: string[];
    }[];
    selectedItems: string[];
    onItemClick: (item: string) => void;
}

const DisplayGroup: React.FC<DisplayGroupProps> = ({
                                                       groups,
                                                       selectedItems,
                                                       onItemClick,
                                                   }) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            {groups.map((group, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{group.label}</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {group.subItems.map((item) => (
                                <div key={item} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={item}
                                        checked={selectedItems.includes(item)}
                                        onCheckedChange={() => onItemClick(item)}
                                    />
                                    <label
                                        htmlFor={item}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default DisplayGroup;

