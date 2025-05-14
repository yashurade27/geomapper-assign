'use client';

import { useState } from "react";
import SearchUsers from "@/components/SearchUsers";
import Cards from "@/components/Cards";
import Map from "@/components/Map";

interface Location {
  lat: number;
  lng: number;
  city?: string;
  country?: string;
}

const DEFAULT_LOCATION: Location = {
  lat: 18.5204,
  lng: 73.8567,
  city: 'Pune',
  country: 'India',
};

const UserDashboard = () => {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location>(DEFAULT_LOCATION);

  return (
    <div className="flex flex-col gap-4">
      <SearchUsers search={search} setSearch={setSearch} />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Cards onSelectLocation={setSelectedLocation} search={search} />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2">
          <Map {...selectedLocation} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
