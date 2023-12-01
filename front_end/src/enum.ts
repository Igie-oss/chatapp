enum ENavigation {
	IS_CHANNEL_LIST = "is_channel_list",
	IS_USER_LIST = "is_user_list",
	IS_GROUP_LIST = "is_group_list",
}
enum EStatus {
	IS_SUCCESS = "isSuccess",
	IS_LOADING = "isLoading",
	IS_ERROR = "isError",
}
enum EContentType {
	TEXT = "text",
	IMG_URL = "image_url",
}
enum EInview {
	IS_OPTIONS = "is_options",
	IS_GROUP_MEMBER_LIST = "is_group_member_list",
}

export { ENavigation, EContentType, EStatus, EInview };
