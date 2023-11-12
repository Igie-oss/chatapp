import { useRef } from "react";
import Header from "./Header";
import InputField from "./InputField";
import MessagesBox from "./MessagesBox";
import LoaderSpinner from "@/components/shared/loader/LoadingSpinner";
import useGenerateChannel from "@/hooks/useGenerateChannel";
import Aside from "./asideComponents/Aside";
import useIsAllowed from "@/hooks/useIsAllowed";
import { useParams } from "react-router-dom";
export default function ChatboxContainer() {
  const { channelId } = useParams();
  const { channel, isFetching } = useGenerateChannel(channelId!);
  const isAllowed = useIsAllowed(channel.members);

  const asideRef = useRef<HTMLElement | null>(null);

  const toggelAside = () => {
    if (asideRef?.current?.classList.contains("translate-x-full")) {
      asideRef.current.classList.remove("translate-x-full");
    } else {
      asideRef?.current?.classList.add("translate-x-full");
    }
  };
  return (
    <main className="w-full h-full flex p-2 gap-2 relative border border-border rounded-sm">
      {isFetching ? (
        <LoaderSpinner />
      ) : channel?.channelId && isAllowed ? (
        <>
          <div className="h-full w-full items-center px-1 flex flex-col gap-2 xl:w-[60%] 2xl:w-[70%] 2xl:max-w-[65rem]">
            <Header channel={channel} toggelAside={toggelAside} />
            <MessagesBox />
            <InputField channel={channel}/>
          </div>
          <aside
            ref={asideRef}
            className="h-full  w-full absolute top-0 left-0 flex flex-col gap-5 items-center p-2  bg-background translate-x-full transition-all  xl:static xl:flex-1 xl:translate-x-0"
          >
            <Aside channel={channel} toggelAside={toggelAside} />
          </aside>
        </>
      ) : null}
    </main>
  );
}
