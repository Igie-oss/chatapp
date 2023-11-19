import { useEffect, useState } from "react";
import { customAxios } from "@/lib/helper";
import { socket } from "@/socket";
import { useQuery } from "react-query";
export default function useGetChannelMessages(
  channelId: string,
  cursor: string
) {
  const [messages, setMessages] = useState<TMessages[]>([]);

  const { data, isFetching } = useQuery({
    queryKey: `get_channel_messages_${channelId}`,
    enabled: !!channelId,
    queryFn: async () => {
      if (!channelId) return;
      const res = await customAxios.get(
        `/channel/channelmessage/${channelId}?cursor=${cursor}`
      );
      return res?.data;
    },
  });
  useEffect(() => {
    if (data?.length) {
      setMessages(data);
    }
  }, [data, isFetching]);

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
  return { messages, isFetching};
}
