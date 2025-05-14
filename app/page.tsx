'use client';

import UserDashboard from "@/components/UserDashboard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <div className="px-4 py-4 flex-1">
        <UserDashboard />
      </div>
    </div>
  );
}
