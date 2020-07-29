export interface UserInfo {
    id: number;
    email: string;
    username: string;
    profilePicture: string;
    nick: string;
    createTime: string;
    updateTime: string;
    token: string;
    refreshToken: string;
    avatarColor: string;
}

export interface RegisterUserRequestParams {
    email: string;
    username: string;
    password: string;
    profilePicture: string;
}

export interface LoginRequestParams {
    account: string;
    password: string;
}

export interface UpdateUserRequestParams extends RegisterUserRequestParams{
    id: number;
    oldPassword: string;
}

export interface NoticeInfo {
    sendId: number;
    recId: number;
    messageId: number;
    id: number;
    type: 10 | 20 | 30 | 40;
    title: string;
    sourceId: number;
    content: string;
    createDate: string;
    STATUS: number;
    profilePicture: string;
    sendName: string;
}
