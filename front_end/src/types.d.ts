import { ENavigation, EStatus } from "@/enum";
declare global {
	type TLogin = {
		email: string;
		password: string;
	};
	type TFormStatus = {
		status: EStatus;
		message?: string;
	};

	type TUser = {
		id?: string;
		userId: string;
		userName: string;
		email: string;
		avatarId?: string;
	};

	type TMembers = {
		userId: string;
		userName: string;
		isAdmin: boolean;
	};

	type TChannel = {
		id?: string;
		channelId: string;
		isGroup: boolean;
		members: TMembers[];
		groupName: string;
	};

	type TMessages = {
		id?: string;
		messageId: string;
		channelId: string;
		senderId: string;
		sendAt: Date;
		content: string;
		contentType: EContent;
	};

	type TChannelMessages = TMessages & {
		members: TMembers[];
		isGroup: boolean;
		groupName: string | null;
	};

	type TAvatarData = {
		id?: string;
		avatarId: string;
		imgData: {
			data: {
				data: Byte;
				type: string;
			};
			mimetype: string;
		};
	};
	type TNavigation = {
		isShow: ENavigation;
	};

	type TRegisterResData = {
		otpId: string;
		userId: string;
		userName: string;
		email: string;
		password: string;
	};
}

export {};
