import {Dispatch} from 'redux';
import {message} from 'antd'
import {UserTypeEnum} from '../types';
import {
    LoginRequestParams,
    UserInfo,
    RegisterUserRequestParams,
    UpdateUserRequestParams,
    NoticeInfo
} from "../../types/user";
import {login as fetchLogin, register as fetchRegister, updateUser as fetchUpdateUser, getUnreadMessageList as fetchGetUnreadMessageList} from "../../service/user";
import {REFRESH_TOKEN_KEY, TOKEN_KEY} from "../../conf";
import {UserModalType} from "./reducer";
import {getRandomColor} from "../../lib/utils";

export const login = (params: LoginRequestParams) => {
    return async (dispatch: Dispatch): Promise<UserInfo> => {
        const {flags, data} = await fetchLogin(params);
        if (flags === 'success') {
            message.success('登录成功');
            localStorage.setItem(TOKEN_KEY, data.token);
            localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
            dispatch({type: UserTypeEnum.USER_SET_IS_LOGIN, payload: {isLogin: true}});
            dispatch({type: UserTypeEnum.USER_GET_USER_INFO, payload: {userInfo: {...data, avatarColor: getRandomColor()}}});
        }
        return data;
    }
};

export const loginOut = (isInitiative = false) => {
    return (dispatch: Dispatch): void => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        dispatch({type: UserTypeEnum.USER_SET_IS_LOGIN, payload: {isLogin: false}});
        dispatch({type: UserTypeEnum.USER_GET_USER_INFO, payload: {userInfo: {}}});
        if (isInitiative) {
            message.success('退出成功');
        }
    }
};

export const register = async (params: RegisterUserRequestParams): Promise<boolean> => {
    const {flags} = await fetchRegister(params);
    if (flags === 'success') {
        message.success('注册成功');
    }
    return flags === 'success';
};

export const updateUser = (id: number, params: UpdateUserRequestParams) => {
    return async (dispatch: Dispatch): Promise<UserInfo> => {
        const {flags, data} = await fetchUpdateUser(id, params);
        if (flags === 'success') {
            message.success('修改成功');
            dispatch({type: UserTypeEnum.USER_GET_USER_INFO, payload: {userInfo: {...data, avatarColor: getRandomColor()}}});
        }
        return data;
    }
};

export const openUserModal = (type: UserModalType) => {
    return (dispatch: Dispatch): void => {
        dispatch({type: UserTypeEnum.USER_SET_MODAL_TYPE, payload: {userModalType: type}});
        dispatch({type: UserTypeEnum.USER_SET_MODAL_VISIBLE, payload: {userModalVisible: true}})
    }
};

export const closeUserModal = () => {
    return (dispatch: Dispatch): void => {
        dispatch({type: UserTypeEnum.USER_SET_MODAL_TYPE, payload: {userModalType: 'login'}});
        dispatch({type: UserTypeEnum.USER_SET_MODAL_VISIBLE, payload: {userModalVisible: false}})
    }
};

export const getUnreadMessageList = () => {
    return async (dispatch: Dispatch): Promise<NoticeInfo[]> => {
        const {flags, data} = await fetchGetUnreadMessageList();
        let result: NoticeInfo[] = [];
        if (flags === 'success') {
            result = data && data.length ? data : [];
            dispatch({type: UserTypeEnum.USER_GET_UN_READ_MESSAGE_LIST, payload: {unreadMessageList: result}});
        }
        return result;
    }
};
