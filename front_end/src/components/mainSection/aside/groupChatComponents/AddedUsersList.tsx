import { useAppStore } from "@/features/store";
import UserAvatar from "@/components/shared/UserAvatar";
type Props = {
  groupMembers: TMembers[];
  handleRemoveUser: (userId: string) => void;
};
export default function AddedUsersList({
  groupMembers,
  handleRemoveUser,
}: Props) {
  const userId = useAppStore((state) => state.user.userId);
  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="w-full flex flex-col rounded-md gap-3 p-2">
        <h2 className="font-semibold text-sm">Group Members</h2>
        <ul className="w-full h-60 flex flex-col gap-1 overflow-y-auto border rounded-md p-2">
          {groupMembers.map((u, i) => {
            return (
              <li
                key={i}
                className="w-full h-12 flex items-center bg-secondary justify-between px-2 pr-4 border overflow-y-auto border-border rounded-md"
              >
                <div className="h-full flex items-center gap-4">
                  <div className="w-8 h-8">
                    <UserAvatar id={u.userId} />
                  </div>
                  <p className="text-sm font-semibold">
                    {userId === u.userId ? "You" : u.userName}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveUser(u.userId)}
                  className="text-sm text-primary font-semibold hover:text-destructive"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
