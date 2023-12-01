import { useDeferredValue, useState } from "react";
import UsersList from "./UsersList";
import { BiSearch } from "react-icons/bi";
export default function UserListContainer() {
  const [searchText, setSearchText] = useState("");
  const searchTextDeffered = useDeferredValue(searchText);
  return (
    <header className="w-full h-full flex flex-col gap-2">
      <div className="w-[90%] h-10 flex items-center gap-2 border px-2 rounded-md border-border bg-secondary/50">
        <BiSearch className="h-6 w-6 pointer-events-none opacity-70 " />
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full h-full  outline-none text-sm bg-transparent"
        />
      </div>
      <UsersList searchText={searchTextDeffered} />
    </header>
  );
}
