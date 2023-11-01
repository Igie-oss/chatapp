import { useEffect, useState } from "react";
import { customAxios } from "@/lib/helper";
export default function useGetChannelInfo(channelId: string) {
  const [channel, setChannel] = useState<TChannel>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (() => {
      if (channel?.channelId) return;
      setIsLoading(true);
      customAxios
        .get(`channel/${channelId}`)
        .then((res) => {
          if (res?.data) {
            setChannel(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    })();
  }, [channelId, channel?.channelId]);
  return { channel, isLoading };
}
