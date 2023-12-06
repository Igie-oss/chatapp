import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useAppStore } from "@/services/states/store";
import { EStatus } from "@/enum";
import BtnLoader from "@/components/shared/loader/BtnLoader";
import { customAxios } from "@/lib/helper";
import { DateTime } from "luxon";
import { socket } from "@/socket";
import UsersListContainer from "./UsersListContainer";
type Props = {
	user: TMembers | null;
};
export default function CreateGroupForm({ user }: Props) {
	const { userId, userName } = useAppStore((state) => state.user);
	const [groupName, setGroupName] = useState("");
	const [status, setStatus] = useState<TFormStatus | null>(null);
	const [groupMembers, setGroupMembers] = useState<TMembers[]>([
		{ userId, userName, isAdmin: true },
	]);

	useEffect(() => {
		if (user) {
			setGroupMembers((prev) => [...prev, { ...user, isAdmin: false }]);
		}
	}, [user]);

	const handleRemoveUser = (userId: string) => {
		setGroupMembers((prev) => prev.filter((user) => user.userId !== userId));
	};

	const handleAddUser = (member: TMembers) => {
		setGroupMembers((prev) => [...prev, member]);
	};

	const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (groupMembers.length < 1 || !groupName) return;

		setStatus({ status: EStatus.IS_LOADING });

		const dateNow: Date = DateTime.now().setZone("Asia/Manila").toJSDate();
		customAxios
			.post("channel/creatgroup", {
				groupName: groupName,
				members: groupMembers,
			})
			.then((res) => {
				if (res?.data && res.status === 201) {
					const resData = res.data;
					const emitNewGroup = {
						channelId: resData.channelId,
						groupName: resData.groupName,
						isGroup: resData.isGroup,
						members: resData.members,
						content: "",
						contentType: "text",
						senderId: userId,
						sendAt: dateNow,
					};
					socket.emit("client_new_group_channel", emitNewGroup);
					DialogClose;
				}
			})
			.catch((err) => {
				console.log(err);
				setStatus({
					status: EStatus.IS_ERROR,
					message: "Failed to create group chat!",
				});
			})
			.finally(() => {
				setStatus({
					status: EStatus.IS_SUCCESS,
					message: "Group chat created!",
				});
			});
	};

	return (
		<form
			onSubmit={(e) => handelSubmit(e)}
			className="w-full flex flex-col gap-2 items-center relative">
			<h2 className="text-lg font-semibold py-2 px-4 border border-border rounded-md bg-secondary/50">
				Create Group
			</h2>
			{status?.status === EStatus.IS_ERROR ? (
				<p className="text-sm text-destructive px-3 py-2 border bg-secondary/50 border-destructive">
					{status.message}
				</p>
			) : null}
			{status?.status === EStatus.IS_SUCCESS ? (
				<p className="text-sm  px-3 py-2 border bg-secondary/50 border-border">
					{status.message}
				</p>
			) : null}
			<div className="w-full h-10">
				<input
					type="text"
					placeholder="Enter group name"
					value={groupName || ""}
					onChange={(e) => setGroupName(e.target.value)}
					className="w-[80%] h-full text-sm  px-2 border-b bg-transparent  outline-none"
				/>
			</div>
			<div className="w-full flex flex-col items-center gap-5">
				<div className="w-full flex flex-col rounded-md gap-3 p-2">
					<h2 className="font-semibold text-sm">Group Members</h2>
					<UsersListContainer
						handleAddUser={handleAddUser}
						groupMembers={groupMembers}
						handleRemoveUser={handleRemoveUser}
					/>
				</div>
			</div>

			<div className="w-full flex gap-4 mt-5">
				<DialogTrigger
					title="Cancel"
					type="button"
					disabled={status?.status === EStatus.IS_LOADING || !!status?.message}
					className="bg-secondary w-40 rounded-md">
					Cancel
				</DialogTrigger>

				<Button
					disabled={
						status?.status === EStatus.IS_LOADING ||
						!groupName ||
						!groupMembers.length ||
						!!status?.message
					}
					type="submit"
					className="w-40 relative">
					{status?.status === EStatus.IS_LOADING ? (
						<BtnLoader />
					) : (
						"Create group"
					)}
				</Button>
			</div>
		</form>
	);
}
