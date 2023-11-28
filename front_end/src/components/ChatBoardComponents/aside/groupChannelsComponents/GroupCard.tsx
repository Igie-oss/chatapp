import UserAvatar from "@/components/shared/UserAvatar";
import { useAppStore } from "@/services/states/store";
import { useNavigate } from "react-router-dom";

type Props = {
  channel: TChannel;
};
export default function GroupCard({ channel }: Props) {
  const setMembers = useAppStore((state) => state.seTMembers);
  const navigate = useNavigate();

  const handleClick = () => {
    setMembers(channel.members);
    navigate(`c/${channel.channelId}`);
  };
  return (
    <li
      key={channel.channelId}
      onClick={handleClick}
      className="w-full h-12 flex gap-4 items-center hover:bg-secondary/50  rounded-md px-2 cursor-pointer"
    >
      <div className="h-8 w-8 rounded-full">
        <UserAvatar id={channel?.channelId} />
      </div>
      <h4 className="text-sm">{channel?.groupName}</h4>
    </li>
  );
}
