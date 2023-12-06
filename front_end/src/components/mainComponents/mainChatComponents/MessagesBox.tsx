import { useEffect, useRef, useState, Fragment } from "react";
import MessageCard from "./MessageCard";
import BtnsLoaderSpinner from "@/components/shared/loader/BtnLoader";
import { useInView } from "react-intersection-observer";
import useGetChannelMessages from "@/hooks/useGetChannelMessages";
import useGetChannelIdSearchParams from "@/hooks/useGetChannelIdSearchParams";
import { MessageSquare } from "lucide-react";
export default function MessagesBox() {
	const channelId = useGetChannelIdSearchParams();
	const [cursor, setCursor] = useState("");
	const scrollRef = useRef<HTMLUListElement | null>(null);
	const { messages, fetchNextPage, isFetching } = useGetChannelMessages(
		channelId!,
		cursor
	);

	const { ref, inView } = useInView({
		/* Optional options */
		threshold: 0,
	});

	useEffect(() => {
		if (messages?.length) {
			setCursor(messages[0][0]?.messageId);
			if (!(messages?.length > 1)) {
				scrollRef?.current?.lastElementChild?.scrollIntoView({
					behavior: "smooth",
				});
			}
		}
	}, [messages]);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (inView && messages[messages.length - 1]?.length > 10) {
			timer = setTimeout(() => {
				if (messages[0]?.length === 1 && messages[0][0].messageId === cursor) {
					return;
				} else {
					fetchNextPage();
				}
			}, 200);
		}

		return () => clearTimeout(timer);
	}, [inView, cursor, messages, fetchNextPage]);

	return (
		<ul
			ref={scrollRef}
			className="w-full h-[84%] overflow-y-auto overflow-x-auto p-2 py-10 flex flex-col items-center gap-2 relative">
			<span ref={ref} />
			{isFetching ? (
				<MessageLoader />
			) : !messages?.length ? (
				<div className="w-full flex flex-col items-center text-base gap-2 opacity-50">
					<p>Empty</p>
					<MessageSquare className="w-10 h-10" />
				</div>
			) : (
				<>
					{messages.map((messages) => {
						return (
							<Fragment key={Math.random()}>
								{messages.map((message: TMessages) => {
									return (
										<MessageCard key={message.messageId} message={message} />
									);
								})}
							</Fragment>
						);
					})}
				</>
			)}
		</ul>
	);
}

const MessageLoader = () => {
	return (
		<div className="w-full flex justify-center">
			<BtnsLoaderSpinner />
		</div>
	);
};
