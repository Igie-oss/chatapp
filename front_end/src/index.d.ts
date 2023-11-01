type TSocketRes = {
  error: string;
  data: any;
};
type TLogin = {
  email: string;
  password: string;
};
enum EStatus {
  IS_SUCCESS = "isSuccess",
  IS_LOADING = "isLoading",
  IS_ERROR = "isError",
}
type TFetching = {
  status: EStatus;
  message?: string;
};

type TUser = {
  id?: string;
  userId: string;
  userName: string;
  email: string;
};

type TMembers = {
  userId: string;
  userName: string;
};

type TChannel = {
  id?: string;
  channelId: string;
  isGroup: boolean;
  members: TMembers[];
  channelName: string;
};

type TMessages = {
  id?: string;
  messageId: string;
  channelId: string;
  senderId: string;
  sendAt: Date;
  content: string;
  contentType: "text" | "image";
};

type TChannelMessages = TMessages & {
  members: TMembers[];
  isGroup: boolean;
  channelName: string | null;
};
