import { useState } from "react";
import UserSearchList from "./UserSearchList";
export default function Header() {
  const [searchText, setSearchText] = useState("");
  return (
    <header className="w-full  flex flex-col items-center gap-5 relative">
      <h2 className="text-lg font-semibold py-2 px-4 border border-border rounded-md bg-secondary/50">
        Create Group
      </h2>
      <div className="w-full h-16 flex items-center">
        <input
          type="search"
          placeholder="Search user..."
          value={searchText || ""}
          onChange={(e) => setSearchText(e.target.value)}
          className="h-10 w-[80%] px-4 text-sm border rounded-md outline-none focus:bg-secondary/50 bg-transparent"
        />
      </div>
      {searchText ? <UserSearchList /> : null}
    </header>
  );
}
