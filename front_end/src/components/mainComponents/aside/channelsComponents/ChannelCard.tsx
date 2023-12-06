/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/services/states/store";
import DisplayDate from "@/components/shared/DisplayDate";
import { Trash2, MoreVertical, Users } from "lucide-react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateGroupForm from "@/components/mainComponents/groupComponents/createGroup/CreateGroupForm";
import { EContentType } from "@/enum";
import UserAvatar from "@/components/shared/UserAvatar";
import useGetChannelIdSearchParams from "@/hooks/useGetChannelIdSearchParams";
import { memo } from "react";
type Props = {
	message: TChannelMessages;
};

const ChannelCard = memo(function ChannelCard({ message }: Props) {
	const userId = useAppStore((state) => state.user.userId);
	const seTMembers = useAppStore((state) => state.seTMembers);
	const channelId = useGetChannelIdSearchParams();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/message/channel?channelId=${message.channelId}`);
		seTMembers(message.members);
	};
	return (
		<li
			className={`group p-2 w-full h-fit hover:bg-secondary/50 rounded-lg flex justify-between gap-1 cursor-pointer ${
				channelId === message?.channelId ? "bg-secondary" : "bg-transparent"
			}`}>
			<div
				onClick={handleClick}
				className="h-full w-[90%] flex items-start gap-3">
				<div className="w-8 h-8 rounded-full overflow-hidden">
					<UserAvatar
						id={
							message?.isGroup
								? message?.channelId
								: message?.members?.find((u) => u.userId !== userId)?.userId!
						}
					/>
				</div>
				<div className="flex-1 h-full flex flex-col justify-end gap-1">
					<h1 className="font-semibold text-sm pointer-events-none">
						{message?.isGroup
							? message?.groupName
							: message?.members?.find((u) => u.userId !== userId)?.userName!}
					</h1>

					<div className="w-full flex items-end gap-2">
						{message.contentType === EContentType.IMG_URL ? (
							<p className="text-xs  opacity-70 pointer-events-none">
								{message?.senderId === userId
									? "You "
									: message?.members.filter(
											(member) => member.userId !== message.senderId
									  )[0].userName + " "}
								sent a photo
							</p>
						) : message.content ? (
							<h5 className="text-xs  opacity-70 pointer-events-none">
								{message?.senderId === userId ? "You: " : ""}
								{message?.content.slice(0, 10)}
							</h5>
						) : (
							<span className="h-4" />
						)}

						{message?.sendAt ? (
							<p className="text-[10px]   opacity-50 pointer-events-none">
								<DisplayDate date={message.sendAt} />
							</p>
						) : null}
					</div>
				</div>
			</div>
			<div className="h-full flex-1 flex  justify-center ">
				<Popover>
					<PopoverTrigger
						title="More"
						className="p-3 rounded-full border shadow-md transition-all motion-safe:hover:scale-105 opacity-0 group-hover:opacity-100">
						<MoreVertical className="w-5 h-5" />
					</PopoverTrigger>
					<PopoverContent className="px-1 flex flex-col gap-2 absolute -right-5">
						<Dialog>
							{message?.isGroup ? null : (
								<DialogTrigger asChild>
									<button
										type="button"
										className="w-full h-10 flex items-center gap-4 text-start px-2 rounded-md hover:bg-secondary/50 text-sm">
										<Users className="w-5 h-5" />
										<p>Create group</p>
									</button>
								</DialogTrigger>
							)}
							<DialogContent>
								<CreateGroupForm
									user={message?.members?.find((u) => u.userId !== userId)!}
								/>
							</DialogContent>
						</Dialog>
						<button
							type="button"
							className="w-full h-10 flex items-center gap-4 text-start px-2 rounded-md hover:bg-secondary/50 text-sm">
							<Trash2 className="w-5 h-5" /> <p>Delete</p>
						</button>
					</PopoverContent>
				</Popover>
			</div>
		</li>
	);
});

export default ChannelCard;
