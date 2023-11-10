import { useEffect, useState } from "react";
import { customAxios } from "@/lib/helper";
import { socket } from "@/socket";
import { useQuery } from "react-query";
export default function useGetChannelMessages(channelId: string) {
  const [messages, setMessages] = useState<TMessages[]>([]);

  const { data, isLoading } = useQuery({
    queryKey:"get_channel_messages",
    queryFn: async () => {
      const res = await customAxios.get(`/channel/channelmessage/${channelId}`);

      return res?.data;
    },
  });

  useEffect(() => {
    setMessages(data);
  }, [data]);
  useEffect(() => {
    socket.on("new_message", (res) => {
      if (res.data && res?.data?.channelId === channelId) {
        setMessages((prev) => [...prev, res.data]);
      }
    });

    return () => {
      socket.off("new_message");
    };
  }, [socket]);
  return { messages, isLoading };
}
