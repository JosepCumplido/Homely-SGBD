'use client';
import React, {useCallback, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import type {Category} from 'shared/models/category';
import type {FeatureType} from 'shared/models/featureType';
import type {AmenityType} from 'shared/models/amenityType';
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
    Waves
} from 'lucide-react';
import {clsx} from 'clsx';
import {PhotoUploader} from '@/components/host/imageUploader';
import DisplayGroup from "@/components/host/displayGroup";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {useRouter} from 'next/navigation';
import DropdownSearch from "@/components/ui/dropdown-search";
import {z} from "zod";
import {Pair} from "@/utils/types";
import LocationDropdown from "@/components/host/LocationDropdown";
import {HomeRequest} from "shared/data/homeRequest"

const categories: Category[] = [
    {name: 'beach', label: 'Beach', icon: <TreePalm height={24} width={24} strokeWidth={1.2}/>},
    {name: 'countryside', label: 'Countryside', icon: <Fence height={24} width={24} strokeWidth={1.2}/>},
    {name: 'city', label: 'City', icon: <Building2 height={24} width={24} strokeWidth={1.2}/>},
    {name: 'cabins', label: 'Cabins', icon: <TreePine height={24} width={24} strokeWidth={1.2}/>},
    {name: 'boats', label: 'Boats', icon: <Sailboat height={24} width={24} strokeWidth={1.2}/>},
    {name: 'castles', label: 'Castles', icon: <Castle height={24} width={24} strokeWidth={1.2}/>},
    {name: 'skiing', label: 'Skiing', icon: <CableCar height={24} width={24} strokeWidth={1.2}/>},
    {name: 'lake', label: 'Lake', icon: <Waves height={24} width={24} strokeWidth={1.2}/>},
    {name: 'luxe', label: 'Luxe', icon: <Gem height={24} width={24} strokeWidth={1.2}/>},
    {name: 'mountain', label: 'Mountain', icon: <Mountain height={24} width={24} strokeWidth={1.2}/>},
    {name: 'camping', label: 'Camping', icon: <TentTree height={24} width={24} strokeWidth={1.2}/>},
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

const HomeSchema = z.object({
    city: z.string(),
    country: z.string(),
    imagesUrls: z.array(z.string()),
    pricePerNight: z.number(),
    features: z.array(z.string()),
    amenities: z.array(z.string()),
    categories: z.array(z.string())
})

type HomeFormData = z.infer<typeof HomeSchema>;

/*interface FormData {
    city: string;
    country: string;
    imagesUrls: string[];
    pricePerNight: number;
    features: string[];
    amenities: string[];
    categories: string[];
}*/

const CreateAddPage: React.FC = () => {
    /*const [formData, setFormData] = useState<FormData>({
        city: '',
        country: '',
        imagesUrls: [],
        pricePerNight: 0,
        features: [],
        amenities: [],
        categories: [],
    });*/

    const router = useRouter();
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Partial<Record<keyof HomeFormData, string[]>>>({});

    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    const [selectedCategoriesList, setSelectedCategoriesList] = useState<string[]>([]);
    const [selectedFeaturesList, setSelectedFeaturesList] = useState<string[]>([]);
    const [selectedAmenitiesList, setSelectedAmenitiesList] = useState<string[]>([]);

    const [uploading, setUploading] = useState(false);

    /*const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const formData = new FormData();
        Array.from(files).forEach(file => formData.append("images", file));

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            setUploadedImages(data.imageUrls);
        } else {
            console.error("Error uploading files");
        }
    };*/

   /*const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: name === 'pricePerNight' ? parseFloat(value) : value}));
    };*/

    const handleCreateHome = async (formData: any) => {
        const data = Object.fromEntries(formData) as HomeFormData;
        formData.append("imagesUrls", JSON.stringify(uploadedImages));

        setUploading(true); // Marquem que s'està pujant les imatges i creant l'anunci
        setErrors({});

        // Enviar primer les imatges a l'API
        const uploadedImageUrls = await Promise.all(uploadedImages.map(async (file: string | Blob) => {
            const formDataImage = new FormData();
            formDataImage.append('file', file); // Enviem el fitxer original
            const response = await fetch('/api/upload', { method: 'POST', body: formDataImage });
            const result = await response.json();
            // Assuming the backend returns a URL for each image
            return result.url;
        }));

        // Després de pujar les imatges, enviem la crida per crear l'anunci
        /*const updatedFormData = {
            ...formData,
            /!*imagesUrls: uploadedImageUrls,*!/ // Incloem les URLs de les imatges pujades
            categories: selectedCategoriesList,
            features: selectedFeaturesList,
            amenities: selectedAmenitiesList,
        };*/

        try {
            const request: HomeRequest = {
                city: city,
                country: country,
                imagesUrls: uploadedImageUrls.join(", "),
                pricePerNight: formData.get("pricePerNight"),
                features: selectedFeaturesList.join(", "),
                amenities: selectedAmenitiesList.join(", "),
                categories: selectedCategoriesList.join(", "),
            }

            const response = await fetch("http://localhost:4000/home/upload/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                alert("Ad created successfully!");
                const result = await response.json();
                console.log(result);
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error("Error creating the ad:", error);
            alert("Failed to create ad. Please try again later.");
        } finally {
            setUploading(false); // Desactivem l'estat d'uploading quan hagi acabat
            /*router.push('/');*/
        }
    };

    const handlePhotosChange = (photos: File[]) => {
        setUploadedImages((prev) => [...prev, ...photos]);
    };

    const CategorySelector: React.FC<{
        selectedCategory: string[];
        onCategoryChange: (category: string) => void;
    }> = ({ selectedCategory, onCategoryChange }) => (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
                <div
                    key={category.name}
                    onClick={() => onCategoryChange(category.name)}
                    className={clsx(
                        'flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all',
                        {
                            'bg-primary text-primary-foreground': selectedCategory.includes(category.name),
                            'bg-secondary hover:bg-secondary/80': !selectedCategory.includes(category.name),
                        }
                    )}
                >
                    {category.icon}
                    <div className="text-sm text-center mt-2">{category.label}</div>
                </div>
            ))}
        </div>
    );

    const onLocationChange = useCallback((value: Pair<string, string>) => {
        setCountry(value[0]);
        setCity(value[1]);
    }, [])

    return (
        <div className="container mx-auto py-10">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Create a New Accommodation</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        id="form"
                        className="space-y-8"
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);

                            formData.append("city", city);
                            formData.append("country", country);

                            /*for (const [key, value] of formData.entries()) {
                                console.log(`${key}: ${value}`);
                            }*/

                            handleCreateHome(formData)
                        }}
                    >
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Main Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <LocationDropdown value={[country, city]} onValueChange={onLocationChange}/>
                                <Input
                                    type="number"
                                    id="pricePerNight"
                                    name="pricePerNight"
                                    placeholder="Price per night"
                                />
                            </div>
                        </div>

                        <Separator/>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Categories</h2>
                            <CategorySelector
                                selectedCategory={selectedCategoriesList}
                                onCategoryChange={(category) => setSelectedCategoriesList(prev => prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category])}
                            />
                        </div>

                        <Separator/>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Property Features</h2>
                            <DisplayGroup
                                groups={featureTypes.map((type) => ({
                                    label: type.label,
                                    subItems: type.features,
                                }))}
                                selectedItems={selectedFeaturesList}
                                onItemClick={(feature) => setSelectedFeaturesList(prev => prev.includes(feature) ? prev.filter(item => item !== feature) : [...prev, feature])}
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Property Amenities</h2>
                            <DisplayGroup
                                groups={amenityTypes.map((type) => ({
                                    label: type.label,
                                    subItems: type.amenities,
                                }))}
                                selectedItems={selectedAmenitiesList}
                                onItemClick={(amenity) => setSelectedAmenitiesList(prev => prev.includes(amenity) ? prev.filter(item => item !== amenity) : [...prev, amenity])}
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Photos</h2>
                            <PhotoUploader onPhotosChange={handlePhotosChange} />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" className="w-full md:w-auto" disabled={uploading}>
                                {uploading ? 'Publishing...' : 'Publish'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateAddPage;

