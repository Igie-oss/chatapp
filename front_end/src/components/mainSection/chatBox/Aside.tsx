import { MdArrowBackIosNew } from "react-icons/md";
import UserAvatar from "@/components/shared/UserAvatar";
import useGetChannelInfo from "@/hooks/useGetChannelInfo";
import { useParams } from "react-router-dom";
import { useAppStore } from "@/features/store";
import Skeleton from "@/components/shared/Skeleton";
type Props = {
  toggelAside: () => void;
};
export default function Aside({ toggelAside }: Props) {
  const { channelId } = useParams();
  const userId = useAppStore((state) => state.user.userId);
  const { channel, isLoading } = useGetChannelInfo(channelId!);

  return (
    <>
      <header className="w-full flex justify-between items-center h-20 px-4 ">
        <button
          type="button"
          title="More"
          onClick={toggelAside}
          className="border p-2 rounded-full flex bg-background/50 xl:hidden"
        >
          <MdArrowBackIosNew className="w-6 h-6 pointer-events-none" />
        </button>
      </header>
      <div className="w-[95%] h-40 py-4 flex flex-col items-center justify-between border border-border bg-secondary/40 rounded-md">
        <div className="h-24 w-24 rounded-full overflow-hidden">
          {isLoading ? (
            <Skeleton />
          ) : (
            <UserAvatar
              id={
                channel?.isGroup
                  ? channel.channelId
                  : channel?.members?.find((u) => u.userId !== userId)?.userId!
              }
            />
          )}
        </div>
        {isLoading ? (
          <div className="w-24 h-3 rounded-lg overflow-hidden">
            <Skeleton />
          </div>
        ) : (
          <h2 className="font-semibold text-base">
            {channel?.isGroup
              ? channel.channelName
              : channel?.members?.find((u) => u.userId !== userId)?.userName!}
          </h2>
        )}
      </div>
    </>
  );
}
