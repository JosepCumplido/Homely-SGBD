import {SearchRequest, SearchResponse} from "shared/data/searchRequest";
import {User} from "shared/models/user";

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

export async function fetchUser(username: string): Promise<User | null> {
    try {
        const response = await fetch(`http://localhost:4000/user/${username}`);
        if (!response.ok) new Error('Failed to fetch user');
        return await response.json();
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null
    }
}