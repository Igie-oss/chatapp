import { useEffect, useState } from "react";
import { useAppStore } from "@/services/states/store";
import { useParams } from "react-router-dom";

export default function useIsAllowed(chatMembers:TMembers[]) {
  const [isAllowed, setIsAllowed] = useState(false);
  const user = useAppStore((state) => state.user);
  const { channelId } = useParams();

  useEffect(() => {
    const filtered = chatMembers?.filter((cuser) => cuser?.userId === user?.userId);
    if (channelId && filtered) {
      setIsAllowed(!!filtered.length);
    }
  }, [channelId, chatMembers]);

  return isAllowed;
}
