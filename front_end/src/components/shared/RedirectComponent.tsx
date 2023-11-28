import { customAxios } from "@/lib/helper";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "./loader/LoadingSpinner";
import { EStatus } from "@/pages/RegisterScreen";
export default function RedirectComponent() {
  const navigate = useNavigate();
  const [actionStatus, setActionStatus] = useState<TFormStatus | null>(null);

  useEffect(() => {
    setActionStatus({ status: EStatus.IS_LOADING });

    (async () => {
      try {
        const res = await customAxios.get("/auth/redirect");
        if (res?.status === 200) {
          setActionStatus({ status: EStatus.IS_SUCCESS });
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
        setActionStatus({ status: EStatus.IS_ERROR });
      }
    })();
  }, []);

  return actionStatus?.status === EStatus.IS_LOADING ? (
    <LoadingSpinner />
  ) : actionStatus?.status === EStatus.IS_ERROR ? (
    <Outlet />
  ) : null;
}
