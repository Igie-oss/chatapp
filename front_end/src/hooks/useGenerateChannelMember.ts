import { useEffect, useState } from "react";
import useGenerateChannel from "./useGenerateChannel";
import { useAppStore } from "@/features/store";

export default function useGenerateChannelMember() {
  const { channel } = useGenerateChannel();
  const user = useAppStore((state) => state.user);
  const [members, seTMembers] = useState<TMembers>({
    userId: "",
    userName: "",
    isAdmin: false,
  });

  useEffect(() => {
    const checkMates: TMembers[] = channel.members?.filter(
      (muser: TMembers) => muser.userId !== user.userId
    );
    if (checkMates[0]?.userId) {
      seTMembers({
        userId: checkMates[0]?.userId,
        userName: checkMates[0]?.userName,
        isAdmin: checkMates[0]?.isAdmin,
      });
    }
  }, [channel.channelId]);

  return members;
}
