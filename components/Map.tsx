'use client';

import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";

interface Location {
  city?: string;
  country?: string;
  lat: number;
  lng: number;
}

const Map = ({ lat, lng }: Location) => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
        version: "weekly",
        libraries: ["marker"], 
      });

      const { Map } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement } = await loader.importLibrary("marker"); // Load the marker library

      const position = { lat, lng };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 8,
        mapId: "MY_NEXTJS_MAP_ID",
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
      new AdvancedMarkerElement({ position, map });
    };

    if (lat && lng) {
      initMap();
    }
  }, [lat, lng]);

  return <div className="h-[500px] w-150 pl-10 " ref={mapRef} />;
};

export default Map;
