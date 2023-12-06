import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetUserAvatar from "@/hooks/useGetUserAvatar";
import useConvertBytesToUrl from "@/hooks/useConvertBytesToUrl";
import { memo } from "react";
export default memo(function ImageContent({ id }: { id: string }) {
	const avatarData = useGetUserAvatar(id);
	const fileUrl = useConvertBytesToUrl(avatarData);
	return (
		<Avatar className="h-full w-full !rounded-none">
			<AvatarImage src={fileUrl} />
			<AvatarFallback className="w-full h-full !rounded-none bg-secondary animate-pulse" />
		</Avatar>
	);
});
