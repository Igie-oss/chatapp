import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAppStore } from "@/services/states/store";
import LoadingSpinner from "./loader/LoadingSpinner";
import { customAxios } from "@/lib/helper";
import jwtDecode from "jwt-decode";
const Persist = () => {
  const { token, setAuthToken, setUser } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect((): any => {
    const refresher = async () => {
      setIsLoading(true);
      customAxios("/auth/refresh", { method: "GET" })
        .then((response: any) => {
          if (response.data.accessToken && response.status === 200) {
            setAuthToken(response.data.accessToken);
            const decoded: any = jwtDecode(response.data.accessToken);
            const user = decoded?.UserInfo;
            setUser(user);
          }
          setSuccess(true);
          setIsLoading(false);
        })
        .catch((error: any) => {
          setIsError(true);
          setIsLoading(false);
          setErrorMsg(error.response?.data.message);
        });
    };
    if (!token) refresher();
  }, []);

  let content: any;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isError || !token) {
    content = (
      <div className="w-screen h-screen grid place-content-center">
        <div className="flex justify-center font-medium text-xs lg:text-sm gap-1">
          <p>{`${errorMsg ? errorMsg : "Something went wrong!"} - `}</p>
          <Link to="/login" className="cursor-pointer underline text-blue-400">
            Please Login again
          </Link>
        </div>
      </div>
    );
  } else if (success) {
    content = <Outlet />;
  } else if (token) {
    content = <Outlet />;
  }
  return content;
};

export default Persist;
