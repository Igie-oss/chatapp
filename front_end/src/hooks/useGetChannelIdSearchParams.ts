import { useLocation } from "react-router-dom";
export default function useGetChannelIdSearchParams() {
  const search = useLocation().search;
  const channelId = new URLSearchParams(search).get("channelId");

  return channelId;
}
