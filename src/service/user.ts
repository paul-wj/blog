import Request, {FetchResponse} from '../lib/plugins/request';
import {LoginRequestParams, UserInfo, RegisterUserRequestParams, UpdateUserRequestParams, NoticeInfo} from "../types/user";

export const login = (data: LoginRequestParams): FetchResponse<UserInfo> => {
    return Request.fetch<UserInfo, LoginRequestParams>('/login', data, {method: "post"});
};

export const register = (data: RegisterUserRequestParams): FetchResponse<boolean> => {
    return Request.fetch<boolean, RegisterUserRequestParams>(`/user`, data, {method: 'post'})
};

export const updateUser = (id: number, data: UpdateUserRequestParams): FetchResponse<UserInfo> => {
    return Request.fetch<UserInfo, UpdateUserRequestParams>(`/user/${id}`, data, {method: 'patch'})
};

export const getUnreadMessageList = (): FetchResponse<NoticeInfo[]> => {
    return Request.fetch<NoticeInfo[]>(`/extra/message-un-read`, null, {method: 'get'})
};

export const readMessage = (data: {messageId: number}): FetchResponse<boolean> => {
    return Request.fetch<boolean, {messageId: number}>(`/extra/message-read`, data, {method: 'post'})
};

export const clearAllUnreadMessage = (data: {messageIdList: number[]}): FetchResponse<boolean> => {
    return Request.fetch<boolean, {messageIdList: number[]}>(`/extra/message-read-batch`, data, {method: 'post'})
};

