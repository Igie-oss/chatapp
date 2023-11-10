import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useAppStore } from "@/features/store";
import { EStatus } from "@/components/registerSection/RegisterForm";
import BtnLoader from "@/components/shared/loader/BtnLoader";
import { customAxios } from "@/lib/helper";
import { DateTime } from "luxon";
import { socket } from "@/socket";
import UsersList from "./UsersListContainer";
type Props = {
  user: TMembers;
};
export default function CreateGroup({ user }: Props) {
  const { userId, userName } = useAppStore((state) => state.user);
  const [groupName, setGroupName] = useState("");
  const [status, setStatus] = useState<TFetching | null>(null);
  const [groupMembers, setGroupMembers] = useState<TMembers[]>([
    { ...user, isAdmin: false },
    { userId, userName, isAdmin: true },
  ]);

  const handleRemoveUser = (userId: string) => {
    setGroupMembers((prev) => prev.filter((user) => user.userId !== userId));
  };

  const handleAddUser = (member: TMembers) => {
    setGroupMembers((prev) => [...prev, member]);
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (groupMembers.length < 1 || !groupName) return;

    setStatus({ status: EStatus.IS_LOADING });

    const group = {
      groupName: groupName,
      members: groupMembers,
    };
    const dateNow: Date = DateTime.now().setZone("Asia/Manila").toJSDate();
    customAxios("channel/creatgroup", { method: "POST", data: group })
      .then((res) => {
        if (res?.data && res.status === 201) {
          const resData = res.data;
          const emitNewGroup = {
            channelId: resData.channelId,
            groupName: resData.groupName,
            isGroup: resData.isGroup,
            members: resData.members,
            content: "",
            contentType: "text",
            senderId: userId,
            sendAt: dateNow,
          };
          socket.emit("client_new_group_channel", emitNewGroup);
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          status: EStatus.IS_ERROR,
          message: "Failed to create group chat!",
        });
      })
      .finally(() => {
        setStatus({
          status: EStatus.IS_SUCCESS,
          message: "Group chat created!",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  return (
    <form
      onSubmit={(e) => handelSubmit(e)}
      className="w-full flex flex-col gap-2 items-center relative"
    >
      {status?.message ? (
        <div
          className={`w-full py-2 text-center absolute overflow-hidden -top-5 left-0 z-10 border-2 transition-all  rounded-md text-lg font-semibold ${
            status?.status === EStatus.IS_SUCCESS ||
            status?.status === EStatus.IS_ERROR
              ? "py-5 border-green-400/60 bg-green-400/50"
              : "py-5 border-red-400/60 bg-red-400/50"
          } before:absolute before:content:[""] before:w-full before:z-0 before:h-full before:top-0 before:left-0 before:bg-secondary`}
        >
          <p className="relative">{status?.message}</p>
        </div>
      ) : null}
      <h2 className="text-lg font-semibold py-2 px-4 border border-border rounded-md bg-secondary/50">
        Create Group
      </h2>

      <div className="w-full h-10">
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName || ""}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-[80%] h-full text-sm  px-2 border-b bg-transparent  outline-none"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-5">
        <div className="w-full flex flex-col rounded-md gap-3 p-2">
          <h2 className="font-semibold text-sm">Group Members</h2>

          <UsersList
            handleAddUser={handleAddUser}
            groupMembers={groupMembers}
            handleRemoveUser={handleRemoveUser}
          />
        </div>
      </div>

      <div className="w-full flex gap-4 mt-5">
        <DialogTrigger
          title="Cancel"
          type="button"
          disabled={status?.status === EStatus.IS_LOADING || !!status?.message}
          className="bg-secondary w-40 rounded-md"
        >
          Cancel
        </DialogTrigger>

        <Button
          disabled={
            status?.status === EStatus.IS_LOADING ||
            !groupName ||
            !groupMembers.length ||
            !!status?.message
          }
          type="submit"
          className="w-40 relative"
        >
          {status?.status === EStatus.IS_LOADING ? (
            <BtnLoader />
          ) : (
            "Create group"
          )}
        </Button>
      </div>
    </form>
  );
}
