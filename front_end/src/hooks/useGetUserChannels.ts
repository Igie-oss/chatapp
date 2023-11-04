import { useEffect, useState } from "react";
import { useAppStore } from "@/features/store";
import { customAxios } from "@/lib/helper";
import { socket } from "@/socket";

export default function useGetUserChannels() {
  const [channels, setChannels] = useState<TChannelMessages[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAppStore((state) => state.user);
  useEffect(() => {
    setIsLoading(true);
    customAxios
      .get(`/channel/userchannels/${userId}`)
      .then((res) => {
        if (res?.data?.length) {
          setChannels(res.data);
        } else {
          setChannels([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setChannels([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    socket.on("new_channel", (res) => {
      if (res?.data) {
        const data = res.data;
        console.log(data);
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
