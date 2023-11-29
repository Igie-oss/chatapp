import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import InputField from "./InputField";
import MessagesBox from "./MessagesBox";
import LoaderSpinner from "@/components/shared/loader/LoadingSpinner";
import useGenerateChannel from "@/hooks/useGenerateChannel";
import Aside from "./aside/Aside";
import { useAppStore } from "@/services/states/store";
import useGetChannelIdSearchParams from "@/hooks/useGetChannelIdSearchParams";
export default function ChatboxContainer() {
  const channelId = useGetChannelIdSearchParams();
  const { channel, isFetching } = useGenerateChannel(channelId as string);
  const user = useAppStore((state) => state.user);
  const asideRef = useRef<HTMLElement | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const toggelAside = () => {
    if (asideRef?.current?.classList.contains("translate-x-full")) {
      asideRef.current.classList.remove("translate-x-full");
    } else {
      asideRef?.current?.classList.add("translate-x-full");
    }
  };

  useEffect(() => {
    const filtered = channel?.members?.filter(
      (cuser) => cuser?.userId === user?.userId
    );
    if (filtered.length) {
      setIsAllowed(true);
    }
  }, [channel.members]);

  return (
    <main className="w-full h-full flex p-2 gap-2 relative">
      {isFetching ? (
        <LoaderSpinner />
      ) : channel?.channelId && isAllowed && channelId ? (
        <>
          <div className="h-full w-full items-center px-1 flex flex-col gap-2 xl:w-[60%] 2xl:w-[70%] 2xl:max-w-[65rem]">
            <Header channel={channel} toggelAside={toggelAside} />
            <MessagesBox />
            <InputField channel={channel} />
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
