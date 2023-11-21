import { useEffect, useState } from "react";
import { customAxios } from "@/lib/helper";
import { socket } from "@/socket";
import { useInfiniteQuery } from "react-query";
export default function useGetChannelMessages(
  channelId: string,
  cursor: string
) {
  const [messages, setMessages] = useState<TMessages[][]>([]);
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery(
      `channel_messages_${channelId}`,
      async ({ pageParam = cursor }): Promise<TMessages[]> => {
        if (!channelId) return [];
        const res = await customAxios.get(
          `/channel/channelmessage/${channelId}?cursor=${pageParam}`
        );
        return res?.data;
      },
      {
        getNextPageParam: (lastPage, pages) => {
          return lastPage[0]?.messageId;
        },
        select: (data) => ({
          pages: [...data.pages].reverse(),
          pageParams: [...data.pageParams].reverse(),
        }),
      }
    );

  useEffect(() => {
    if (data?.pages) {
      setMessages(data.pages);
    }
  }, [data, isFetching, hasNextPage]);

  useEffect(() => {
    socket.on("new_message", (res) => {
      if (res.data && res?.data?.channelId === channelId) {
        setMessages((prev) => {
          const indexOfLastArr = prev?.length > 0 ? prev?.length - 1 : 0;
          let newMessage = [...prev[indexOfLastArr]];
          newMessage = [...prev[indexOfLastArr], res.data];
          return [...prev.slice(0, indexOfLastArr), newMessage];
        });
      }
    });

    return () => {
      socket.off("new_message");
    };
  }, [socket]);
  return {
    messages,
    error,
    fetchNextPage,
    isFetching,
  };
}