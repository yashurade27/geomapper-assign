'use client';

import { Profile } from "./Card";  

const ViewProfile = ({ name, email, location, info, img, gender }: Profile) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      
      <div className="flex flex-col items-center text-center">
        <img
          className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
          src={img || '/default-profile.png'}
          alt="Profile"
        />
        <h2 className="text-4xl font-semibold text-gray-900 mt-4">{name}</h2>
        <p className="text-lg text-gray-600 mt-2">{info}</p>
      </div>

      
      <div className="flex flex-col gap-6 text-gray-700 mt-6">
        <div>
          <p className="text-sm font-semibold text-gray-500">Location:</p>
          <p className="text-lg">{location.city}, {location.country}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-500">Email:</p>
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline text-lg">
            {email}
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-500">Gender:</p>
          <p className="text-lg">{gender || "Not specified"}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
