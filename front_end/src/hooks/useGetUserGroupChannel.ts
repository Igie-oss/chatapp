import { customAxios } from "@/lib/helper";
import { useQuery } from "react-query";

export default function useGetUserGroupChannel(userId: string) {
  const { data: groupChannels, isLoading } = useQuery({
    queryKey:"get_user_group",
    queryFn: async () => {
      const res = await customAxios.get(`/channel/groupchannel/${userId}`);
      return res?.data;
    },
  });

  return { groupChannels, isLoading };
}
