import { useEffect, useState } from "react";
import { useAppStore } from "@/features/store";
import { customAxios } from "@/lib/helper";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function useGenerateChannel() {
  const [channel, setChannel] = useState<TChannel>({
    channelId: "",
    isGroup: false,
    members: [],
    groupName: "",
  });
  const { channelId } = useParams();
  const members = useAppStore((state) => state.members);

  const { data, isLoading } = useQuery({
    queryKey: `get_channel_to_check_${channelId}`,
    enabled:!!channelId,
    queryFn: async () => {
      const res = await customAxios.get(`/channel/${channelId}`);
      return res?.data;
    },
  });

  useEffect(() => {
    if (!channelId) {
      setChannel({
        channelId: "",
        isGroup: false,
        members: [],
        groupName: "",
      });
    }
    if (data) {
      setChannel(data);
    } else {
      setChannel({
        channelId: channelId!,
        members: members,
        isGroup: false,
        groupName: "",
      });
    }
  }, [channelId, members, data]);
  return { channel, isLoading };
}
