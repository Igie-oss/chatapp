import UserAvatar from "@/components/shared/UserAvatar";
import { useNavigate } from "react-router-dom";

type Props = {
  channel: TChannel;
};
export default function GroupCard({ channel }: Props) {
  const navigate = useNavigate();

  return (
    <li
      key={channel.channelId}
      onClick={() => navigate(`${channel.channelId}`)}
      className="w-full h-12 flex gap-4 items-center border rounded-md px-2 cursor-pointer"
    >
      <div className="h-8 w-8 rounded-full">
        <UserAvatar id={channel.channelId} />
      </div>
      <h4 className="text-sm">{channel.groupName}</h4>
    </li>
  );
}
