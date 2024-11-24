import HomeDetails, { Home } from '@/components/ui/home-details'

export default function Page() {
    // Este es un ejemplo de datos. En una aplicación real, estos datos vendrían de una API o base de datos.
    const exampleHome: Home = {
        id: 1,
        city: "Barcelona",
        country: "Spain",
        imagesUrls: [
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800"
        ],
        pricePerNight: 120,
        score: 4.8,
        features: ["2 bedrooms", "1 bathroom", "Kitchen", "Wifi", "Air conditioning"],
        amenities: ["Wifi", "Kitchen", "Parking", "TV"],
        categories: ["Beach", "City center", "Family-friendly"]
    }

    return (
        <main className="min-h-screen bg-gray-100 py-8">
            <HomeDetails home={exampleHome} />
        </main>
    )
}

