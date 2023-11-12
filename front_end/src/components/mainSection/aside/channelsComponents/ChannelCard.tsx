import { useNavigate, useParams } from "react-router-dom";
import { useAppStore } from "@/features/store";
import { memo } from "react";
import UserAvatar from "@/components/shared/UserAvatar";
import DisplayDate from "@/components/shared/DisplayDate";
import { BsThreeDotsVertical, BsTrash3 } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateGroupForm from "../groupChannelComponents/crateGroupComponents/CreateGroupForm";

type Props = {
  message: TChannelMessages;
};

function ChannelCard({ message }: Props) {
  const userId = useAppStore((state) => state.user.userId);
  const seTMembers = useAppStore((state) => state.seTMembers);
  const { channelId } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chat/c/${message.channelId}`);
    seTMembers(message.members);
  };
  return (
    <li
      style={{
        backgroundColor: `${
          channelId === message?.channelId
            ? "hsl(var(--secondary))"
            : ""
        }`,
      }}
      className="group p-2 w-full h-fit hover:shadow-md bg-transparent rounded-lg flex justify-between gap-1 cursor-pointer"
    >
      <div
        onClick={handleClick}
        className="h-full w-[90%] flex items-start gap-3"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <UserAvatar
            id={
              message?.isGroup
                ? message?.channelId
                : message?.members?.find((u) => u.userId !== userId)?.userId!
            }
          />
        </div>
        <div className="flex-1 h-full flex flex-col justify-end gap-1">
          <h1 className="font-semibold text-sm pointer-events-none">
            {message?.isGroup
              ? message?.groupName
              : message?.members?.find((u) => u.userId !== userId)?.userName!}
          </h1>

          <div className="w-full flex items-end gap-2">
            {/* //!Make check base on contenttyope for defferent ui of content */}
            {message.content ? (
              <h5 className="text-xs font-medium opacity-70 pointer-events-none">
                {message?.senderId === userId ? "You: " : ""}
                {message?.content.slice(0, 10)}
              </h5>
            ) : (
              <span className="h-4" />
            )}
            {message?.sendAt ? (
              <p className="text-[10px]   opacity-50 pointer-events-none">
                <DisplayDate date={message.sendAt} />
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="h-full flex-1 flex  justify-center ">
        <Popover>
          <PopoverTrigger
            title="More"
            className="p-3 rounded-full border shadow-md transition-all motion-safe:hover:scale-105 opacity-0 group-hover:opacity-100"
          >
            <BsThreeDotsVertical className="w-5 h-5" />
          </PopoverTrigger>
          <PopoverContent className="px-1 flex flex-col gap-2 absolute -right-5">
            <Dialog>
              {message?.isGroup ? null : (
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="w-full h-10 flex items-center gap-4 text-start px-2 rounded-md hover:bg-secondary/50 text-sm"
                  >
                    <HiOutlineUserGroup className="w-5 h-5" />
                    <p>Create group</p>
                  </button>
                </DialogTrigger>
              )}
              <DialogContent>
                <CreateGroupForm
                  user={message?.members?.find((u) => u.userId !== userId)!}
                />
              </DialogContent>
            </Dialog>
            <button
              type="button"
              className="w-full h-10 flex items-center gap-4 text-start px-2 rounded-md hover:bg-secondary/50 text-sm"
            >
              <BsTrash3 className="w-5 h-5" /> <p>Delete</p>
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </li>
  );
}

export default memo(ChannelCard);
