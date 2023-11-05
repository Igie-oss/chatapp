import { useAppStore } from "@/features/store";
import { customAxios } from "@/lib/helper";
import { useEffect, useState } from "react";

export default function useGetUsers() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAppStore((state) => state.user);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      customAxios("/users", { method: "GET" })
        .then((res) => {
          if (res?.data?.length) {
            const data = res.data;
            const filtered = data.filter(
              (user: TUser) => user.userId !== userId
            );
            setUsers(filtered);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    })();
  }, []);

  return { users, isLoading };
}
