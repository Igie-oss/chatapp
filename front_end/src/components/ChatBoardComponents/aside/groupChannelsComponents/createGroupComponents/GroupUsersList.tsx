import UserAvatar from "@/components/shared/UserAvatar";
import GroupUserBtns from "./GroupUserBtns";
import { useAppStore } from "@/services/states/store";
import Skeleton from "@/components/shared/Skeleton";
type Props = {
  isLoading: boolean;
  users: TUser[];
  groupMembers: TMembers[];
  handleAddUser: (member: TMembers) => void;
  handleRemoveUser: (userId: string) => void;
};
export default function GroupUsersList({
  isLoading,
  users,
  groupMembers,
  handleAddUser,
  handleRemoveUser,
}: Props) {
  const { userId, userName } = useAppStore((state) => state.user);
  return (
    <div className="h-60 overflow-y-auto">
      <ul className="w-full h-fit  flex flex-col gap-1">
        {isLoading ? (
          <LoaderUI />
        ) : (
          [...users, { userId: userId, userName: userName }].map(
            (u: { userId: string; userName: string }, i: number) => {
              return (
                <li
                  key={i}
                  className="w-full h-14 flex items-center justify-between px-2 pr-4 border border-border rounded-md"
                >
                  <div className="h-full flex items-center gap-4">
                    <div className="w-8 h-8">
                      <UserAvatar id={u.userId} />
                    </div>
                    <p className="text-sm font-semibold">
                      {userId === u.userId ? "You" : u.userName}
                    </p>
                  </div>

                  {userId === u.userId ? null : (
                    <GroupUserBtns
                      user={u}
                      groupMembers={groupMembers}
                      handleAddUser={handleAddUser}
                      handleRemoveUser={handleRemoveUser}
                    />
                  )}
                </li>
              );
            }
          )
        )}
      </ul>
    </div>
  );
}

const LoaderUI = () => {
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
            className="w-full h-14 flex items-center justify-between px-2 pr-4 border border-border rounded-md"
          >
            <div className="w-[75%] h-full flex items-center gap-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Skeleton />
              </div>
              <div className="h-4 w-20 rounded-lg overflow-hidden">
                <Skeleton />
              </div>
            </div>

            <div className="w-9 h-9 rounded-full overflow-hidden">
              <Skeleton />
            </div>
          </li>
        );
      })}
    </>
  );
};
