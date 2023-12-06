import { useDeferredValue, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import UsersList from "./UsersList";
import { BiSearch } from "react-icons/bi";
export default function UserListContainer() {
	const [searchText, setSearchText] = useState("");
	const searchTextDeffered = useDeferredValue(searchText);
	return (
		<>
			<header className="w-full h-12 flex gap-2">
				{searchText ? (
					<button
						type="button"
						onClick={() => setSearchText("")}
						className="p-2 w-fit h-fit flex rounded-full  hover:bg-secondary">
						<MdArrowBackIosNew className="w-6 h-6 pointer-events-none opacity-70" />
					</button>
				) : null}
				<div className="w-[90%] h-10 flex items-center gap-2 border px-2 rounded-full border-border bg-secondary/50">
					<BiSearch className="h-6 w-6 pointer-events-none opacity-70 " />
					<input
						type="text"
						placeholder="Search..."
						value={searchText || ""}
						onChange={(e) => setSearchText(e.target.value)}
						className="w-full h-full  outline-none text-sm bg-transparent"
					/>
				</div>
			</header>
			<UsersList searchText={searchTextDeffered} />
		</>
	);
}
