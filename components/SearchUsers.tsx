import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface SearchUsersProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchUsers = ({ search, setSearch }: SearchUsersProps) => {
  return (
    <div className="w-full px-4 lg:px-60">
      <div className="w-full max-w-xl flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex flex-col w-full">
          <Label htmlFor="search" className="mb-1">Search</Label>
          <Input
            type="text"
            id="search"
            placeholder="Search Users with Name, Location & Description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button className="w-full sm:w-auto sm:mt-0 mt-1">Search</Button>
      </div>
    </div>
  );
};

export default SearchUsers;
