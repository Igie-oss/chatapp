import { useEffect, useState } from "react";
import { useAppStore } from "@/features/store";
import { useParams } from "react-router-dom";

export default function useIsAllowed() {
  const [isAllowed, setIsAllowed] = useState(false);
  const user = useAppStore((state) => state.user);
  const { channelId } = useParams();
  const chatMates = useAppStore((state) => state.members);
  useEffect(() => {
    const filtered = chatMates.filter((cuser) => cuser.userId === user.userId);

    if (channelId && filtered) {
      setIsAllowed(!!channelId && !!filtered.length);
    }
  }, [channelId, chatMates[0].userId]);
  return isAllowed;
}
