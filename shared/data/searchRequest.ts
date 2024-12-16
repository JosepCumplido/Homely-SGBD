import {Home} from "../models/home";

export class SearchRequest {
    constructor(
        public page: number,
        public size: number|null,
        public city: string|null,
        public guestsNumber: number|undefined,
        public category: string|null,
        public priceRange: number[],
        public featuresList: string[],
        public amenitiesList: string[],
    ) {}
}

export class SearchResponse extends Response {
    constructor(
        public page: number,
        public size: number,
        public total: number,
        public homes: Home[]
    ) {
        super();
    }
}