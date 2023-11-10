import { customAxios } from "@/lib/helper";
import { useQuery } from "react-query";
export default function useGetChannelInfo(channelId: string) {
  const { data: channel, isLoading } = useQuery({
    queryKey:"get_channel_info",
    queryFn: async () => {
      const res = await customAxios.get(`/channel/${channelId}`);
      return res?.data;
    },
  });

  return { channel, isLoading };
}
