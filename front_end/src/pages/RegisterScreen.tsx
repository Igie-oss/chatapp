import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { customAxios } from "@/lib/helper";
import { useEffect, useState } from "react";
import BtnLoader from "@/components/shared/loader/BtnLoader";
import VerifyOtp from "@/components/registerComponents/VerifyOtp";
import { Link } from "react-router-dom";

type UserName = {
	userName: string;
};

export default function RegisterScreen() {
	const [status, setStatus] = useState<TFormStatus | null>(null);
	const [existUsersNames, setExistUsersNames] = useState<string[]>([]);
	const [registerRes, setRegisterRes] = useState<TRegisterResData>({
		otpId: "",
		userId: "",
		userName: "",
		email: "",
		password: "",
	});

	const formik = useFormik({
		initialValues: {
			userName: "",
			email: "",
			password: "",
			confirmpass: "",
		},
		validationSchema: new Yup.ObjectSchema({
			userName: Yup.string()
				.notOneOf(existUsersNames, "User name already used!")
				.required("User name is required!")
				.max(10)
				.min(2),
			email: Yup.string().required("Email is required").email(),
			password: Yup.string().required("Create your password"),
			confirmpass: Yup.string()
				.required("Confirm your password")
				.oneOf([Yup.ref("password")], "Password doesn't match!"),
		}),
		onSubmit: async (values) => {
			if (values.password !== values.confirmpass) {
				return;
			}

			setStatus({ status: EStatus.IS_LOADING });
			customAxios
				.post("/register/reqotp", {
					userName: values.userName,
					email: values.email,
					password: values.password,
				})
				.then((res) => {
					if (res?.data && res.status === 200) {
						const data = res?.data;
						setRegisterRes({
							otpId: data.otpId,
							userId: data.userId,
							userName: data.userName,
							email: data.email,
							password: data.password,
						});
					}

					setStatus({
						status: EStatus.IS_SUCCESS,
						message: "Account registered, please login!",
					});
				})
				.catch((err) => {
					console.log(err);
					setStatus({
						status: EStatus.IS_ERROR,
						message: err.response.data.message,
					});
				});
		},
		onReset: (_, { resetForm }) => {
			resetForm();
		},
	});

	useEffect(() => {
		(async () => {
			customAxios
				.get("/register/getallusersname")
				.then((res) => {
					if (res?.data?.length) {
						const mappedData = res.data.map((data: UserName) => {
							return data.userName;
						});

						setExistUsersNames(mappedData);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		})();
	}, []);

	if (status?.status === EStatus.IS_SUCCESS) {
		return <VerifyOtp data={registerRes} />;
	}

	return (
		<section className="w-screen h-screen flex flex-col gap-10 items-center justify-center rounded-lg">
			<header className="w-full max-w-[30rem] flex flex-col gap-3 items-center">
				<h1 className="font-extrabold text-2xl mb-2 lg:text-3xl">WELCOME</h1>
				<h5 className="font-semibold text-lg">Create your account</h5>
				<p className="font-medium text-xs">Your Conversational Companion</p>
			</header>
			<form
				onSubmit={formik.handleSubmit}
				className="w-full max-w-[30rem] flex flex-col items-center gap-5  px-2 py-5 rounded-md md:px-5 md:py-10 relative border ">
				<h1 className="font-black text-lg">Sign up</h1>
				<p
					className={`text-sm font-semibold ${
						status?.status === EStatus.IS_ERROR ? "text-destructive" : ""
					} `}>
					{status?.message}
				</p>
				<main className="w-full flex flex-col items-center gap-5">
					<div className="w-[90%] flex flex-col gap-1 relative">
						<label htmlFor="userName" className="font-semibold text-sm">
							User Name
						</label>
						<input
							type="text"
							id="userName"
							placeholder="Enter your user Name"
							value={formik.values.userName || ""}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className={`w-full h-10 outline-none pl-2 pr-10   text-sm  bg-transparent  border rounded-lg  ${
								formik.touched.userName && formik.errors.userName
									? "border-destructive"
									: "border-border"
							} `}
						/>
						<p className="absolute right-0 -bottom-5 text-xs text-destructive">
							{formik.touched.userName && formik.errors.userName
								? formik.errors.userName
								: null}
						</p>
					</div>
					<div className="w-[90%] flex flex-col gap-1 relative">
						<label htmlFor="email" className="font-semibold text-sm">
							Email
						</label>
						<input
							type="text"
							id="email"
							placeholder="Enter your user Name"
							value={formik.values.email || ""}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className={`w-full h-10 outline-none pl-2 pr-10   text-sm  bg-transparent  border rounded-lg    ${
								formik.touched.email && formik.errors.email
									? "border-destructive"
									: "border-border"
							}  `}
						/>
						<p className="absolute right-0 -bottom-5 text-xs text-destructive">
							{formik.touched.email && formik.errors.email
								? formik.errors.email
								: null}
						</p>
					</div>
					<div className="w-[90%] flex flex-col gap-1 relative">
						<label htmlFor="password" className="font-semibold text-sm">
							Create password
						</label>
						<input
							type="password"
							id="password"
							placeholder="Create your password"
							value={formik.values.password || ""}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className={`w-full h-10 outline-none pl-2 pr-10   text-sm  bg-transparent  border rounded-lg  ${
								formik.touched.password && formik.errors.password
									? "border-destructive"
									: "border-border"
							} `}
						/>
						<p className="absolute right-0 -bottom-5 text-xs text-destructive">
							{formik.touched.password && formik.errors.password
								? formik.errors.password
								: null}
						</p>
					</div>
					<div className="w-[90%] flex flex-col gap-1 relative">
						<label htmlFor="confirmpass" className="font-semibold text-sm">
							Confirm password
						</label>
						<input
							type="password"
							id="confirmpass"
							placeholder="Confirm your password"
							value={formik.values.confirmpass || ""}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className={`w-full h-10 outline-none pl-2 pr-10   text-sm bg-transparent border rounded-lg  ${
								formik.touched.confirmpass && formik.errors.confirmpass
									? "border-destructive"
									: "border-border"
							} `}
						/>
						<p className="absolute right-0 -bottom-5 text-xs text-destructive">
							{formik.touched.confirmpass && formik.errors.confirmpass
								? formik.errors.confirmpass
								: null}
						</p>
					</div>
					<div className="w-full flex  gap-5 mt-10 px-5">
						<Button
							type="reset"
							title="Register"
							size="sm"
							variant="secondary"
							disabled={status?.status === EStatus.IS_LOADING}
							className="w-[50%] h-10 text-xs rounded-md">
							Cancel
						</Button>

						<Button
							type="submit"
							title="Register"
							size="sm"
							disabled={status?.status === EStatus.IS_LOADING}
							className="w-[50%] h-10 text-xs rounded-md">
							{status?.status === EStatus.IS_LOADING ? <BtnLoader /> : "Submit"}
						</Button>
					</div>
					<div className="w-full flex items-center justify-center gap-2 text-sm px-5 pt-5">
						<p>Already have an account?</p>
						<Link to="/login" className="text-blue-500">
							Login
						</Link>
					</div>
				</main>
			</form>
		</section>
	);
}
