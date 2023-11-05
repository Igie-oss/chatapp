import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TRegisterResData } from "./RegisterForm";
import { customAxios } from "@/lib/helper";
type Props = {
  email: string;
  otpId: string;
  setOtpUserData: Dispatch<SetStateAction<TRegisterResData>>;
};
export default function ResendOtp({ email, otpId, setOtpUserData }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [disable, setDisable] = useState(true);
  const [errMsg, setErrorMsg] = useState<string | null>(null);

  //Timer
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  const handleRequestOtp = async () => {
    if (!otpId || disable) return;
    setErrorMsg(null);
    setIsLoading(true);
    customAxios("/register/rerequestotp", {
      method: "POST",
      data: { otpId, email },
    })
      .then((res) => {
        if (res?.data) {
          const newOtpId = res.data?.otpId;
          setOtpUserData((prev) => {
            return { ...prev, otpId: newOtpId };
          });
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          const msg = err?.response?.data?.message;
          setErrorMsg(msg);
        }
      })
      .finally(() => {
        setIsLoading(false);
        setDisable(true);
        setTimer(60);
      });
  };
  return (
    <div className="flex items-center gap-2 text-xs">
      {errMsg ? (
        <>
          <p className="text-destructive">{errMsg}</p>
          <button
            onClick={() => window.location.reload()}
            type="button"
            className="px-3 py-2 rounded-md bg-secondary"
          >
            Register again
          </button>
        </>
      ) : (
        <>
          <p>Didn't recieve code? </p>
          {disable ? (
            <p> {`Resend OTP in ${timer}s`}</p>
          ) : (
            <button
              onClick={handleRequestOtp}
              type="button"
              disabled={isLoading}
              className="px-3 py-2 rounded-md bg-secondary disabled:cursor-wait"
            >
              {isLoading ? "Please wait..." : "Request Otp"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
