'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useProfiles from "@/hooks/use-profiles";
import Card, { Profile } from "./Card";
import MapAllView from "./MapAllView";

import { Skeleton } from "@/components/ui/skeleton"


interface Location {
    city?: string;
    country?: string;
    lat: number;
    lng: number;
}

interface CardsProps {
  onSelectLocation: (location: Location) => void;
  search: string;
}

const Cards = ({ onSelectLocation, search }: CardsProps) => {
  const { profiles, isLoading, error } = useProfiles();

  const filteredProfiles = profiles?.filter((profile) => {
    const query = search.toLowerCase();
    return (
      profile.name.toLowerCase().includes(query) ||
      profile.location.city?.toLowerCase().includes(query) ||
      profile.location.country?.toLowerCase().includes(query) ||
      profile.info.toLowerCase().includes(query)
    );
  });

    if (isLoading) {
  return (
    <div className="flex flex-col items-start gap-6 px-4 md:px-20 lg:px-30 w-full">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md flex items-start gap-6"
        >
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="flex flex-col space-y-4 flex-1">
            <div className="space-y-2">
              <Skeleton className="w-40 h-6 rounded-md" />
              <Skeleton className="w-60 h-4 rounded-md" />
            </div>
            <div className="flex gap-4 flex-wrap">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-28 h-10 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


    if (error || !filteredProfiles || filteredProfiles.length === 0) {
    return <div className="text-center py-8 text-red-500">No profiles found.</div>;
  }

  return (
  <div className="flex flex-col items-start gap-6 px-4 md:px-20 lg:px-30 w-full">
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="flex space-x-2">
        <TabsTrigger value="account">Profile</TabsTrigger>
        <TabsTrigger value="view_on_map">View On Map</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <div className="flex flex-col gap-4">
          {filteredProfiles.map((profile: Profile, index: number) => (
            <div key={index} className="w-full max-w-4xl mx-auto">
              <Card {...profile} onShowMap={onSelectLocation} />
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="view_on_map">
        <MapAllView />
      </TabsContent>
    </Tabs>
  </div>
);
};

export default Cards;