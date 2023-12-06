import useEmitTyping from "@/hooks/useEmitTyping";

export default function Typing() {
	const { isTyping } = useEmitTyping();

	return isTyping ? (
		<div className="absolute bottom-[108%] left-5  py-2 px-2 rounded-full flex items-center justify-center gap-1">
			<span className="w-[0.40rem] h-[0.40rem] rounded-full bg-primary animate-bounce transition-all delay-100" />
			<span className="w-[0.40rem] h-[0.40rem] rounded-full bg-primary animate-bounce transition-all delay-200" />
			<span className="w-[0.40rem] h-[0.40rem] rounded-full bg-primary animate-bounce transition-all delay-300" />
		</div>
	) : null;
}
