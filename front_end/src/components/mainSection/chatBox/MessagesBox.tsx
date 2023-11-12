import { useEffect, useRef} from "react";
import MessageCard from "./MessageCard";
import { BiMessageAltMinus } from "react-icons/bi";
import BtnsLoaderSpinner from "@/components/shared/loader/BtnLoader";
import { useParams } from "react-router-dom";
import useGetChannelMessages from "@/hooks/useGetChannelMessages";
// import { useInView } from "react-intersection-observer";
export default function MessagesBox() {
  const { channelId } = useParams();
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const { messages, isFetching } = useGetChannelMessages(channelId!);
  // const { ref, inView, entry } = useInView({
  //   /* Optional options */
  //   threshold: 0,
  // });

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
