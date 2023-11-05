import { memo, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { customAxios } from "@/lib/helper";
import useConvertBytesToUrl from "@/hooks/useConvertBytesToUrl";
function UserAvatar({ id }: { id: string }) {
  const { fileUrl, setFileData } = useConvertBytesToUrl();
  useEffect(() => {
    customAxios(`/images/getimagebyid/${id}`)
      .then((res) => {
        if (res?.data) {
          setFileData(res.data);
        }
      })
      .catch(() => {});
  }, [id]);
  return (
    <Avatar className="h-full w-full border-2 border-primary/50">
      <AvatarImage src={fileUrl} />
      <AvatarFallback className="w-full h-full rounded-full bg-secondary animate-pulse" />
    </Avatar>
  );
}
export default memo(UserAvatar);
