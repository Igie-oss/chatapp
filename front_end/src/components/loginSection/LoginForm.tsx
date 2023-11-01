import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppStore } from "@/features/store";
import { customAxios } from "@/lib/helper";
import jwtDecode from "jwt-decode";
import { Button } from "../ui/button";
import BtnLoader from "@/components/shared/loader/BtnLoader";
enum EStatus {
  IS_SUCCESS = "isSuccess",
  IS_LOADING = "isLoading",
  IS_ERROR = "isError",
}
const LoginForm = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<TFetching | null>(null);
  const { setAuthToken, setUser } = useAppStore();
  const [isOpenEye, setIsOpenEye] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: new Yup.ObjectSchema({
      email: Yup.string().required("User name is required!"),
      password: Yup.string().required("Password is required!"),
    }),
    onSubmit: async (values) => {
      setStatus({ status: EStatus.IS_LOADING });
      const logInData: TLogin = {
        email: values.email,
        password: values.password,
      };
      await customAxios
        .post("/auth/login", { ...logInData })
        .then((response) => {
          setStatus({ status: EStatus.IS_SUCCESS });
          if (response.data.accessToken && response.status === 200) {
            setAuthToken(response.data.accessToken);
            const decoded: any = jwtDecode(response.data.accessToken);
            const user = decoded?.UserInfo;
            if (user) {
              setUser(user);
            }
            navigate("/chat");
          }
        })
        .catch((error) => {
          console.log(error);
          setStatus({
            status: EStatus.IS_SUCCESS,
            message: error.response.data.message,
          });
        });
    },
  });
  return (
    <main className="w-screen h-screen flex flex-col gap-10 items-center justify-center rounded-lg">
      <header className="w-full max-w-[30rem] flex flex-col gap-3 items-center">
        <h1 className="font-extrabold text-2xl mb-2 lg:text-3xl">
          WELCOME BACK
        </h1>
        <h5 className="font-semibold text-lg">Login your account</h5>
        <p className="font-medium text-xs">Your Conversational Companion</p>
      </header>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-[30rem] flex flex-col items-center gap-5  px-2 py-5 rounded-md md:px-5 md:py-10 relative border"
      >
        <h1 className="font-black text-lg">Log In</h1>
        <p className="text-sm text-destructive my-2">{status?.message}</p>
        <main className="w-full flex flex-col items-start gap-2">
          <div className="relative w-[95%] flex flex-col pb-4  pl-4 gap-1">
            <label htmlFor="email" className="font-semibold text-sm">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={formik.values.email || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-10 outline-none pl-2 pr-10  bg-transparent text-sm border rounded-lg border-border ${
                formik.touched.email && formik.errors.email
                  ? "border-destructive"
                  : "border-foreground"
              }  `}
            />
            <span className="absolute right-1 bottom-5 p-2">
              <BsFillPersonFill className="w-5 h-5" />
            </span>
            <p className="absolute right-1 bottom-0 text-[10px] lg:text-xs text-destructive">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </p>
          </div>
          <div className="relative w-[95%] flex flex-col  pb-4  pl-4 gap-1">
            <label htmlFor="password" className="font-semibold text-sm">
              Password
            </label>
            <input
              type={isOpenEye ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={formik.values.password || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-10 outline-none pl-2 pr-10  text-sm bg-transparent  border rounded-lg border-border ${
                formik.touched.password && formik.errors.password
                  ? "border-destructive"
                  : "border-foreground"
              }   `}
            />
            <button
              type="button"
              onClick={() => setIsOpenEye((prev) => !prev)}
              className="absolute right-1 bottom-5 p-2"
            >
              {isOpenEye ? (
                <FaRegEye className="w-5 h-5 pointer-events-none" />
              ) : (
                <FaRegEyeSlash className="w-5 h-5 pointer-events-none" />
              )}
            </button>
            <p className="absolute right-1 bottom-0 text-[10px] lg:text-xs text-destructive">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null}
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <Button
              type="submit"
              title="Log In"
              disabled={status?.status === EStatus.IS_LOADING}
              className="w-[92%] h-10  mt-5 rounded-md"
            >
              {status?.status === EStatus.IS_LOADING ? <BtnLoader /> : "Log in"}
            </Button>
          </div>
          <div className="w-full flex items-center justify-center gap-2 text-sm px-5 pt-5">
            <p>Don't have an account?</p>
            <Link to="/register" className="text-blue-500">
              Sing up
            </Link>
          </div>
        </main>
      </form>
    </main>
  );
};

export default LoginForm;
