import { BsChatLeftDots, BsPerson } from "react-icons/bs";
import { ENavigation, TNavigation } from "./Aside";
import { Dispatch, SetStateAction } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";

type Props = {
  navigate: TNavigation;
  setNavigate: Dispatch<SetStateAction<TNavigation>>;
};
export default function Navigation({ navigate, setNavigate }: Props) {
  return (
    <nav className="w-[98%] h-14 flex items-end gap-1 border bg-secondary/50 rounded-md px-1">
      <button
        type="button"
        onClick={() => setNavigate({ isShow: ENavigation.IS_CHANNEL_LIST })}
        className={`flex flex-col items-center p-1 px-3 gap-1  hover:text-primary ${
          navigate.isShow === ENavigation.IS_CHANNEL_LIST ? "text-primary" : ""
        }`}
      >
        <BsChatLeftDots className="w-5 h-5" />
        <p className="text-[9px] font-semibold">Messages</p>
      </button>
      <button
        type="button"
        onClick={() => setNavigate({ isShow: ENavigation.IS_GROUP_LIST })}
        className={`flex flex-col items-center p-1 px-3 gap-1  hover:text-primary ${
          navigate.isShow === ENavigation.IS_GROUP_LIST ? "text-primary" : ""
        }`}
      >
        <HiOutlineUserGroup className="w-5 h-5" />
        <p className="text-[9px] font-semibold">Group Chat</p>
      </button>
      <button
        type="button"
        onClick={() => setNavigate({ isShow: ENavigation.IS_USER_LIST })}
        className={`flex flex-col items-center p-1 px-3  gap-1  hover:text-primary ${
          navigate.isShow === ENavigation.IS_USER_LIST ? "text-primary" : ""
        }`}
      >
        <BsPerson className="w-5 h-5" />
        <p className=" text-[9px] font-semibold">Users</p>
      </button>
    </nav>
  );
}
