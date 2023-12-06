import { useState, useDeferredValue } from "react";
import { Search, ChevronLeft } from "lucide-react";
import GroupChannelList from "./GroupChannelList";
import CreateGroupBtn from "@/components/shared/CreateGroupBtn";
export default function GroupChannelListContainer() {
	const [searchText, setSearchText] = useState("");
	const deferredText = useDeferredValue(searchText);
	return (
		<>
			<header className="w-full h-10 flex items-center gap-1 px-2 ">
				{searchText ? (
					<button
						type="button"
						onClick={() => setSearchText("")}
						className="p-2 flex rounded-full  hover:bg-secondary">
						<ChevronLeft className="w-6 h-6 pointer-events-none opacity-70" />
					</button>
				) : null}
				<div className=" flex-1 h-full border px-2 flex items-center gap-2 rounded-full border-border bg-secondary/50">
					<Search className="h-6 w-6 pointer-events-none opacity-70 " />
					<input
						type="text"
						placeholder="Search..."
						value={searchText || ""}
						onChange={(e) => setSearchText(e.target.value)}
						className="flex-1 h-full  outline-none text-sm  bg-transparent"
					/>
				</div>
				<CreateGroupBtn />
			</header>
			<GroupChannelList searchText={deferredText} />
		</>
	);
}
