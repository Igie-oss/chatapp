import { useEffect, useRef, useState } from "react";
import MessageCard from "./MessageCard";
import { BiMessageAltMinus } from "react-icons/bi";
import { socket } from "@/socket";
import { customAxios } from "@/lib/helper";
import BtnsLoaderSpinner from "@/components/shared/loader/BtnLoader";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

// import { useInView } from "react-intersection-observer";
export default function MessagesBox() {
  const { channelId } = useParams();
  const [messages, setMessages] = useState<TMessages[]>([]);
  const scrollRef = useRef<HTMLUListElement | null>(null);

  // const { ref, inView, entry } = useInView({
  //   /* Optional options */
  //   threshold: 0,
  // });

  const { data, isFetching } = useQuery({
    queryKey: `get_channel_messages_${channelId}`,
    queryFn: async () => {
      if(!channelId) return;
      const res = await customAxios.get(`/channel/channelmessage/${channelId}`);
      return res?.data;
    },
  });

  useEffect(() => {
    if (data?.length) {
      setMessages(data);
    }
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
  }, [socket, messages]);

  useEffect(() => {
    if (messages?.length) {
      scrollRef?.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, isFetching]);

  // useEffect(() => {
  //   console.log("Observer in view");
  //   console.log(entry);
  // }, [inView]);


  return (
    <ul
      ref={scrollRef}
      className="w-full h-[82%] overflow-y-auto overflow-x-auto p-2 py-10 flex flex-col items-center gap-2 relative"
    >
      {/* <span ref={ref} /> */}
      {isFetching ? (
        <MessageLoader />
      ) : !messages.length ? (
        <div className="w-full flex flex-col items-center text-base gap-2 opacity-50">
          <p>Empty</p>
          <BiMessageAltMinus className="w-10 h-10" />
        </div>
      ) : (
        messages.map((message) => {
          return <MessageCard key={Math.random()} message={message} />;
        })
      )}
    </ul>
  );
}

const MessageLoader = () => {
  const arr = [];

  for (let i = 0; i < 9; i++) {
    arr.push(i);
  }

  return (
    <div className="w-full flex justify-center">
      <BtnsLoaderSpinner />
    </div>
  );
};
