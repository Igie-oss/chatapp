import { MdArrowBackIosNew } from "react-icons/md";
import UserAvatar from "@/components/shared/UserAvatar";
import { useAppStore } from "@/services/states/store";
import { useState } from "react";
import OptionsBtn from "./OptionsBtn";
import GroupChannelMemberList from "./GroupChannelMemberList";
type Props = {
  toggelAside: () => void;
  channel: TChannel;
};

export enum EInview {
  IS_OPTIONS = "is_options",
  IS_GROUP_MEMBER_LIST = "is_group_member_list",
}
export default function Aside({ channel, toggelAside }: Props) {
  const userId = useAppStore((state) => state.user.userId);
  const [inView, setInView] = useState<EInview>(EInview.IS_OPTIONS);
  return (
    <>
      <header className="w-[95%] h-40 py-4 flex flex-col items-center gap-2 relative justify-between border border-border bg-secondary/40 rounded-md">
        <button
          type="button"
          title="More"
          onClick={toggelAside}
          className="border p-2 rounded-full flex absolute top-2 left-2 xl:hidden "
        >
          <MdArrowBackIosNew className="w-6 h-6 pointer-events-none" />
        </button>
        <div className="h-20 w-20 rounded-full overflow-hidden">
          <UserAvatar
            id={
              channel?.isGroup
                ? channel?.channelId
                : channel?.members?.find((u) => u.userId !== userId)?.userId!
            }
          />
        </div>

        <h2 className="font-semibold text-base">
          {channel?.isGroup
            ? channel.groupName
            : channel?.members?.find((u) => u.userId !== userId)?.userName!}
        </h2>
      </header>
      <div className="w-[95%] flex-1 flex flex-col gap-4">
        <p className="pb-2 border-b text-sm font-semibold px-2 text-muted-foreground">
          Settings
        </p>
        <div className="w-full h-full flex flex-col items-start px-2 gap-1">
          {inView === EInview.IS_OPTIONS ? (
            <OptionsBtn channel={channel} setInView={setInView} />
          ) : inView === EInview.IS_GROUP_MEMBER_LIST ? (
            <GroupChannelMemberList
              members={channel?.members}
              setInView={setInView}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
