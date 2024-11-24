import {SearchRequest, SearchResponse} from "shared/data/searchRequest";

export async function fetchPosts(request: SearchRequest): Promise<SearchResponse> {
    const response = await fetch('http://localhost:4000/home/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    });

    if (!response.ok) throw new Error('Network response failed');

    const searchResponse = await response.json();
    return searchResponse.homes;
}
