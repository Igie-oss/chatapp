/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Link } from "react-router-dom";
import { socket } from "@/socket";
import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { MoreVertical } from "lucide-react";
import UserAvatar from "@/components/shared/UserAvatar";
import { useAppStore } from "@/services/states/store";
type Props = {
	toggelAside: () => void;
	channel: TChannel;
};
export default function Header({ channel, toggelAside }: Props) {
	const userId = useAppStore((state) => state.user.userId);
	useEffect(() => {
		if (!channel?.channelId) return;
		socket.emit("join-channel", channel?.channelId);
		return () => {
			socket.off("join-channel");
		};
	}, [channel?.channelId]);

	return (
		<header className="w-full flex-1 bg-secondary/50 flex items-center rounded-md justify-between shadow-sm  px-2 lg:px-4 ">
			{channel?.channelId ? (
				<>
					<div className="flex gap-4 items-center">
						<Link
							title="Close"
							to="/message/channel"
							className="lg:hidden rounded-full  p-2  flex hover:bg-secondary">
							<ChevronLeft className="w-6 h-6 pointer-events-none" />
						</Link>
						{channel?.channelId ? (
							<div className="flex items-end gap-2">
								<div className="w-8 h-8 rounded-full overflow-hidden">
									<UserAvatar
										id={
											channel?.isGroup
												? channel?.channelId
												: channel?.members?.find((u) => u.userId !== userId)
														?.userId!
										}
									/>
								</div>

								<h1 className="mb-1 ml-2 text-sm font-semibold">
									{channel?.isGroup
										? channel?.groupName
										: channel?.members?.find((u) => u.userId !== userId)
												?.userName!}
								</h1>
							</div>
						) : null}
					</div>
					<div className="flex items-end">
						<button
							type="button"
							title="More"
							onClick={toggelAside}
							className=" rounded-full p-2 flex hover:bg-secondary xl:hidden">
							<MoreVertical className="w-6 h-6" />
						</button>
					</div>
				</>
			) : null}
		</header>
	);
}
