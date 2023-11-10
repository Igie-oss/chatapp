import { BiSearch } from "react-icons/bi";
import ChannelList from "./ChannelList";
import { useDeferredValue, useState } from "react";
import { Button } from "@/components/ui/button";
export default function ChannelListContainer() {
  const [searchText, setSearchText] = useState("");
  const searchTextDeffered = useDeferredValue(searchText);
  return (
    <header className="w-full h-full flex flex-col gap-2">
      <div className="w-full h-10 flex items-center gap-2 px-2 ">
        <div className="flex-1  h-full border px-2 flex items-center gap-2 rounded-md border-border bg-secondary/50">
          <BiSearch className="h-6 w-6 pointer-events-none opacity-70 " />
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full h-full  outline-none text-sm bg-transparent"
          />
        </div>
        <Button>Create Group</Button>
      </div>
      <ChannelList searchText={searchTextDeffered} />
    </header>
  );
}
