import { useEffect } from "react";
import { useAppStore } from "@/services/states/store";
import { socket } from "@/socket";
import Aside from "@/components/mainComponents/aside/Aside";
import { Outlet } from "react-router-dom";
export default function MainContainer() {
	const { userId } = useAppStore((state) => state.user);

	useEffect(() => {
		socket.on("connection", () => {
			console.log("socket connected");
		});
		if (userId) {
			socket.emit("registerUser", userId);
		}
		return () => {
			socket.off("registerUser");
		};
	}, [userId]);

	return (
		<section className="w-screen h-screen flex items-center justify-center p-2">
			<main className="h-full w-full flex relative overflow-x-hidden">
				<Aside />
				<main className="w-full h-full flex p-2 gap-2 relative">
					<Outlet />
				</main>
			</main>
		</section>
	);
}
