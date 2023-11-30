import { useEffect, useState } from "react";

export default function useFilterUsers(users: TUser[], searchText: string) {
	const [filteredUsers, setFilteredUsers] = useState<TUser[]>([]);

	useEffect(() => {
		if (!users?.length) return;
		setFilteredUsers(users);
		const timeout: NodeJS.Timeout = setTimeout(() => {
			const filtered = users.filter((user) =>
				user.userName.toLowerCase().includes(searchText.toLowerCase())
			);

			setFilteredUsers(filtered);
		}, 400);

		return () => clearTimeout(timeout);
	}, [searchText, users]);

	return filteredUsers;
}
