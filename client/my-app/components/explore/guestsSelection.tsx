import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";


export function GuestsSelection() {
    const [guests, setGuests] = useState(0)
    const addGuest = () => setGuests(prevGuests => prevGuests + 1)
    const removeGuest = () => setGuests(prevGuests => Math.max(0, prevGuests - 1))
    const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => setGuests(parseInt(e.target.value))
    return (
        <div className={"flex flex-col space-y-1"}>
            <p>Select number of guests</p>
            <div className={"flex flex-row space-x-1"}>
                <Button variant="outline" onClick={removeGuest}>-</Button>
                <Input type="number" placeholder="Guests" onChange={handleGuestChange} value={guests} className={"text-center"}></Input>
                <Button variant="outline" onClick={addGuest}>+</Button>
            </div>
        </div>
    )
}