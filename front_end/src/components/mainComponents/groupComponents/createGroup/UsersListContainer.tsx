import useGetUsers from "@/hooks/useGetUsers";
import useFilterUsers from "@/hooks/useFilterUsers";
import { useDeferredValue, useState } from "react";
import GroupUsersList from "./GroupUsersList";

type Props = {
	groupMembers: TMembers[];
	handleAddUser: (member: TMembers) => void;
	handleRemoveUser: (userId: string) => void;
};
export default function UsersListContainer({
	groupMembers,
	handleAddUser,
	handleRemoveUser,
}: Props) {
	const { users, isLoading } = useGetUsers("creategroup_users_list");
	const [searchText, setSearchText] = useState("");
	const defferdText = useDeferredValue(searchText);
	const filteredUsers = useFilterUsers(users as TUser[], defferdText);
	return (
		<>
			<header className="w-full h-16 flex items-center">
				<input
					type="text"
					placeholder="Search user..."
					value={searchText || ""}
					onChange={(e) => setSearchText(e.target.value)}
					className="h-10 w-[80%] px-4 text-sm border rounded-md outline-none focus:bg-secondary/50 bg-transparent"
				/>
			</header>
			<GroupUsersList
				users={filteredUsers}
				isLoading={isLoading}
				groupMembers={groupMembers}
				handleAddUser={handleAddUser}
				handleRemoveUser={handleRemoveUser}
			/>
		</>
	);
}
