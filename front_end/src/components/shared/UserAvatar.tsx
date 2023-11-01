import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserAvatar({id}:{id:string}) {
  return (
    <Avatar className="h-full w-full border-2 border-primary/50">
      <AvatarImage src="" />
      <AvatarFallback className="w-full h-full rounded-full bg-secondary animate-pulse"/>
    </Avatar>
  );
}
export default memo(UserAvatar);
