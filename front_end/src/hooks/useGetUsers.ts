import { useAppStore } from "@/features/store";
import { customAxios } from "@/lib/helper";
import { useQuery } from "react-query";

export default function useGetUsers() {
  const { userId } = useAppStore((state) => state.user);

  const { data: users, isLoading } = useQuery({
    queryKey: "get_all_users",
    queryFn: async (): Promise<TUser[]> => {
      const res = await customAxios.get("/users");
      return res?.data?.filter((user: TUser) => user.userId !== userId);
    },
  });

  return { users, isLoading };
}
