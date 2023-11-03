import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import Header from "./Header";
import AddedUsersList from "./AddedUsersList";
import { useAppStore } from "@/features/store";

type Props = {
  user: {
    userId: string;
    userName: string;
  };
};
export default function CreateGroup({ user }: Props) {
  const { userId, userName } = useAppStore((state) => state.user);
  const [groupMembers, setGroupMembers] = useState<TMembers[]>([
    { ...user },
    { userId, userName },
  ]);

  const handleRemoveUser = (userId: string) => {
    setGroupMembers((prev) => prev.filter((user) => user.userId !== userId));
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={(e) => handelSubmit(e)}
      className="w-full flex flex-col gap-2 items-center"
    >
      <Header />
      <AddedUsersList
        groupMembers={groupMembers}
        handleRemoveUser={handleRemoveUser}
      />
      <div className="w-full flex gap-4 mt-5">
        <DialogTrigger>
          <Button variant="secondary" type="button" className="w-40">
            Cancel
          </Button>
        </DialogTrigger>

        <Button type="submit" className="w-40">
          Save
        </Button>
      </div>
    </form>
  );
}
