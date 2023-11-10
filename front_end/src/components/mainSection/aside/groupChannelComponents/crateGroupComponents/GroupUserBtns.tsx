import { useMemo } from "react";

type Props = {
  user: { userId: string; userName: string };
  groupMembers: TMembers[];
  handleAddUser: (member: TMembers) => void;
  handleRemoveUser: (userId: string) => void;
};
export default function GroupUserBtns({
  user,
  groupMembers,
  handleAddUser,
  handleRemoveUser,
}: Props) {
  const isMember = useMemo((): TMembers[] => {
    return groupMembers?.filter(
      (member: TMembers) => member.userId === user.userId
    );
  }, [groupMembers]);

  return (
    <>
      {isMember?.[0]?.userId !== user?.userId ? (
        <button
          type="button"
          onClick={() =>
            handleAddUser({
              userId: user.userId,
              userName: user.userName,
              isAdmin: false,
            })
          }
          className="text-sm text-primary border rounded-md w-20 h-8 font-semibold"
        >
          Add
        </button>
      ) : (
        <button
          type="button"
          onClick={() => handleRemoveUser(user.userId)}
          className="text-sm text-destructive border rounded-md w-20 h-8 font-semibold  border-destructive"
        >
          Remove
        </button>
      )}
    </>
  );
}
