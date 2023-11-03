import { Link, useParams } from "react-router-dom";
import { socket } from "@/socket";
import { useEffect } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserAvatar from "@/components/shared/UserAvatar";
import useGetChannelInfo from "@/hooks/useGetChannelInfo";
import { useAppStore } from "@/features/store";
import Skeleton from "@/components/shared/Skeleton";
type Props = {
  toggelAside: () => void;
};
export default function Header({ toggelAside }: Props) {
  const { channelId } = useParams();
  const userId = useAppStore((state) => state.user.userId);
  const { channel, isLoading } = useGetChannelInfo(channelId!);
  useEffect(() => {
    if (!channelId) return;
    socket.emit("join-channel", channelId);
    return () => {
      socket.off("join-channel");
    };
  }, [channelId]);

  return (
    <header className="w-full flex-1 bg-secondary/40 flex items-center rounded-md justify-between shadow-sm  px-2 lg:px-4 ">
      {channelId ? (
        <>
          <div className="flex gap-4 items-center">
            <Link
              title="Close"
              to="/chat/c/"
              className="lg:hidden border p-2 rounded-full flex hover:bg-secondary"
            >
              <MdArrowBackIosNew className="w-6 h-6 pointer-events-none" />
            </Link>
            <div className="flex items-end gap-2">
              <div className="w-9 h-9 rounded-full overflow-hidden">
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <UserAvatar
                    id={
                      channel?.isGroup
                        ? channel.channelId
                        : channel?.members?.find((u) => u.userId !== userId)
                            ?.userId!
                    }
                  />
                )}
              </div>
              {isLoading ? (
                <div className="h-3 w-16 rounded-lg overflow-hidden"></div>
              ) : (
                <h1 className="mb-1 ml-2 text-sm font-semibold">
                  {channel?.isGroup
                    ? channel.channelName
                    : channel?.members?.find((u) => u.userId !== userId)
                        ?.userName!}
                </h1>
              )}
            </div>
          </div>
        </>
      ) : null}
      <div className="flex items-end gap-5 px-4">
        <button
          type="button"
          title="More"
          onClick={toggelAside}
          className="border p-2 rounded-full flex hover:bg-secondary xl:hidden"
        >
          <BsThreeDotsVertical className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
