import { Button } from "../ui/button";
import { TRegisterResData } from "./RegisterForm";
import { FormEvent, useState } from "react";
import BtnLoader from "@/components/shared/loader/BtnLoader";
import { customAxios } from "@/lib/helper";
import { useNavigate } from "react-router-dom";
import ResendOtp from "./ResendOtp";
import { EStatus } from "./RegisterForm";

type Props = { data: TRegisterResData };
export default function VerifyOtp({ data }: Props) {
  const [status, setStatus] = useState<TFetching | null>(null);
  const [inputOtp, setInputOtp] = useState("");
  const [otpUserData, setOtpUserData] = useState<TRegisterResData>(data);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const otpVerifyData = {
      otpId: otpUserData.otpId,
      otp: inputOtp,
    };
    setStatus({ status: EStatus.IS_LOADING });
    customAxios("/register/verifyotp", { method: "POST", data: otpVerifyData })
      .then((res: any) => {
        if (res?.status === 200) {
          handleRegisterUser();
        }
      })
      .catch((err) => {
        setStatus({
          status: EStatus.IS_ERROR,
          message: err.response.data.message,
        });
      });
  };

  const handleRegisterUser = async () => {
    const userData = {
      userId: otpUserData.userId,
      userName: otpUserData.userName,
      email: otpUserData.email,
      password: otpUserData.password,
    };

    customAxios("/register/newuser", { method: "POST", data: userData })
      .then((res: any) => {
        setStatus({ status: EStatus.IS_SUCCESS });
        if (res.status === 201) {
          navigate("/login");
        }
      })
      .catch((err) => {
        setStatus({
          status: EStatus.IS_ERROR,
          message: err.response.data.message,
        });
      });
  };

  return (
    <section className="w-screen h-screen flex flex-col gap-10 items-center pt-[10rem] rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[30rem] flex flex-col gap-5"
      >
        <header className="w-full flex flex-col items-center">
          <div className="font-semibold text-lg  lg:text-3xl">
            <p>Email Verification</p>
          </div>
          <div className="flex flex-col items-center my-5 text-xs lg:text-sm  text-gray-400">
            <p className="font-normal">We have sent a code to your email</p>
            <p className="font-medium p-2 bg-secondary my-4 rounded-md">
              {data.email}
            </p>
          </div>
          {status?.status === EStatus.IS_ERROR ? (
            <p className="text-destructive text-sm">{status?.message}</p>
          ) : null}
        </header>
        <main className="w-full flex flex-col items-center gap-8">
          <input
            type="text"
            placeholder="Enter your Otp"
            value={inputOtp || ""}
            onChange={(e) => setInputOtp(e.target.value)}
            className="w-[14rem] h-12 outline-none pl-2 pr-10 text-center  text-sm  rounded-lg  border-2 bg-secondary focus:border-primary/70"
          />
          <ResendOtp
            email={otpUserData.email}
            otpId={otpUserData.otpId}
            setOtpUserData={setOtpUserData}
          />
          <Button
            type="submit"
            title="Subit Otp"
            disabled={status?.status === EStatus.IS_LOADING}
            className="w-[80%] h-10  rounded-md"
          >
            {status?.status === EStatus.IS_LOADING ? <BtnLoader /> : "Submit"}
          </Button>
        </main>
      </form>
    </section>
  );
}
