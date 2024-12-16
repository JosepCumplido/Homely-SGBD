"use client";

import {Minus, Plus} from "lucide-react";
import {Button, Group, Input, NumberField} from "react-aria-components";

export function GuestsSelector({guests, onGuestsChange}: {
    guests: number | undefined,
    onGuestsChange: (guests: number) => void
}) {
    return (
        <NumberField value={guests} minValue={1} maxValue={16} onChange={onGuestsChange}>
            <div className="space-y-2">
                <Group
                    className="relative inline-flex h-9 w-full items-center whitespace-nowrap rounded-lg text-sm shadow-sm shadow-black/5 transition-shadow">
                    <Button
                        aria-label="Decrease hosts"
                        slot="decrement"
                        className="-ms-px flex aspect-square h-6 items-center justify-center rounded-full border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Minus size={16} strokeWidth={2} aria-label="Decrease hosts"/>
                    </Button>
                    <Input
                        aria-label="Guests input"
                        placeholder="Add guests"
                        className="w-24 grow text-center bg-transparent tabular-nums text-white focus:outline-none"/>
                    <Button
                        aria-label="Increase hosts"
                        slot="increment"
                        className="-me-px flex aspect-square h-6 items-center justify-center rounded-full border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Plus size={16} strokeWidth={2} aria-label="Increase hosts"/>
                    </Button>
                </Group>
            </div>
        </NumberField>
    );
}
