import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
type Props = {
  user: {
    userId: string;
    userName: string;
  };
};
export default function CreateGroup({ user }: Props) {
  const [groupMembers, setGroupMembers] = useState<TMembers[]>([{ ...user }]);

  const handleRemoveUser = (userId: string) => {
    setGroupMembers((prev) => prev.filter((user) => user.userId !== userId));
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={(e) => handelSubmit(e)}
      className="w-full flex flex-col gap-4 items-center"
    >
      <h2 className="text-lg font-semibold py-2 px-4 border border-border rounded-md bg-secondary/50">
        Create Group
      </h2>
      <div className="w-full flex flex-col items-center gap-5">
        <div className="w-full h-16 flex items-center">
          <input
            type="search"
            placeholder="Search user..."
            className="h-10 w-[80%] px-4 text-sm border rounded-md outline-none focus:bg-secondary/50 bg-transparent"
          />
        </div>
        <div className="w-full flex flex-col rounded-md gap-3 p-2">
          <h2 className="font-semibold text-sm">Group Members</h2>
          <ul className="w-full h-60 flex flex-col gap-2 overflow-y-auto">
            {groupMembers.map((u, i) => {
              return (
                <li
                  key={i}
                  className="w-full h-10 flex items-center justify-between px-4 border border-border rounded-md"
                >
                  <p className="text-sm font-semibold">{u.userName}</p>
                  <button
                    type="button"
                    onClick={() => handleRemoveUser(u.userId)}
                    className="text-sm text-primary hover:text-destructive"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="w-full flex gap-4">
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
