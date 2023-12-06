import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateGroupForm from "../mainComponents/groupComponents/createGroup/CreateGroupForm";
export default function CreateGroupBtn() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="text-xs" size="sm">
					Create Group
				</Button>
			</DialogTrigger>
			<DialogContent>
				<CreateGroupForm user={null} />
			</DialogContent>
		</Dialog>
	);
}
