'use client'

import useProfiles from "@/hooks/use-profiles"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(10)].map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="flex items-center space-x-6">
          <div className="w-14 h-14 rounded-full bg-gray-300" />
          <div className="flex-1 space-y-4 py-2">
            <div className="h-6 bg-gray-300 rounded w-3/4" />
            <div className="h-6 bg-gray-300 rounded w-1/2" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const UsersTable = () => {
  const { profiles, isLoading, error } = useProfiles();

  if (isLoading) return <SkeletonLoader />;
  if (error) return <div>Error loading profiles: {error.message}</div>;

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption>A list of user profiles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg px-6 py-4">Avatar</TableHead>
            <TableHead className="text-lg px-6 py-4">Name</TableHead>
            <TableHead className="text-lg px-6 py-4">Email</TableHead>
            <TableHead className="text-lg px-6 py-4">Role</TableHead>
            <TableHead className="text-lg px-6 py-4">Location</TableHead>
            <TableHead className="text-lg text-right px-6 py-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles?.map((profile, index) => (
            <TableRow key={index}>
              <TableCell className="px-6 py-4">
                {profile.img ? (
                  <img
                    src={profile.img}
                    alt={profile.name}
                    className="w-14 h-14 rounded-full"
                  />
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell className="font-medium px-6 py-4 text-lg">{profile.name}</TableCell>
              <TableCell className="px-6 py-4 text-lg">{profile.email}</TableCell>
              <TableCell className="px-6 py-4 text-lg">{profile.info}</TableCell>
              <TableCell className="px-6 py-4 text-lg">
                {profile.location.city}, {profile.location.country}
              </TableCell>
              <TableCell className="text-right px-6 py-4 space-x-4">
                <Button size="icon" variant="ghost" title="View">
                  <Eye className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" title="Edit">
                  <Pencil className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" title="Delete">
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
                <Button size="icon" variant="ghost" title="More">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
