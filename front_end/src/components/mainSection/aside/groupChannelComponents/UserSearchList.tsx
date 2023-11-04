import useGetUsers from "@/hooks/useGetUsers";
import UserAvatar from "@/components/shared/UserAvatar";
import { useAppStore } from "@/features/store";
import Skeleton from "@/components/shared/Skeleton";
import { useEffect, useState } from "react";

type Props = {
  groupMembers: TMembers[];
  handleAddUser: (member: TMembers) => void;
};

export default function UserSearchList({ groupMembers, handleAddUser }: Props) {
  const { users, isLoading } = useGetUsers();
  const [initalUsers, setInitialUsers] = useState<TUser[]>([]);
  const userId = useAppStore((state) => state.user.userId);

  
  useEffect(() => {
    if (users?.length) {
      setInitialUsers(
        users.filter(
          (user) => !groupMembers.some((gm) => user.userId === gm.userId)
        )
      );
    }
  }, [users]);

  const handleAdd = (userId: string, userName: string) => {
    setInitialUsers(initalUsers.filter((user) => user.userId !== userId));
    const userAsMember = {
      userId,
      userName,
      isAdmin: false,
    };
    handleAddUser(userAsMember);
  };
  return (
    <ul className="w-full h-72 flex flex-col gap-1 p-2 border absolute left-0 z-10 top-full overflow-y-auto rounded-md bg-background">
      {isLoading ? (
        <LoaderSkeleton />
      ) : initalUsers?.length ? (
        initalUsers.map((user) => {
          if (user.userId === userId) return;
          return (
            <li
              key={user.id}
              className="w-full h-12 flex items-center justify-between px-2 pr-4 border overflow-y-auto border-border rounded-md"
            >
              <div className="h-full flex items-center gap-4">
                <div className="w-8 h-8">
                  <UserAvatar id={user.userId} />
                </div>
                <p className="text-sm font-semibold">
                  {userId === user.userId ? "You" : user.userName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleAdd(user.userId, user.userName)}
                className="text-sm text-primary font-semibold hover:text-destructive"
              >
                Add
              </button>
            </li>
          );
        })
      ) : null}
    </ul>
  );
}

function LoaderSkeleton() {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(i);
  }
  return (
    <>
      {arr.map((a) => {
        return (
          <li
            key={a}
            className="w-full h-12 flex items-center bg-background justify-between px-2 pr-4 border overflow-y-auto border-border rounded-md"
          >
            <div className="h-full w-[80%] flex items-center gap-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Skeleton />
              </div>
              <div className="h-6 w-[80%]">
                <Skeleton />
              </div>
            </div>

            <div className="flex-1 h-5">
              <Skeleton />
            </div>
          </li>
        );
      })}
    </>
  );
}
