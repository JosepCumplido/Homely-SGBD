"use client"

import { ArrowLeft, Star } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
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

export default function BookingForm() {
    const [paymentMethod, setPaymentMethod] = useState("full")

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <div className="mb-6">
                <Link href="#" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Envía una solicitud de reserva
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-5">
                <div className="md:col-span-3">
                    <Card className="mb-6">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <p className="text-green-600 font-semibold mb-2">¡Buen precio!</p>
                                    <p className="text-sm text-gray-600">
                                        El precio en las fechas que has elegido es 6 € inferior a la tarifa media por noche de los últimos tres meses.
                                    </p>
                                </div>
                                <div className="text-pink-500">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                    </svg>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Tu viaje</h2>
                        <div className="grid gap-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Fechas</p>
                                    <p className="text-sm text-gray-600">1–6 dic</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Editar
                                </Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Huéspedes</p>
                                    <p className="text-sm text-gray-600">2 huéspedes</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Editar
                                </Button>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        // Add your form submission logic here
                        console.log('Form submitted')
                    }}>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Elige cómo quieres pagar</h2>
                            <RadioGroup defaultValue="full" onValueChange={setPaymentMethod}>
                                <div className="flex items-center space-x-2 p-4 border rounded-lg mb-2">
                                    <RadioGroupItem value="full" id="full" />
                                    <label htmlFor="full" className="flex-1">
                                        <p className="font-medium">Paga 275,15 € ahora</p>
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                                    <RadioGroupItem value="installments" id="installments" />
                                    <label htmlFor="installments" className="flex-1">
                                        <p className="font-medium">Paga en 3 plazos con Klarna</p>
                                        <p className="text-sm text-gray-600">
                                            Paga en 3 plazos de 91,71 € sin intereses (0% TAE).{" "}
                                            <Link href="#" className="underline">
                                                Más información
                                            </Link>
                                        </p>
                                    </label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Pagar con</h2>
                            <div className="space-y-4">
                                <Select defaultValue="credit">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Método de pago" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="credit">Tarjeta de crédito o débito</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Input placeholder="Número de tarjeta" />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="Caducidad" />
                                    <Input placeholder="CVV" />
                                </div>

                                <Input placeholder="Código postal" />

                                <Select defaultValue="ES">
                                    <SelectTrigger>
                                        <SelectValue placeholder="País/región" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ES">España</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button type="submit" className="w-full mt-4">
                                    Pagar
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="md:col-span-2">
                    <Card className="sticky top-4">
                        <CardContent className="p-4">
                            <div className="flex gap-4 mb-4">
                                <Image
                                    src="/placeholder.svg"
                                    alt="Property"
                                    width={100}
                                    height={100}
                                    className="rounded-lg object-cover"
                                />
                                <div>
                                    <h3 className="font-medium">Disfrutar de la naturaleza</h3>
                                    <p className="text-sm text-gray-600">Habitación en vivienda</p>
                                    <div className="flex items-center gap-1 text-sm">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span>4,98 (46 evaluaciones)</span>
                                        <span>·</span>
                                        <span>Superanfitrión</span>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-4">
                                <h3 className="font-semibold">Detalles del precio</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>45,00 € x 5 noches</span>
                                        <span>225,00 €</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Gastos de limpieza</span>
                                        <span>10,00 €</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Comisión de servicio de Airbnb</span>
                                        <span>40,15 €</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-semibold">
                                    <span>Total (EUR)</span>
                                    <span>275,15 €</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

