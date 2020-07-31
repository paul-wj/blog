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

export interface SongInfo {
    id: number;
    author: string;
    name: string;
    picUrl: string;
    url: string;
    lyric: string;
}

export interface AboutCommentReplyInfo {
    id: number;
    replyType: number;
    commentId: number;
    replyId: number;
    userId: number;
    sendId: number;
    content: string;
    type: number;
    createTime: string;
    commentContent: string;
    userName: string;
    userPic: string;
    toUserName: string;
    toUserPic: string;
}

export interface AboutCommentInfo {
    id: number;
    userId: number;
    content: string;
    createTime: string;
    userName: string;
    userPic: string;
    replyList: AboutCommentReplyInfo[];
}

export interface AboutCommentRequestBody {
    content: string;
}

export interface AboutCommentReplyRequestBody {
    sendId: number;
    commentId: number;
    content: string;
    replyId?: number;
    replyType?: 10 | 20;
}

