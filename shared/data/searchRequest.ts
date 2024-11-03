export class SearchRequest {
    constructor(
        public city: string|null,
        public country: string|null,
        public priceRange: number[],
        public score: number|null,
        public featuresList: string[],
        public amenitiesList: string[],
    ) {}
}