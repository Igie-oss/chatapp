import { customAxios } from "@/lib/helper";
import { useQuery } from "react-query";

export default function useUserAvatar(id: string) {
  const { data: avatarData } = useQuery({
    queryKey: `user_avatar_${id}`,
    queryFn: async () => {
      if(!id) return;
      const res = await customAxios.get(`/images/getimagebyid/${id}`);
      return res?.data;
    },
  });

  return avatarData;
}
