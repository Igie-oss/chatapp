import { useEffect, useState } from "react";

type Props = {
	channels: TChannelMessages[];
	searchText: string;
};
export default function useSearchChannel({ channels, searchText }: Props) {
	const [filteredChannels, setFilteredChannels] = useState<TChannelMessages[]>(
		[]
	);

	useEffect(() => {
		if (!channels?.length) return;
		setFilteredChannels(channels);
		const timeout: NodeJS.Timeout = setTimeout(() => {
			const filtered: TChannelMessages[] = channels.filter(
				(channel: TChannelMessages) =>
					channel.members?.some((user) =>
						user.userName.toLowerCase().includes(searchText.toLowerCase())
					) ||
					channel.groupName?.toLowerCase().includes(searchText.toLowerCase())
			);

			setFilteredChannels(filtered);
		}, 400);

		return () => clearTimeout(timeout);
	}, [searchText, channels]);

	return filteredChannels;
}
