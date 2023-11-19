import { Dispatch, SetStateAction } from "react";
import { EInview } from "./Aside";
import UserAvatar from "@/components/shared/UserAvatar";
import { IoIosArrowBack } from "react-icons/io";
type Props = {
  setInView: Dispatch<SetStateAction<EInview>>;
  members: TMembers[];
};
export default function GroupChannelMemberList({ members, setInView }: Props) {
  return (
    <>
      <button
        type="button"
        title="Close"
        onClick={() => setInView(EInview.IS_OPTIONS)}
        className="border rounded-full p-2 mb-2"
      >
        <IoIosArrowBack className="w-6 h-6" />
      </button>
      <ul className="w-full h-full flex flex-col gap-1 overflow-y-auto">
        {members.map((user) => {
          return (
            <li
              key={user.userId}
              className="w-full h-12 flex items-center px-2 gap-2 border rounded-sm"
            >
              <div className="w-8 h-8 rounded-full">
                <UserAvatar id={user.userId} />
              </div>
              <div className="flex-1 flex justify-between items-center px-2 ">
                <p className="text-sm font-semibold">{user.userName}</p>
                {user.isAdmin ? (
                  <p className="text-xs font-semibold opacity-60">Admin</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
