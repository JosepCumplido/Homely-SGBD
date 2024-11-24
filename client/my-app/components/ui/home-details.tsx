import React from 'react'
import Image from 'next/image'
import { Carousel } from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { Star, Home, Wifi, Utensils, Car, Tv } from 'lucide-react'

export type Home = {
    id: number
    city: string
    country: string
    imagesUrls: string[]
    pricePerNight: number
    score: number
    features: string[]
    amenities: string[]
    categories: string[]
}

const HomeDetails: React.FC<{ home: Home }> = ({ home }) => {
    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold">{`${home.city}, ${home.country}`}</h1>

            <Carousel className="w-full">
                {home.imagesUrls.map((url, index) => (
                    <Image
                        key={index}
                        src={url}
                        alt={`Home image ${index + 1}`}
                        width={800}
                        height={600}
                        className="rounded-lg object-cover"
                    />
                ))}
            </Carousel>

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold">
                        ${home.pricePerNight} <span className="text-lg font-normal">night</span>
                    </h2>
                </div>
                <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{home.score.toFixed(2)}</span>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Features</h3>
                <div className="flex flex-wrap gap-2">
                    {home.features.map((feature, index) => (
                        <Badge key={index} variant="outline">{feature}</Badge>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {home.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            {getAmenityIcon(amenity)}
                            <span>{amenity}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Categories</h3>
                <div className="flex flex-wrap gap-2">
                    {home.categories.map((category, index) => (
                        <Badge key={index} variant="secondary">{category}</Badge>
                    ))}
                </div>
            </div>
        </div>
    )
}

const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
        case 'wifi':
            return <Wifi className="w-5 h-5" />
        case 'kitchen':
            return <Utensils className="w-5 h-5" />
        case 'parking':
            return <Car className="w-5 h-5" />
        case 'tv':
            return <Tv className="w-5 h-5" />
        default:
            return <Home className="w-5 h-5" />
    }
}

export default HomeDetails

