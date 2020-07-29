import {RequestPageBody} from "./global";

export interface TagInfo {
    id: number;
    name: string;
    userId: number;
    updateTime: string;
    createTime: string;
    color: string;
    counts: number;
}

export interface CatalogInfo {
    id: number;
    name: string;
    userId: number;
    updateTime: string;
    createTime: string;
    counts: number;
}

export interface ArticleInfo {
    id: number;
    title: string;
    viewCount: number,
    tagIds: number[];
    categories: number[];
    content: string;
    userId: number;
    username: string;
    userProfilePicture: string;
    comments: number;
    updateTime: string;
    createTime: string
}

export interface ArticlePageListRequestBody extends RequestPageBody {
    title: string;
}

export interface CommentUserInfo {
    id: number;
    articleId: number;
    userId: number;
    content: string;
    createTime: string;
    userName: string;
    userProfilePicture: string;
}

export interface CommentReplyBaseInfo {
    id: number;
    replyWay: 10 | 20,  //回复方式（10: 回复他人评论， 20：回复别人的回复）
    replyId: number;
    commentId: number;
    userId: number;
    toUserId: number;
    content: string | null;
    type: 10 | 20 | 30,   //回复类型（10：点赞，20：踩,  30: 文字回复）
    createTime: string;
    userName: string;
    userProfilePicture: string;
    toUserName: string;
}

export interface CommentReplyInfo extends CommentReplyBaseInfo {
    isReply?: boolean;
    likes: number;
    dislikes: number;
}

export interface CommentInfo extends CommentUserInfo {
    reply: {
        likes: number;
        dislikes: number;
        replyList?: CommentReplyInfo[];
    }
}

export interface CreateArticleCommentReplyRequestBody {
    articleId?: string;
    commentId?: number;
    type: 10 | 20 | 30; // 10: 点赞 20: 踩 30：评论
    content?: string;
    replyWay: 10 | 20; // 10: 评论回复 20：评论回复回复
    toUserId: number;
    replyId?: number;
}
