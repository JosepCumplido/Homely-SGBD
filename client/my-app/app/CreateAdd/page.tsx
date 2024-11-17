'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Category } from 'shared/models/category';
import type { FeatureType } from 'shared/models/featureType';
import type { AmenityType } from 'shared/models/amenityType';
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
import { clsx } from 'clsx';
import {FeatureSelector} from "@/components/explore/searchFilters/featureSelector";
import { PhotoUploader } from '@/components/createAdd/imageUploader';
import DisplayGroup from "@/components/createAdd/displayGroup";

const categories: Category[] = [
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

const featureTypes: FeatureType[] = [
    {
        label: 'Kitchen',
        features: ['Oven', 'Microwave', 'Dishwasher', 'Refrigerator', 'Freezer', 'Utensils and dishware', 'Electric kettle', 'Toaster', 'Coffee machine'],
    },
    {
        label: 'Bathroom',
        features: ['Hairdryer', 'Shower', 'Bathtub', 'Towel warmer', 'Towels included', 'Accessible bathroom', 'Bidet', 'Toiletries'],
    },
    { label: 'Bedroom', features: ['King-size bed', 'Individual beds'] },
    {
        label: 'Living areas',
        features: ['TV', 'Dedicated workspace', 'Hardwood flooring', 'Carpet flooring', 'Balcony', 'Terrace', 'Private garden'],
    },
];

const amenityTypes: AmenityType[] = [
    { label: 'Comfort', amenities: ['Air conditioning', 'Heating', 'Soundproofing', 'Fireplace'] },
    {
        label: 'Conveniences',
        amenities: ['Wi-Fi', 'High-speed internet', 'Satellite TV', 'Washer', 'Dryer', 'Ironing board', 'Vacuum and cleaning tools', 'Private parking available', 'Elevator'],
    },
    {
        label: 'Security and safety',
        amenities: ['Reception or concierge', 'Surveillance or cameras', 'Alarm', 'Smoke detector', 'Monoxide detector', 'Fire extinguisher', 'First aid kit'],
    },
    {
        label: 'Additional services',
        amenities: ['Gym', 'Pool', 'Spa or sauna', 'BBQ area', 'Meal service', 'Green spaces', 'Children\'s play area', 'Crib'],
    },
];

interface FormData {
    city: string;
    country: string;
    imagesUrls: string[];
    pricePerNight: number;
    features: string[];
    amenities: string[];
    categories: string[];
}

const CreateAddPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        city: '',
        country: '',
        imagesUrls: [],
        pricePerNight:0,
        features: [],
        amenities: [],
        categories: [],
    });

    const [selectedCategoriesList, setSelectedCategoriesList] = useState<string[]>([]);
    const [selectedFeaturesList, setSelectedFeaturesList] = useState<string[]>([]);
    const [selectedAmenitiesList, setSelectedAmenitiesList] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === 'pricePerNight' ? parseFloat(value) : value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitting data:', formData);

        try {
            const response = await fetch('http://localhost:4000/home', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Ad created successfully!');
                const result = await response.json();
                console.log(result);
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error('Error creating the ad:', error);
            alert('Failed to create ad. Please try again later.');
        }
    };


    const onCategoryClick = (category: string) => {
        setSelectedCategoriesList((prevCategories) =>
            prevCategories.includes(category)
                ? prevCategories.filter((item) => item !== category) // Remove if already selected
                : [...prevCategories, category] // Add if not selected
        );
    }
    const handleFeatureClick = (feature: string) => {
        setSelectedFeaturesList((prevSelected) =>
            prevSelected.includes(feature) ? prevSelected.filter((item) => item !== feature) : [...prevSelected, feature]
        );
    };

    const handleAmenityClick = (amenity: string) => {
        setSelectedAmenitiesList((prevSelected) =>
            prevSelected.includes(amenity) ? prevSelected.filter((item) => item !== amenity) : [...prevSelected, amenity]
        );
    };

    const handlePhotosChange = (photos: File[]) => {
        const imageUrls = photos.map((photo) => URL.createObjectURL(photo));
        setFormData((prev) => ({ ...prev, imagesUrls: imageUrls }));
    };

    const CategorySelector: React.FC<{
        selectedCategory: string[];
        onCategoryChange: (category: string) => void;
    }> = ({ selectedCategory, onCategoryChange }) => (
        <div className="flex flex-row gap-8 items-center w-full overflow-x-scroll no-scrollbar lg:justify-center">
            {categories.map((category) => (
                <div
                    key={category.name}
                    onClick={() => onCategoryChange(category.name)}
                    className={clsx(
                        {
                            'border-b-2 border-gray-600 font-semibold': selectedCategory.includes(category.name),
                            'hover:border-gray-200 hover:font-semibold': !selectedCategory.includes(category.name),
                        },
                        'flex flex-col gap-2 items-center justify-center border-b-2 border-transparent pb-1.5 cursor-pointer'
                    )}
                >
                    {category.icon}
                    <div title={category.label} className="text-sm text-center before-content">
                        {category.label}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col space-y-6 justify-center py-14 m-auto max-w-4xl">
            <h1 className="text-2xl font-bold mb-4 text-center">Create a New Ad!</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    type="number"
                    name="pricePerNight"
                    placeholder="Price per night"
                    value={formData.pricePerNight}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                />

                {/* Categories */}
                <CategorySelector
                    selectedCategory={selectedCategoriesList}
                    onCategoryChange={onCategoryClick}
                />

                {/* Features */}
                <DisplayGroup
                    title="Property Features"
                    groups={featureTypes.map((type) => ({
                        label: type.label, // Subtítol
                        subItems: type.features, // Llista de característiques
                    }))}
                    selectedItems={selectedFeaturesList}
                    onItemClick={handleFeatureClick}
                />

                {/* Amenities */}
                <DisplayGroup
                    title="Property Amenities"
                    groups={amenityTypes.map((type) => ({
                        label: type.label, // Subtítol
                        subItems: type.amenities, // Llista de amenities
                    }))}
                    selectedItems={selectedAmenitiesList}
                    onItemClick={handleAmenityClick}
                    layoutClass="grid grid-cols-2 md:grid-cols-3 gap-4"
                />

                <PhotoUploader onPhotosChange={handlePhotosChange} />

                <Button type="submit">Create Ad</Button>
            </form>
        </div>
    );

};

export default CreateAddPage;
