import { useAppStore } from "@/services/states/store";
import { customAxios } from "@/lib/helper";
import { useQuery } from "react-query";

export default function useGetUsers(queryKey: string) {
	const { userId } = useAppStore((state) => state.user);

	const { data: users, isLoading } = useQuery({
		queryKey: queryKey,
		queryFn: async (): Promise<TUser[]> => {
			const res = await customAxios.get("/users");
			return res?.data?.filter((user: TUser) => user.userId !== userId);
		},
	});

	return { users, isLoading };
}
