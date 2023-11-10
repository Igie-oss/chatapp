import { useEffect, useState } from "react";
import { useAppStore } from "@/features/store";
import { customAxios } from "@/lib/helper";
import { socket } from "@/socket";
import { useQuery } from "react-query";

export default function useGetUserChannels() {
  const [channels, setChannels] = useState<TChannelMessages[]>([]);
  const { userId } = useAppStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey:"get_user_channels",
    queryFn: async () => {
      const res = await customAxios.get(`/channel/userchannels/${userId}`);
      return res?.data;
    },
  });

  useEffect(() => {
    setChannels(data);
  }, [data]);

  useEffect(() => {
    socket.on("new_channel", (res) => {
      if (res?.data) {
        const data = res.data;
        const filtered = channels.filter((channel) => {
          return channel.channelId !== data?.channelId;
        });
        filtered.unshift(data);
        setChannels(filtered);
      }
    });

    return () => {
      socket.off("new_channel");
    };
  }, [socket, channels]);

  return { channels, isLoading };
}
