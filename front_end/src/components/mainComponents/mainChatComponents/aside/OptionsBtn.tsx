import AvatarImageUploadForm from "@/components/shared/AvatarImageUploadForm";
import ChangeGroupNameForm from "@/components/shared/ChangeGroupNameForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { EInview } from "@/enum";
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
							className="w-full flex text-xs justify-start items-center px-2 h-10 hover:bg-secondary/50 rounded-sm">
							<p>Change Group Name</p>
						</DialogTrigger>
						<DialogContent>
							<ChangeGroupNameForm id={channel.channelId} />
						</DialogContent>
					</Dialog>

					<Dialog>
						<DialogTrigger
							type="button"
							className="w-full flex text-xs justify-start items-center px-2 h-10  hover:bg-secondary/50 rounded-sm">
							<p>Change Avatar</p>
						</DialogTrigger>
						<DialogContent>
							<AvatarImageUploadForm id={channel.channelId} />
						</DialogContent>
					</Dialog>

					<Dialog>
						<DialogTrigger
							type="button"
							onClick={() => setInView(EInview.IS_GROUP_MEMBER_LIST)}
							className="w-full flex text-xs justify-start items-center px-2 h-10  hover:bg-secondary/50 rounded-sm">
							<p>Members</p>
						</DialogTrigger>
						<DialogContent>
							{/* <AvatarImageUploadForm id={channel.channelId} /> */}
						</DialogContent>
					</Dialog>
					<span className="w-full border-b border-border mt-10 mb-5" />
					<Dialog>
						<DialogTrigger
							type="button"
							className="w-full flex  text-xs text-destructive  justify-start items-center px-2 h-10 hover:bg-secondary/50 rounded-sm">
							<p>Delete Group</p>
						</DialogTrigger>
						<DialogContent>
							{/* <AvatarImageUploadForm id={channel.channelId} /> */}
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger
							type="button"
							className="w-full flex text-xs text-destructive  justify-start items-center px-2 h-10 hover:bg-secondary/50 rounded-sm">
							<p>Leave Group</p>
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
