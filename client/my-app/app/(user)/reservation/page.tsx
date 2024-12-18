"use client"

import { ArrowLeft, Star } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import React, {useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {DateRange} from "react-day-picker";
import {differenceInDays} from "date-fns";
import {AddReservationRequest} from "shared/data/reservationsRequest";
import {z} from "zod";
import {useAuth} from "@/context/authContext";
import {useRouter} from "next/navigation";

const ReservationSchema = z.object({
    username: z.string(),
    homeId: z.number(),
    fromDate: z.date(),
    toDate: z.date(),
    guests: z.number(),
    totalPrice: z.number(),
})

type ReservationFormData = z.infer<typeof ReservationSchema>;

export default function BookingForm() {
    const {user, isAuthenticated} = useAuth();
    const router = useRouter();

    const [home, setHome] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        const fetchHomeData = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            const homeId = searchParams.get('home');
            const res = await fetch(`http://88.223.95.53:4000/home/${homeId}`);
            if (res.ok) {
                const data = await res.json();
                setHome(data);
            }
            setLoading(false);
        };

        fetchHomeData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!home) return <p>Home not found.</p>;

    const dateRange: DateRange = JSON.parse(sessionStorage.getItem("dateRange"))
    const fromDate: Date = new Date(dateRange.from)
    const toDate: Date = new Date(dateRange.to)

    const fromDateString = fromDate.toLocaleDateString("es-ES");
    const toDateString = toDate.toLocaleDateString("es-ES");

    const guests: number = parseInt(sessionStorage.getItem("guests"))
    const totalNights: number = differenceInDays(toDate, fromDate) - 1
    const totalStayPrice : number = home.pricePerNight * totalNights;
    const nightPrice : number = home.pricePerNight * 0.90;
    const nightPriceTotal : number = totalStayPrice * 0.90;
    const cleaningFee : number = totalStayPrice * 0.03;
    const homelyFee : number = totalStayPrice * 0.07;

    const handleCreateReservation = async (formData: any) => {
        try {
            const request: AddReservationRequest = {
                username: user.username,
                homeId: home.id,
                fromDate: fromDate,
                toDate: toDate,
                guests: guests,
                totalPrice: totalStayPrice,
            }

            console.log(`Request: ${JSON.stringify(request)}`)

            const response = await fetch("http://88.223.95.53:4000/reservation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                alert("Reservation created successfully!");
                const result = await response.json();
                console.log(result);
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error("Error creating the reservation:", error);
            alert("Failed to create reservation. Please try again later.");
        } finally {
            router.push('/');
        }
    };

    return (
        <div className="pb-24 h-full container mx-auto p-4 max-w-3xl min-h-screen overflow-y-scroll">
            <div className="mb-6">
                <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go back to searching
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-5">
                <div className="md:col-span-3">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Your reservation</h2>
                        <div className="grid gap-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Dates</p>
                                    <p className="text-sm text-gray-600">{fromDateString} - {toDateString}</p>
                                </div>
                                <Button variant="outline" size="sm" className={"cursor-not-allowed"}>
                                    Edit
                                </Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Guests</p>
                                    <p className="text-sm text-gray-600">{guests} guests</p>
                                </div>
                                <Button variant="outline" size="sm" className={"cursor-not-allowed"}>
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget);
                        handleCreateReservation(formData)
                        console.log('Form submitted')
                    }}>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Elige cómo quieres pagar</h2>
                            <RadioGroup defaultValue="full">
                                <div className="flex items-center space-x-2 p-4 border rounded-lg mb-2">
                                    <RadioGroupItem value="full" id="full" />
                                    <label htmlFor="full" className="flex-1">
                                        <p className="font-medium">Pay € now</p>
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                                    <RadioGroupItem value="installments" id="installments" />
                                    <label htmlFor="installments" className="flex-1">
                                        <p className="font-medium">Divide payment in 3 months</p>
                                        <p className="text-sm text-gray-600">
                                            Pay in 3 instalments of € without interest (0% APR).{" "}
                                            <Link href="#" className="underline">
                                                More information
                                            </Link>
                                        </p>
                                    </label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Payment method</h2>
                            <div className="space-y-4">
                                <Select defaultValue="credit">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="credit">Credit or debit card</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Input placeholder="Card number" />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="Expiration date" />
                                    <Input placeholder="CVV" />
                                </div>

                                <Input placeholder="Postal code" />

                                <Select defaultValue="ES">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Country/Region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ES">Spain</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button type="submit" className="w-full mt-4">
                                    Finish reservation
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="md:col-span-2">
                    <Card className="sticky top-4">
                        <CardContent className="p-4">
                            <div className="flex gap-4 mb-4">
                                {(home.imagesUrls.length > 0 && home.imagesUrls[0] != '') ? (
                                    <Image
                                        src={`/uploads/${home.imagesUrls[0]}`}
                                        alt="Property"
                                        width={100}
                                        height={100}
                                        className="rounded-lg object-cover"
                                    />
                                ) : (
                                    <Image src={`/uploads/default_image.webp`} alt={"Card image"} width={540}
                                           height={720}
                                           className={"object-cover w-full h-full rounded-lg"} priority/>
                                )}

                                <div className={"justify-end"}>
                                    <h3 className="font-medium">{home.city}, {home.country}</h3>
                                    <div className="flex justify-end w-full gap-1 text-sm">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span>{home.score ? (home.score) : ("New")}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-4">
                                <h3 className="font-semibold">Payment details</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>{nightPrice.toFixed(2)} € x {totalNights} nights</span>
                                        <span>{nightPriceTotal.toFixed(2)} €</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Cleaning fee</span>
                                        <span>{cleaningFee.toFixed(2)} €</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Homely Service Fee</span>
                                        <span>{homelyFee.toFixed(2)} €</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-semibold">
                                    <span>Total (EUR)</span>
                                    <span>{totalStayPrice} €</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
