import React from "react";
import type {Reservation} from "shared/models/reservation"
import {TravelCardList} from "@/components/travel/travelCardList";

export function TravelHistoryList({travelHistoryList}: {travelHistoryList: Reservation[]}) {
    return (
        <div className={"flex flex-col gap-4"}>
            {travelHistoryList.map((reservation, index) => (
                <TravelCardList key={index} reservation={reservation}/>
            ))}
        </div>
    )
}