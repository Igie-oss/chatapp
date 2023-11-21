import { useState } from "react";
import { Button } from "../ui/button";
import BtnsLoaderSpinner from "./loader/BtnLoader";
import { customAxios } from "@/lib/helper";
import { useNavigate } from "react-router-dom";
export default function SignOutBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    setIsLoading(true);
    customAxios
      .post("/auth/logout")
      .then((res) => {
        if (res.data) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Button
      onClick={handleSignOut}
      type="button"
      size="sm"
      className="text-xs font-semibold w-[50%]"
    >
      {isLoading ? <BtnsLoaderSpinner /> : "Sign Out"}
    </Button>
  );
}
