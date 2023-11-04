import { customAxios } from "@/lib/helper";
import { useEffect, useState } from "react";

export default function useGetUserGroupChannel(userId: string) {
  const [groupChannels, setGroupChannels] = useState<TChannel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    customAxios
      .get(`/channel/groupchannel/${userId}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data?.length) setGroupChannels(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);
  return { groupChannels, isLoading };
}
