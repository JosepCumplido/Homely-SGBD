import {Home} from "../models/home";

export class SearchRequest {
    constructor(
        public page: number,
        public size: number|null,
        public city: string|null,
        public country: string|null,
        public priceRange: number[],
        public score: number|null,
        public featuresList: string[],
        public amenitiesList: string[],
    ) {}
}

export class SearchResponse {
    constructor(
        public page: number,
        public size: number,
        public total: number,
        public homes: Home[]
    ) {}
}