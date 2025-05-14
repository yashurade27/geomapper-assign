'use client';
import Image from 'next/image';

import { Profile } from "./Card";

const ViewProfile = ({ name, email, location, info, img, gender }: Profile) => {
  return (
    <div className="w-full max-w-xl mx-auto p-2 bg-white rounded-xl shadow-md">

      <div className="flex flex-col items-center text-center">
        <Image
          width={40}
          height={40}
          className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
          src={img || '/default-profile.png'}
          alt="Profile"
          unoptimized
        />
        <h2 className="text-xl font-semibold text-gray-900 mt-2">{name}</h2>
        <p className="text-sm text-gray-600 mt-1">{info}</p>
      </div>

      <div className="flex flex-col gap-4 text-gray-700 mt-4">
        <div>
          <p className="text-xs font-semibold text-gray-500">Location:</p>
          <p className="text-sm">{location.city}, {location.country}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500">Email:</p>
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline text-sm">
            {email}
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500">Gender:</p>
          <p className="text-sm">{gender || "Not specified"}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
