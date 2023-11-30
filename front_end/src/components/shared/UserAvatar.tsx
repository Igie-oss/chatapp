import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useConvertBytesToUrl from "@/hooks/useConvertBytesToUrl";
import useGetUserAvatar from "@/hooks/useGetUserAvatar";
import placeholder from "@/assets/img-placeholder.jpg";
function UserAvatar({ id }: { id: string }) {
	const avatarData = useGetUserAvatar(id);
	const fileUrl = useConvertBytesToUrl(avatarData);

	return (
		<Avatar className="h-full w-full border border-primary/50">
			{!avatarData ? (
				<img
					src={placeholder}
					alt="image placeholder"
					className="w-full h-full rounded-full object-cover opacity-50"
				/>
			) : (
				<>
					<AvatarImage src={fileUrl} />
					<AvatarFallback className="w-full h-full rounded-full bg-secondary animate-pulse" />
				</>
			)}
		</Avatar>
	);
}
export default UserAvatar;
