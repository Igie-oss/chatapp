import { useEffect, useState } from "react";
import { useAppStore } from "@/services/states/store";
import { customAxios } from "@/lib/helper";
import { useQuery } from "react-query";

export default function useGenerateChannel(channelId: string) {
  const members = useAppStore((state) => state.members);
  const [channel, setChannel] = useState<TChannel>({
    channelId: channelId!,
    members: members,
    isGroup: false,
    groupName: "",
  });

  const { data, isFetching } = useQuery({
    queryKey: `get_channel_to_check_${channelId}`,
    enabled: !!channel?.channelId,
    queryFn: async () => {
      if(!channelId) return;
      const res = await customAxios.get(`/channel/${channelId}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (data?.channelId) {
      setChannel({
        channelId: data?.channelId,
        members: data?.members,
        isGroup: data?.isGroup,
        groupName: data?.groupName,
      });
    }
  }, [data?.channelId, isFetching, channelId]);

  return { channel, isFetching };
}
