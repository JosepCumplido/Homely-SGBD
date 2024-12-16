export type Home = {
    id: number|null,
    city: string,
    country: string,
    imagesUrls: string[],
    pricePerNight: number,
    score: number|null,
    features: string[],
    amenities: string[],
    categories: string[]
}