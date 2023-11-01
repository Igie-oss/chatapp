import { customAxios } from "@/lib/helper";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  children: React.ReactNode;
};

export default function RedirectComponent({ children }: Props) {
  const navigate = useNavigate();
  const [isRedirect, setIsRedirect] = useState(false);
  useEffect(() => {
    customAxios
      .get("/auth/redirect")
      .then((res) => {
        if (res?.status === 200) {
          setIsRedirect(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isRedirect) {
    navigate("/chat");
  }
  return <>{children}</>;
}
