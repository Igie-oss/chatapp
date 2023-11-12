import { useState } from "react";
import { DialogTrigger,DialogFooter } from "@/components/ui/dialog";
import BtnsLoaderSpinner from "./loader/BtnLoader";
import { Button } from "../ui/button";
import { EStatus } from "../registerSection/RegisterForm";
import { customAxios } from "@/lib/helper";

type Props = {
  id: string;
};
export default function ChangeGroupNameForm({ id }: Props) {
  const [groupName, setGroupName] = useState("");
  const [status, setStatus] = useState<TFormStatus | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !groupName) return;
    setStatus({ status: EStatus.IS_LOADING });
    customAxios
      .patch("channel/updategroupname", {
        channelId: id,
        newGroupName: groupName,
      })
      .then((res) => {
        if (res?.status === 202) {
          setStatus({
            status: EStatus.IS_SUCCESS,
            message: "Successfully change group name!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          status: EStatus.IS_ERROR,
          message: "Failed to change group name!.",
        });
      })
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      <h1 className="text-lg px-4 py-2 bg-secondary/50 border rounded-md">
        Change Group Name
      </h1>
      {status?.status === EStatus.IS_ERROR ? (
        <p className="text-sm text-destructive px-3 py-2 border bg-secondary/50 border-destructive">{status.message}</p>
      ) : null}
      {status?.status === EStatus.IS_SUCCESS ? (
        <p className="text-sm  px-3 py-2 border bg-secondary/50 border-border">{status.message}</p>
      ) : null}
      <div className="w-[20rem] flex mt-5">
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName || ""}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full h-10 border rounded-sm  bg-transparent outline-none px-2 text-xs"
        />
      </div>
      <DialogFooter className="mt-5">
        <DialogTrigger
          title="Cancel"
          type="button"
          disabled={status?.status === EStatus.IS_LOADING}
          className="bg-secondary h-full w-40 rounded-md"
        >
          Cancel
        </DialogTrigger>
        <Button
          type="submit"
          disabled={status?.status === EStatus.IS_LOADING || !groupName || !id}
          className="w-40 relative"
        >
          {status?.status === EStatus.IS_LOADING ? (
            <BtnsLoaderSpinner />
          ) : (
            "Save"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
