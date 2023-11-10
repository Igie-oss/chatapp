import { memo } from "react";
import UsersCard from "./UsersCard";
import Skeleton from "@/components/shared/Skeleton";
import useGetUsers from "@/hooks/useGetUsers";
import useFilterUsers from "@/hooks/useFilterUsers";
type Props = {
  searchText: string;
};

function UsersList({ searchText }: Props) {
  const { users, isLoading } = useGetUsers();
  const filteredUsers = useFilterUsers(users!, searchText);

  return (
    <ul className="w-full flex-1 flex flex-col gap-1 py-5 bg-background overflow-y-auto">
      {isLoading ? (
        <SkeletonUI />
      ) : filteredUsers.length ? (
        filteredUsers.map((user: TUser) => {
          return <UsersCard key={`${Math.random()}${user.id}`} user={user} />;
        })
      ) : (
        <p className="mt-4 font-semibold text-center text-xs opacity-75">
          No user found!
        </p>
      )}
    </ul>
  );
}

const SkeletonUI = () => {
  const arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push(i);
  }
  return arr.map((a) => {
    return (
      <>
        <li
          key={Math.random()}
          className="h-12 p-2 w-full rounded-md flex gap-1 pointer-events-none"
        >
          <div className="h-full w-[85%] flex items-end gap-1">
            <div className="h-full w-12 flex items-start">
              <div className="w-9 h-9 border rounded-full overflow-hidden">
                <Skeleton />
              </div>
            </div>
            <div className="w-32 h-3 mb-2 rounded-sm overflow-hidden">
              <Skeleton />
            </div>
          </div>
        </li>
      </>
    );
  });
};

export default memo(UsersList);
