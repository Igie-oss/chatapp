import { memo } from "react";
import ChannelCard from "./ChannelCard";
import Skeleton from "@/components/shared/Skeleton";
import useSearchChannel from "@/hooks/useSearchChannel";
import useGetUserChannels from "@/hooks/useGetUserChannels";
type Props = {
  searchText: string;
};
function ChannelList({ searchText }: Props) {
  const { channels, isLoading } = useGetUserChannels();
  const filteredChannels = useSearchChannel({
    channels,
    searchText,
  });
  return (
    <ul className="w-full flex-1 flex flex-col gap-1 overflow-y-auto">
      {isLoading ? (
        <SkeletonUI />
      ) : filteredChannels.length ? (
        filteredChannels.map((message: TChannelMessages) => {
          return (
            <ChannelCard
              key={`${Math.random()}${message.id}`}
              message={message}
            />
          );
        })
      ) : (
        <p className="mt-2 text-xs font-semiboold opacity-75 w-full text-center ">
          No channel found!
        </p>
      )}
    </ul>
  );
}

const SkeletonUI = () => {
  const count = [];
  for (let i = 0; i < 6; i++) {
    count.push(i);
  }

  return count.map((c) => {
    return (
      <div
        key={Math.random() + c}
        className="border border-secondary hover:bg-secondary p-2 w-full h-20 rounded-md flex gap-1 pointer-events-none"
      >
        <div className="h-full w-[85%] flex items-center">
          <div className="h-full w-12 flex items-start">
            <div className="w-11 h-11 border overflow-hidden rounded-full">
              <Skeleton />
            </div>
          </div>
          <div className="flex-1 h-full flex flex-col justify-end gap-1">
            <div className="w-32  h-3  overflow-hidden rounded-full">
              <Skeleton />
            </div>
            <div className="w-full  h-3  my-1 overflow-hidden rounded-full">
              <Skeleton />
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default memo(ChannelList);
