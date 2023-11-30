import { useNavigate } from "react-router-dom";
import UserAvatar from "@/components/shared/UserAvatar";
import { useAppStore } from "@/services/states/store";
import { customAxios } from "@/lib/helper";
import uuid from "react-uuid";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import CreateGroupForm from "../groupChannelsComponents/createGroupComponents/CreateGroupForm";
type Props = {
	user: TUser;
};

export default function UsersCard({ user }: Props) {
	const navigate = useNavigate();
	const currentUser = useAppStore((state) => state.user);
	const seTMembers = useAppStore((state) => state.seTMembers);
	const members = useAppStore((state) => state.members);
	const handleClick = async () => {
		const members = [
			{
				userId: currentUser.userId,
				userName: currentUser.userName,
				isAdmin: false,
			},
			{
				userId: user.userId,
				userName: user.userName,
				isAdmin: false,
			},
		];
		customAxios
			.post("channel/getchannelbymembers", { members })
			.then((res) => {
				if (res.status === 200) {
					const resData = res.data;
					navigate(`/chat/channel?channelId=${resData.channelId}`);
				} else {
					navigate(`/chat/channel?channelId=${uuid()}`);
				}
			})
			.catch((err) => {
				if (err) {
					navigate(`/chat/channel?channelId=${uuid()}`);
				}
			});
		seTMembers(members);
	};

	return (
		<li
			className={`cursor-pointer  p-2 group w-full  hover:bg-secondary/50 rounded-md flex items-center justify-between ${
				members.find(({ userId }) => userId === user.userId) &&
				members?.length <= 2
					? "bg-secondary"
					: ""
			}`}>
			<div
				onClick={handleClick}
				className="h-full w-[90%] flex items-center gap-4">
				<div className="w-8 h-8 flex items-start">
					<UserAvatar id={user?.userId} />
				</div>

				<h1 className="font-semibold text-xs pointer-events-none">
					{user.userName}
				</h1>
			</div>
			<div className="flex-1 h-full">
				<Popover>
					<PopoverTrigger
						title="More"
						className="p-3 rounded-full border shadow-md transition-all motion-safe:hover:scale-105 opacity-0 group-hover:opacity-100">
						<BsThreeDotsVertical className="w-5 h-5" />
					</PopoverTrigger>
					<PopoverContent className="px-1 flex flex-col gap-2 absolute -right-5">
						<Dialog>
							<DialogTrigger asChild>
								<button
									type="button"
									className="w-full h-10 flex items-center gap-4 text-start px-2 rounded-md hover:bg-secondary/50 text-sm">
									<HiOutlineUserGroup className="w-5 h-5" /> <p>Create group</p>
								</button>
							</DialogTrigger>
							<DialogContent>
								<CreateGroupForm
									user={{
										userId: user.userId,
										userName: user.userName,
										isAdmin: false,
									}}
								/>
							</DialogContent>
						</Dialog>
					</PopoverContent>
				</Popover>
			</div>
		</li>
	);
}
