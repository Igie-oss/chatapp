import { useAppStore } from "@/features/store";
import useGetUserGroupChannel from "@/hooks/useGetUserGroupChannel";
import Skeleton from "@/components/shared/Skeleton";
import GroupCard from "./GroupCard";
export default function GroupChannelList() {
  const { userId } = useAppStore((state) => state.user);
  const { groupChannels, isLoading } = useGetUserGroupChannel(userId);
  return (
    <ul className="w-full flex-1 flex flex-col gap-1 py-5 overflow-y-auto">
      {isLoading ? (
        <LoaderSkeletons />
      ) : groupChannels?.length ? (
        groupChannels?.map((channel) => {
          return <GroupCard key={channel.channelId} channel={channel} />;
        })
      ) : null}
    </ul>
  );
}

function LoaderSkeletons() {
  const arr = [];

  for (let i = 0; i < 6; i++) {
    arr.push(i);
  }
  return (
    <>
      {arr.map((a) => {
        return (
          <li
            key={a}
            className="w-full h-12 flex gap-4 items-center border rounded-md px-2"
          >
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <Skeleton />
            </div>
            <div className="h-3 w-20">
              <Skeleton />
            </div>
          </li>
        );
      })}
    </>
  );
}
