import { useNavigate } from "react-router-dom";
import UserAvatar from "@/components/shared/UserAvatar";
import { useAppStore } from "@/features/store";
import { customAxios } from "@/lib/helper";
import uuid from "react-uuid";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import CreateGroup from "../groupChatComponents/CreateGroup";
type Props = {
  user: TUser;
};

export default function UsersCard({ user }: Props) {
  const navigate = useNavigate();
  const currentUser = useAppStore((state) => state.user);
  const seTMembers = useAppStore((state) => state.seTMembers);
  const members = useAppStore((state) => state.members);
  const handleClick = async () => {
    (async () => {
      const members = [
        {
          userId: currentUser.userId,
          userName: currentUser.userName,
        },
        {
          userId: user.userId,
          userName: user.userName,
        },
      ];
      customAxios("channel/getchannelbymembers", {
        method: "POST",
        data: members,
      })
        .then((res) => {
          if (res?.data) {
            const resData = res.data;
            navigate(`/chat/${resData.channelId}`);
          } else {
            navigate(`/chat/${uuid()}`);
          }
          seTMembers(members);
        })
        .catch((err) => {
          if (err) {
            navigate(`/chat/${uuid()}`);
            seTMembers(members);
          }
        });
    })();
  };

  return (
    <li
      className={`cursor-pointer hover:bg-secondary p-2 group w-full border border-border rounded-md flex items-center ${
        members.find(({ userId }) => userId === user.userId)
          ? "bg-secondary"
          : ""
      }`}
    >
      <div
        onClick={handleClick}
        className="h-full w-[85%] flex items-center gap-4"
      >
        <div className="w-8 h-8 flex items-start">
          <UserAvatar id={user.userId} />
        </div>

        <h1 className="font-semibold text-xs pointer-events-none">
          {user.userName}
        </h1>
      </div>
      <div className="flex-1 h-full ">
        <Popover>
          <PopoverTrigger
            title="More"
            className="p-3 rounded-full border shadow-md transition-all motion-safe:hover:scale-105 opacity-0 group-hover:opacity-100"
          >
            <BsThreeDotsVertical className="w-5 h-5" />
          </PopoverTrigger>
          <PopoverContent className="px-1 flex flex-col gap-2 absolute -right-5">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-full h-10 flex items-center gap-4 text-start px-2 rounded-md hover:bg-secondary/50 text-sm"
                >
                  <HiOutlineUserGroup className="w-5 h-5" /> <p>Create group</p>
                </button>
              </DialogTrigger>
              <DialogContent>
                <CreateGroup user={user} />
              </DialogContent>
            </Dialog>
          </PopoverContent>
        </Popover>
      </div>
    </li>
  );
}
