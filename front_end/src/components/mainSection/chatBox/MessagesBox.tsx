import { useEffect, useRef, useState } from "react";
import MessageCard from "./MessageCard";
import { BiMessageAltMinus } from "react-icons/bi";
import { socket } from "@/socket";
import { customAxios } from "@/lib/helper";
import Skeleton from "@/components/shared/Skeleton";
import { useParams } from "react-router-dom";

export default function MessagesBox() {
  const { channelId } = useParams();
  const [messages, setMessages] = useState<TMessages[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!channelId) return;
    setIsLoading(true);
    customAxios
      .get(`/channel/channelmessage/${channelId}`)
      .then((res) => {
        if (res.data?.length) {
          setMessages(res.data);
        } else {
          setMessages([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessages([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [channelId]);

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
  }, [messages]);

  return (
    <ul
      ref={scrollRef}
      className="w-full h-[82%] overflow-y-auto overflow-x-auto p-2 py-10 flex flex-col items-center gap-2 relative"
    >
      {isLoading ? (
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
    <div className="w-full flex flex-col gap-2">
      <div className="w-full  flex items-center px-2 gap-2 ">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <Skeleton />
        </div>

        <div className="w-[70%] h-5 rounded-lg overflow-hidden">
          <Skeleton />
        </div>
      </div>
      <div className="w-full  flex items-center px-2 gap-2 ">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <Skeleton />
        </div>

        <div className="w-[70%] h-5 rounded-lg overflow-hidden">
          <Skeleton />
        </div>
      </div>
      <div className="w-full  flex items-center px-2 gap-2 ">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <Skeleton />
        </div>

        <div className="w-[70%] h-5 rounded-lg overflow-hidden">
          <Skeleton />
        </div>
      </div>
      {arr.map((a) => {
        return (
          <div
            key={a}
            className={`w-full  flex items-center px-2 gap-2 ${
              a % 2 !== 0 ? "flex-row-reverse" : ""
            }`}
          >
            {a % 2 === 0 ? (
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <Skeleton />
              </div>
            ) : null}
            <div className="w-[70%] h-5 rounded-lg overflow-hidden">
              <Skeleton />
            </div>
          </div>
        );
      })}
    </div>
  );
};
