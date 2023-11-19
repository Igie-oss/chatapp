import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import ChannelListContainer from "./channelsComponents/ChannelListContainer";
import UserListContainer from "./userListComponents/UserListContainer";
import Navigation from "./Navigation";
import GroupChannelListContainer from "./groupChannelsComponents/GroupChannelListContainer";
export enum ENavigation {
  IS_CHANNEL_LIST = "is_channel_list",
  IS_USER_LIST = "is_user_list",
  IS_GROUP_LIST = "is_group_list",
}
export type TNavigation = {
  isShow: ENavigation;
};
export default function Aside() {
  const sideRef = useRef<HTMLElement | null>(null);
  const [navigate, setNavigate] = useState<TNavigation>({
    isShow: ENavigation.IS_CHANNEL_LIST,
  });
  const { channelId } = useParams();
  const toggleAside = () => {
    if (sideRef?.current?.classList.contains("-translate-x-full")) {
      sideRef.current.classList.remove("-translate-x-full");
    } else {
      sideRef?.current?.classList.add("-translate-x-full");
    }
  };

  useEffect(() => {
    toggleAside();
  }, [channelId]);

  return (
    <aside
      ref={sideRef}
      className="h-full w-full absolute left-0 top-0 z-40 gap-4  flex flex-col items-center p-2 bg-background  transition-all  lg:static lg:translate-x-0 lg:w-[50%] xl:max-w-[25rem]"
    >
      <Header />
      <Navigation navigate={navigate} setNavigate={setNavigate} />
      <main className="w-full h-[78%] relative">
        {navigate.isShow === ENavigation.IS_CHANNEL_LIST ? (
          <ChannelListContainer />
        ) : navigate.isShow === ENavigation.IS_USER_LIST ? (
          <UserListContainer />
        ) : navigate.isShow === ENavigation.IS_GROUP_LIST ? (
          <GroupChannelListContainer />
        ) : null}
      </main>
    </aside>
  );
}
