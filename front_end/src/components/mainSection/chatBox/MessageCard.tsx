import { useAppStore } from "@/features/store";
import UserAvatar from "@/components/shared/UserAvatar";
import DisplayDate from "@/components/shared/DisplayDate";
import useGetChannelInfo from "@/hooks/useGetChannelInfo";
import Skeleton from "@/components/shared/Skeleton";
import { EContentType } from "./InputField";
type Props = {
  message: TMessages;
};
export default function MessageCard({ message }: Props) {
  const user = useAppStore((state) => state.user);
  const { channel, isLoading } = useGetChannelInfo(message?.channelId);
  return (
    <li
      className="w-full h-fit py-4 px-2 flex flex-col gap-2"
      style={{
        flexDirection: `${
          user.userId === message?.senderId ? "row-reverse" : "row"
        }`,
      }}
    >
      {user.userId !== message?.senderId ? (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {isLoading ? (
            <Skeleton />
          ) : (
            <UserAvatar
              id={channel?.isGroup ? channel?.channelId : message?.senderId}
            />
          )}
        </div>
      ) : null}
      <div
        style={{
          flexDirection: `${
            user.userId === message?.senderId ? "row-reverse" : "row"
          }`,
        }}
        className="w-[60%] h-fit flex mt-3 relative"
      >
        {message?.contentType === EContentType.IMG_URL ? (
          //! change the layout of image
          //! the message.content will be the image Id
          //! the image Id will fetch to make a image data and make a url
          <img alt="Image" src="" />
        ) : (
          <p
            className={`break-words max-w-[100%] text-sm w-fit h-fit p-2 border rounded-lg ${
              user.userId === message?.senderId ? "bg-secondary/50" : ""
            }`}
          >
            {message?.content}
          </p>
        )}
        <span
          className={` text-[8px] opacity-50 flex absolute top-[108%] w-28 ${
            user.userId === message?.senderId
              ? "right-0 justify-end"
              : "left-0 justify-start"
          }`}
        >
          <DisplayDate date={message?.sendAt} />
        </span>
      </div>
    </li>
  );
}
