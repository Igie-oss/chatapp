import { useAppStore } from "@/services/states/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserAvatar from "@/components/shared/UserAvatar";
import SignOutBtn from "@/components/shared/SignOutBtn";
import ImageUploader from "./AvatarImageUploadForm";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
export default function Profile() {
  const { userName, userId } = useAppStore((state) => state.user);
  return (
    <div className="flex">
      <Popover>
        <PopoverTrigger title="Profile">
          <div className="w-9 h-9">
            <UserAvatar id={userId} />
          </div>
        </PopoverTrigger>
        <PopoverContent className=" flex flex-col gap-4 mr-2 md:mr-12 lg:mr-16">
          <h1 className="text-sm font-semibold p-2 border rounded-sm bg-secondary/50 md:text-lg">
            Profile
          </h1>
          <div className="w-full flex gap-1 items-end">
            <div className="w-9 h-9">
              <UserAvatar id={userId} />
            </div>
            <h1 className="mb-1 ml-2 text-sm font-semibold opacity-75">
              {userName}
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="border-b pb-1">Settings</h1>
            <div className="flex flex-col gap-1 my-2">
              <Dialog>
                <DialogTrigger className="text-sm font-semibold text-start  hover:bg-secondary/50 rounded-sm p-2">
                  <p className="text-sm font-normal">Change User Name</p>
                </DialogTrigger>
                <DialogContent>
                  {/* <ImageUploader id={userId} /> */}
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger className="text-sm font-semibold text-start hover:bg-secondary/50 rounded-sm  p-2">
                  <p className="text-sm font-normal">Change Avatar</p>
                </DialogTrigger>
                <DialogContent>
                  <ImageUploader id={userId} />
                </DialogContent>
              </Dialog>

              <span className="w-full border-b border-border mt-10 mb-5" />
              <Dialog>
                <DialogTrigger className="text-sm font-semibold text-start text-destructive hover:bg-secondary/50 rounded-sm p-2">
                  <p className="text-sm font-normal">Delete Account</p>
                </DialogTrigger>
                <DialogContent>
                  {/* <ImageUploader id={userId} /> */}
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="w-full flex">
            <Dialog>
              <DialogTrigger className="text-xs font-semibold  w-full text-center bg-primary rounded-sm p-2">
                Sing Out
              </DialogTrigger>
              <DialogContent className="flex flex-col items-center gap-10 max-w-[22rem]">
                <h2>Are you sure you want yo sign out?</h2>
                <DialogFooter className="w-full flex items-center justify-between">
                  <DialogClose className="w-1/2 bg-secondary h-8 rounded-md text-xs">Cancel</DialogClose>
                  <SignOutBtn />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
