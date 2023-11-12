import { useState } from "react";
import { Button } from "../ui/button";
import BtnsLoaderSpinner from "./loader/BtnLoader";
import { customAxios } from "@/lib/helper";
import { useNavigate } from "react-router-dom";
export default function SignOutBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    customAxios("/auth/logout", { method: "GET" })
      .then((res) => {
        if (res.data) {
          setIsLoading(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  return (
    <Button
      onClick={handleSignOut}
      type="button"
      size="sm"
      className="text-xs font-semibold w-full"
    >
      {isLoading ? <BtnsLoaderSpinner /> : "Sign Out"}
    </Button>
  );
}
