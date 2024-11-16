'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import type { Category } from 'shared/models/category';
import type { FeatureType } from 'shared/models/featureType';
import type { AmenityType } from 'shared/models/amenityType';
import {
    Building2,
    CableCar,
    Castle,
    Fence,
    Gem,
    LayoutGrid,
    Mountain,
    Sailboat,
    TentTree,
    TreePalm,
    TreePine,
    Waves,
} from 'lucide-react';
import { clsx } from 'clsx';
import { ContentFrame } from '@/components/explore/content-frame';
import {FeatureSelector} from "@/components/explore/searchFilters/featureSelector";
import { PhotoUploader } from '@/components/createAdd/imageUploader';

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
    title: string;
    description: string;
    price: string;
    country: string;
    city: string;
    availability: Date | null;
    photos: File[];
}

const CreateAddPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        price: '',
        country: '',
        city: '',
        availability: null,
        photos: [],
    });

    const [selectedCategoriesList, setSelectedCategoriesList] = useState<string[]>([]);
    const [selectedFeaturesList, setSelectedFeaturesList] = useState<string[]>([]);
    const [selectedAmenitiesList, setSelectedAmenitiesList] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData, selectedFeaturesList, selectedAmenitiesList);
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
        setFormData((prev) => ({ ...prev, photos }));
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
        <div className="flex flex-col space-y-6 justify-center py-14 m-auto">
            <ContentFrame>
                <h1>Create a new add!</h1>
                <Form onSubmit={handleSubmit}>
                    <Input type="number" name="price" placeholder="Price per night" value={formData.price} onChange={handleInputChange} />
                    <Input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} />
                    <Input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />

                    <CategorySelector
                        selectedCategory={selectedCategoriesList}
                        onCategoryChange={onCategoryClick}
                    />

                    {/* Selecció de features */}
                    <div className="flex flex-col gap-8 pb-8">
                        <p className="text-lg font-semibold leading-none tracking-tight">Property features</p>
                        {featureTypes.map((featureType, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                <p className="text-md font-semibold leading-none tracking-tight">{featureType.label}</p>
                                <div className="flex flex-wrap gap-3">
                                    {featureType.features.map((feature, index) => (
                                        <FeatureSelector
                                            key={index}
                                            label={feature}
                                            selected={selectedFeaturesList.includes(feature)}
                                            onClick={() => handleFeatureClick(feature)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Selecció d'amenities */}
                    <div className="flex flex-col gap-8 pb-8">
                        <p className="text-lg font-semibold leading-none tracking-tight">Property amenities</p>
                        {amenityTypes.map((amenityType, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                <p className="text-md font-semibold leading-none tracking-tight">{amenityType.label}</p>
                                <div className="flex flex-wrap gap-3">
                                    {amenityType.amenities.map((amenity, index) => (
                                        <FeatureSelector
                                            key={index}
                                            label={amenity}
                                            selected={selectedAmenitiesList.includes(amenity)}
                                            onClick={() => handleAmenityClick(amenity)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <PhotoUploader onPhotosChange={handlePhotosChange} />

                    <Button type="submit">Create Add</Button>
                </Form>
            </ContentFrame>
        </div>
    );
};

export default CreateAddPage;
