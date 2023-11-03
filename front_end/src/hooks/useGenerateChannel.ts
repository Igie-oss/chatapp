import { useEffect, useState } from "react";
import { useAppStore } from "@/features/store";
import { customAxios } from "@/lib/helper";
import { useParams } from "react-router-dom";

export default function useGenerateChannel() {
  const [channel, setChannel] = useState<TChannel>({
    channelId: "",
    isGroup: false,
    members: [],
    channelName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { channelId } = useParams();
  const members = useAppStore((state) => state.members);
  useEffect(() => {
    if (!channelId) return;
    setIsLoading(true);
    customAxios
      .get(`/channel/${channelId}`)
      .then((res) => {
        if (res?.data) {
          setChannel(res.data);
        } else {
          setChannel({
            channelId: channelId!,
            members: members,
            isGroup: false,
            channelName: "",
          });
        }
      })
      .catch(() => {
        setChannel({
          channelId: channelId!,
          members: members,
          isGroup: channel.isGroup,
          channelName: "",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [channelId, members]);
  return { channel, isLoading };
}
