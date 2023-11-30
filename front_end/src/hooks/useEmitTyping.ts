import { useEffect, useState } from "react";
import { socket } from "@/socket";
import useGetChannelIdSearchParams from "./useGetChannelIdSearchParams";
export default function useEmitTyping() {
	const channelId = useGetChannelIdSearchParams();
	const [isTyping, setIsTyping] = useState(false);
	const [typingTimeOut, setTypingTimeOut] = useState<NodeJS.Timeout | null>(
		null
	);

	//handle emit typing
	const handleInput = () => {
		socket.emit("client_start_typing", channelId);
		if (typingTimeOut) clearTimeout(typingTimeOut);
		setTypingTimeOut(
			setTimeout(() => {
				socket.emit("client_end_typing", channelId);
			}, 500)
		);
	};
	//listen emit typing
	useEffect(() => {
		socket.on("server_start_typing", (res) => {
			if (res?.data === channelId) {
				setIsTyping(true);
			}
		});

		socket.on("server_end_typing", (res) => {
			if (res?.data === channelId) {
				setIsTyping(false);
			}
		});

		return () => {
			socket.off("server_start_typing");
			socket.off("server_end_typing");
		};
	}, [channelId]);
	return { isTyping, handleInput };
}
