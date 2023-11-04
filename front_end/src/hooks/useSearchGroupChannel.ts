import { useEffect, useState } from "react";
type Props = {
  channels: TChannel[];
  searchText: string;
};
export default function useSearchGroupChannel({ channels, searchText }: Props) {
  const [filteredChannels, setFilteredChannels] = useState<TChannel[]>([]);

  useEffect(() => {
    if (!channels?.length) return;
    setFilteredChannels(channels);
    let timeout: NodeJS.Timeout = setTimeout(() => {
      let filtered: TChannel[] = channels.filter((channel: TChannel) =>
        channel.groupName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredChannels(filtered);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchText, channels]);

  return filteredChannels;
}
