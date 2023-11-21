import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateGroupForm from "../ChatBoardComponents/aside/groupChannelsComponents/createGroupComponents/CreateGroupForm";
export default function CreateGroupBtn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Group</Button>
      </DialogTrigger>
      <DialogContent>
        <CreateGroupForm user={null} />
      </DialogContent>
    </Dialog>
  );
}