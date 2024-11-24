'use client'
import React, { useEffect, useState } from 'react';

interface Home {
    id: number;
    city: string;
    country: string;
    pricePerNight: number;
    features: string[];
    amenities: string[];
    categories: string[];
    imagesUrls: string[];
}

const HomeDetails: React.FC<{ homeId: number }> = ({ homeId }) => {
    const [home, setHome] = useState<Home | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHomeDetails = async () => {
            try {
                const response = await fetch('http://localhost:4000/home/${homeId}');
                if (!response.ok) {
                    throw new Error('Failed to fetch home details');
                }
                const data = await response.json();
                setHome(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeDetails();
    }, [homeId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!home) return <p>No home found</p>;

    return (
        <div className="home-details">
            <h2>{home.city}, {home.country}</h2>
            <p>Price per night: ${home.pricePerNight}</p>
            <p>Features: {home.features.join(', ')}</p>
            <p>Amenities: {home.amenities.join(', ')}</p>
            <p>Categories: {home.categories.join(', ')}</p>
            <img src={home.imagesUrls[0]} alt="Home" className="home-image" />
        </div>
    );
};

export default HomeDetails;
