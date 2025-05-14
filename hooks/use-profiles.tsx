'use client'

import { useState, useEffect } from "react";

interface Location {
    city?: string;
    country?: string;
    lat: number;
    lng: number;
}

export interface Profile {
    name: string;
    email: string;
    location: Location;
    info: string;
    img?: string;
    gender?: 'male' | 'female';
}

export const useProfiles = () => {
    const [profiles, setProfiles] = useState<Profile[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            setIsLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 500));

                const mockProfiles: Omit<Profile, "img">[] = [
                    {
                        name: "John Doe",
                        email: "@johndoe",
                        location: { city: "New York", country: "USA", lat: 40.7128, lng: -74.006 },
                        info: "Software Engineer",
                        gender: "male"
                    },
                    {
                        name: "Jane Smith",
                        email: "@janesmith",
                        location: { city: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437 },
                        info: "Product Manager",
                        gender: "female"
                    },
                    {
                        name: "Alice Johnson",
                        email: "@alicejohnson",
                        location: { city: "Chicago", country: "USA", lat: 41.8781, lng: -87.6298 },
                        info: "UX Designer",
                        gender: "female"
                    },
                    {
                        name: "Bob Brown",
                        email: "@bobbrown",
                        location: { city: "Houston", country: "USA", lat: 29.7604, lng: -95.3698 },
                        info: "Data Scientist",
                        gender: "male"
                    },
                    {
                        name: "Charlie Green",
                        email: "@charliegreen",
                        location: { city: "Phoenix", country: "USA", lat: 33.4484, lng: -112.074 },
                        info: "DevOps Engineer",
                        gender: "male"
                    },
                    {
                        name: "Diana Prince",
                        email: "@dianaprince",
                        location: { city: "San Francisco", country: "USA", lat: 37.7749, lng: -122.4194 },
                        info: "Cybersecurity Analyst",
                        gender: "female"
                    },
                    {
                        name: "Ethan Hunt",
                        email: "@ethanhunt",
                        location: { city: "Seattle", country: "USA", lat: 47.6062, lng: -122.3321 },
                        info: "Network Engineer",
                        gender: "male"
                    },
                    {
                        name: "Fiona Apple",
                        email: "@fionaapple",
                        location: { city: "Boston", country: "USA", lat: 42.3601, lng: -71.0589 },
                        info: "Web Developer",
                        gender: "female"
                    },
                    {
                        name: "George Clooney",
                        email: "@georgeclooney",
                        location: { city: "Miami", country: "USA", lat: 25.7617, lng: -80.1918 },
                        info: "Cloud Architect",
                        gender: "male"
                    },
                    {
                        name: "Hannah Montana",
                        email: "@hannahmontana",
                        location: { city: "Denver", country: "USA", lat: 39.7392, lng: -104.9903 },
                        info: "Mobile Developer",
                        gender: "female"
                    },
                    {
                        name: "Ian Malcolm",
                        email: "@ianmalcolm",
                        location: { city: "Atlanta", country: "USA", lat: 33.749, lng: -84.388 },
                        info: "AI Researcher",
                        gender: "male"
                    },
                    {
                        name: "Jessica Jones",
                        email: "@jessicajones",
                        location: { city: "Dallas", country: "USA", lat: 32.7767, lng: -96.797 },
                        info: "Blockchain Developer",
                        gender: "female"
                    },
                    {
                        name: "Kevin Spacey",
                        email: "@kevinspacey",
                        location: { city: "Austin", country: "USA", lat: 30.2672, lng: -97.7431 },
                        info: "Game Developer",
                        gender: "male"
                    },
                    {
                        name: "Laura Croft",
                        email: "@lauracroft",
                        location: { city: "San Diego", country: "USA", lat: 32.7157, lng: -117.1611 },
                        info: "Systems Analyst",
                        gender: "female"
                    }
                ];

                const fetchImage = async (gender: 'male' | 'female') => {
                    try {
                        const res = await fetch(`https://randomuser.me/api/?gender=${gender}`);
                        if (!res.ok) throw new Error('Failed to fetch image');
                        const data = await res.json();
                        return data.results[0].picture.medium;
                    } catch (error) {
                        return "/profileBulk.png"; // Fallback to local image in public folder
                    }
                };

                const profilesWithImages: Profile[] = await Promise.all(
                    mockProfiles.map(async (profile) => {
                        const img = await fetchImage(profile.gender!);
                        return { ...profile, img };
                    })
                );

                setProfiles(profilesWithImages);
                setIsLoading(false);
            } catch (err) {
                setError(err as Error);
                setIsLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    return { profiles, isLoading, error };
};

export default useProfiles;
