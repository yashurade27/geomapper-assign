'use client'
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import useProfiles from '@/hooks/use-profiles';

const MapAllView = () => {
  const { profiles, isLoading, error } = useProfiles();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapLoader = useRef<Loader | null>(null);  // Use ref to ensure we load once

  useEffect(() => {
    if (!profiles || profiles.length === 0) return;

    const initMap = async () => {
      try {
        // Check if mapLoader is already initialized
        if (!mapLoader.current) {
          mapLoader.current = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
            version: 'weekly',
            libraries: ['marker'],  // Load the marker library the first time
          });
        }

        const { AdvancedMarkerElement } = await mapLoader.current.importLibrary('marker') as unknown as google.maps.MarkerLibrary;
        const Map = google.maps.Map;

        const bounds = new google.maps.LatLngBounds();
        const map = new Map(mapRef.current as HTMLDivElement, {
          zoom: 4,
          center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
          mapId: 'MY_NEXTJS_MAP_ID',
        });

        profiles.forEach((profile) => {
          const { lat, lng } = profile.location;
          const position = { lat, lng };
          bounds.extend(position);

          const markerDiv = document.createElement('div');
          markerDiv.style.width = '32px';
          markerDiv.style.height = '32px';
          markerDiv.style.borderRadius = '50%';
          markerDiv.style.overflow = 'hidden';
          markerDiv.style.border = '2px solid white';  
          markerDiv.style.boxShadow = '0 0 4px rgba(0,0,0,0.3)';  

          const img = document.createElement('img');
          img.src = profile.img || '/profileBulk.png';  // Default fallback image
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'cover';  

          markerDiv.appendChild(img);

          const marker = new AdvancedMarkerElement({
            position,
            map,
            title: profile.name,
            content: markerDiv,
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="min-width:150px;">
                <strong>${profile.name}</strong><br/>
                ${profile.info}<br/>
                <small>${profile.email}</small>
              </div>
            `,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        map.fitBounds(bounds);  
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();
  }, [profiles]);

  if (isLoading) return <div>Loading map and profiles...</div>;
  if (error) return <div>Error loading profiles: {error.message}</div>;

  return <div ref={mapRef} className="h-[700px] w-full pl-10" />;
};

export default MapAllView;
