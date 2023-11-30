import LoginForm from "@/components/loginComponents/LoginForm";
const LoginScreen = () => {
	return (
		<main className="w-screen h-screen flex flex-col gap-10 items-center justify-center rounded-lg">
			<header className="w-full max-w-[30rem] flex flex-col gap-3 items-center">
				<h1 className="font-extrabold text-2xl mb-2 lg:text-3xl">
					WELCOME BACK
				</h1>
				<h5 className="font-semibold text-lg">Login your account</h5>
				<p className="font-medium text-xs">Your Conversational Companion</p>
			</header>
			<LoginForm />
		</main>
	);
};

export default LoginScreen;
