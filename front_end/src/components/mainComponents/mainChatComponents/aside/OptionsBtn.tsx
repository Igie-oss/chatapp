import AvatarImageUploadForm from "@/components/shared/AvatarImageUploadForm";
import ChangeGroupNameForm from "@/components/shared/ChangeGroupNameForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
type Props = {
	channel: TChannel;
	setInView: Dispatch<SetStateAction<EInview>>;
};
export default function OptionsBtn({ channel, setInView }: Props) {
	return (
		<>
			{channel?.isGroup ? (
				<>
					<Dialog>
						<DialogTrigger
							type="button"
							className="w-full flex justify-start items-center px-2 h-10 hover:bg-secondary/50 rounded-sm">
							<p className="text-sm font-normal">Change Group Name</p>
						</DialogTrigger>
						<DialogContent>
							<ChangeGroupNameForm id={channel.channelId} />
						</DialogContent>
					</Dialog>

					<Dialog>
						<DialogTrigger
							type="button"
							className="w-full flex justify-start items-center px-2 h-10  hover:bg-secondary/50 rounded-sm">
							<p className="text-sm font-normal">Change Avatar</p>
						</DialogTrigger>
						<DialogContent>
							<AvatarImageUploadForm id={channel.channelId} />
						</DialogContent>
					</Dialog>

					<Dialog>
						<DialogTrigger
							type="button"
							onClick={() => setInView(EInview.IS_GROUP_MEMBER_LIST)}
							className="w-full flex justify-start items-center px-2 h-10  hover:bg-secondary/50 rounded-sm">
							<p className="text-sm font-normal">Members</p>
						</DialogTrigger>
						<DialogContent>
							{/* <AvatarImageUploadForm id={channel.channelId} /> */}
						</DialogContent>
					</Dialog>
					<span className="w-full border-b border-border mt-10 mb-5" />
					<Dialog>
						<DialogTrigger
							type="button"
							className="w-full flex  text-destructive  justify-start items-center px-2 h-10 hover:bg-secondary/50 rounded-sm">
							<p className="text-sm font-normal">Delete Group</p>
						</DialogTrigger>
						<DialogContent>
							{/* <AvatarImageUploadForm id={channel.channelId} /> */}
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger
							type="button"
							className="w-full flex text-destructive  justify-start items-center px-2 h-10 hover:bg-secondary/50 rounded-sm">
							<p className="text-sm font-normal">Leave Group</p>
						</DialogTrigger>
						<DialogContent>
							{/* <AvatarImageUploadForm id={channel.channelId} /> */}
						</DialogContent>
					</Dialog>
				</>
			) : null}
		</>
	);
}
