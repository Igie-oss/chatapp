import { useAppStore } from "@/features/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserAvatar from "@/components/shared/UserAvatar";
import SignOutBtn from "@/components/shared/SignOutBtn";
export default function Profile() {
  const { userName, userId } = useAppStore((state) => state.user);
  return (
    <div className="flex">
      <Popover>
        <PopoverTrigger title="Profile">
          <div className="w-9 h-9">
            <UserAvatar userId={userId} />
          </div>
        </PopoverTrigger>
        <PopoverContent className=" flex flex-col gap-4 mr-2 md:mr-12 lg:mr-16">
          <h1 className="text-sm font-semibold p-2 border rounded-sm bg-secondary md:text-lg">
            Profile
          </h1>
          <div className="w-full flex gap-1 items-end">
            <div className="w-9 h-9">
              <UserAvatar userId={userId} />
            </div>
            <h1 className="mb-1 ml-2 text-sm font-semibold opacity-75">
              {userName}
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="border-b pb-1">Settings</h1>
            <div className="flex flex-col gap-2 my-2">
              <button className="text-sm font-semibold text-start border hover:bg-secondary rounded-sm p-2">
                <p>Change Avatar</p>
              </button>
            </div>
          </div>
          <div className="w-full flex mt-10">
            <SignOutBtn />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
