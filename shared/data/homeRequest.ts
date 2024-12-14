import {Home} from "../models/home";

export class HomeRequest {
    constructor(
        public city: string,
        public country: string,
        public imagesUrls: string,
        public pricePerNight: number,
        public features: string,
        public amenities: string,
        public categories: string,
    ) {}
}

export class HomeResponse {
    constructor(
        public home: Home | null
    ) {}
}