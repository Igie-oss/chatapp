import { useEffect, useRef, useState } from "react";
import MessageCard from "./MessageCard";
import { BiMessageAltMinus } from "react-icons/bi";
import BtnsLoaderSpinner from "@/components/shared/loader/BtnLoader";
import { useParams } from "react-router-dom";
import useGetChannelMessages from "@/hooks/useGetChannelMessages";
import { useInView } from "react-intersection-observer";
export default function MessagesBox() {
  const { channelId } = useParams();
  const [cursor, setCursor] = useState("");
  const scrollRef = useRef<HTMLUListElement | null>(null);

  const { messages, isFetching } = useGetChannelMessages(
    channelId!,
    cursor
  );

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    setCursor(messages[0]?.messageId);
    if (messages?.length) {
      scrollRef?.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, isFetching]);
   
  //*TODO: Make it a scroll pagination
  //*TODO: use react window for rendering large amout of data
  // useEffect(() => {
  
  // }, [inView, cursor]);

  return (
    <ul
      ref={scrollRef}
      className="w-full h-[82%] overflow-y-auto overflow-x-auto p-2 py-10 flex flex-col items-center gap-2 relative"
    >
      {/* {isFetchingNextPage ? <MessageLoader /> : null} */}
      <span ref={ref} />
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
  return (
    <div className="w-full flex justify-center">
      <BtnsLoaderSpinner />
    </div>
  );
};
