'use client';
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { toast } from 'sonner';
import { useState } from "react";
import ViewProfile from "./ViewProfile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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

interface CardProps extends Profile {
  onShowMap: (location: Location) => void;
}

const Card = ({ name, email, location, info, img, gender, onShowMap }: CardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col md:flex-row items-start md:items-center gap-6">
      <Image
        className="w-16 h-16 rounded-full border object-cover shrink-0"
        src={img || '/default-profile.png'}
        width={64}
        height={64}
        alt="Profile"
        unoptimized
      />
      <div className="flex flex-col space-y-3 w-full">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500">{info}</p>
        </div>

        <div className="flex flex-wrap items-center text-xs text-gray-500 gap-1">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location.city}, {location.country}</span>
          </div>
          <span className="hidden sm:inline">·</span>
          <a href={`mailto:${email}`} className="hover:underline break-all">{email}</a>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setIsDrawerOpen(true)}
          >
            View Profile
          </Button>
          <Button
            variant="outline"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => {
              onShowMap(location);
              toast.success(`Showing ${location.city}, ${location.country} on map`);
            }}
          >
            <MapPin className="mr-1 w-3 h-3" />
            Show On Map
          </Button>
        </div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Profile Details</DrawerTitle>
            <DrawerDescription>Here are the details of {name}&apos;s profile</DrawerDescription>
          </DrawerHeader>
          <ViewProfile name={name} email={email} location={location} info={info} img={img} gender={gender} />
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Card;
