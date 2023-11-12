import { useState, useDeferredValue } from "react";
import { BiSearch } from "react-icons/bi";
import GroupChannelList from "./GroupChannelList";
import CreateGroupBtn from "@/components/shared/CreateGroupBtn";
export default function GroupChannelListContainer() {
  const [searchText, setSearchText] = useState("");
  const deferredText = useDeferredValue(searchText);
  return (
    <header className="w-full h-full flex flex-col gap-2">
      <div className="w-full h-10 flex items-center gap-2 px-2 ">
        <div className="w-[70%] h-full border px-2 flex items-center gap-2 rounded-md border-border bg-secondary/50">
          <BiSearch className="h-6 w-6 pointer-events-none opacity-70 " />
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 h-full  outline-none text-sm bg-transparent"
          />
        </div>
        <CreateGroupBtn />
      </div>
      <GroupChannelList searchText={deferredText} />
    </header>
  );
}
