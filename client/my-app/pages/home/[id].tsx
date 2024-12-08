'use client';
import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { clsx } from 'clsx';
import {
    Building2,
    CableCar,
    Castle,
    Fence,
    Gem,
    Mountain,
    Sailboat,
    TentTree,
    TreePalm,
    TreePine,
    Waves,
} from 'lucide-react';
import type { Home } from 'shared/models/home';
import DisplayGroup from '@/components/createAdd/displayGroup';
import {ContentFrame} from "@/components/explore/content-frame";
import {Separator} from "@/components/ui/separator";

interface HomePageProps {
    homeData: Home | null;
}

const categories = [
    { name: 'beach', label: 'Beach', icon: <TreePalm height={24} width={24} strokeWidth={1.2} /> },
    { name: 'countryside', label: 'Countryside', icon: <Fence height={24} width={24} strokeWidth={1.2} /> },
    { name: 'city', label: 'City', icon: <Building2 height={24} width={24} strokeWidth={1.2} /> },
    { name: 'cabins', label: 'Cabins', icon: <TreePine height={24} width={24} strokeWidth={1.2} /> },
    { name: 'boats', label: 'Boats', icon: <Sailboat height={24} width={24} strokeWidth={1.2} /> },
    { name: 'castles', label: 'Castles', icon: <Castle height={24} width={24} strokeWidth={1.2} /> },
    { name: 'skiing', label: 'Skiing', icon: <CableCar height={24} width={24} strokeWidth={1.2} /> },
    { name: 'lake', label: 'Lake', icon: <Waves height={24} width={24} strokeWidth={1.2} /> },
    { name: 'luxe', label: 'Luxe', icon: <Gem height={24} width={24} strokeWidth={1.2} /> },
    { name: 'mountain', label: 'Mountain', icon: <Mountain height={24} width={24} strokeWidth={1.2} /> },
    { name: 'camping', label: 'Camping', icon: <TentTree height={24} width={24} strokeWidth={1.2} /> },
];

const HomePage: React.FC<HomePageProps> = ({ homeData }) => {
    const router = useRouter();
    const { id } = router.query;

    if (!homeData) {
        return (
            <div className="text-center mt-8">
                No data found for home with ID: {id}
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-6 justify-center py-14 m-auto max-w-4xl">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-4 text-center">{`Property in ${homeData.city}, ${homeData.country}`}</h1>
            <ContentFrame>
                <div className="text-xl font-semibold text-gray-700 mt-2">
                    Price per Night: ${homeData.pricePerNight}
                </div>
            </ContentFrame>
            <Separator orientation="horizontal"/>
            {/* Categories */}

            {categories
                .filter((category) => homeData.categories.includes(category.name))
                .map((category) => (
                    <div
                        key={category.name}
                        className="flex flex-col gap-2 items-center justify-center border-b-2 border-gray-600 font-semibold pb-1.5"
                    >
                        {category.icon}
                        <div className="text-sm text-center">{category.label}</div>
                    </div>
                ))}

            {/* Image Gallery */}

            {homeData.imagesUrls.map((url, index) => (
                <Image
                    key={index}
                    src={url}
                    alt={`Image ${index + 1}`}
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                />
            ))}

            {/* Features */}
            <DisplayGroup
                title="Features"
                groups={[{label: 'Features', subItems: homeData.features}]}
                selectedItems={homeData.features}
                onItemClick={() => {
                }}
            />

            {/* Amenities */}
            <DisplayGroup
                title="Amenities"
                groups={[{label: 'Amenities', subItems: homeData.amenities}]}
                selectedItems={homeData.amenities}
                onItemClick={() => {
                }}
            />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    try {
        const response = await fetch(`http://localhost:4000/home/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch home with ID ${id}: ${response.statusText}`);
            return { props: { homeData: null } };
        }

        const homeData: Home = await response.json();
        return { props: { homeData } };
    } catch (error) {
        console.error(`Error fetching home with ID ${id}:`, error);
        return { props: { homeData: null } };
    }
};

export default HomePage;
