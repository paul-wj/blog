import {UserTypeEnum} from '../types';
import {IReduxAction} from '../../types/global';
import {NoticeInfo, UserInfo} from "../../types/user";

export type UserModalType = 'login' | 'register' | 'edit';

export interface UserState {
    isLogin: boolean;
    userInfo: UserInfo;
    userModalVisible: boolean;
    userModalType: UserModalType;
    unreadMessageList: NoticeInfo[]
}

/**
 * state
 */
const defaultState: UserState = {
    isLogin: false,
    userInfo: {
        id: null,
        email: '',
        username: '',
        profilePicture: '',
        nick: '',
        createTime: '',
        updateTime: '',
        token: '',
        refreshToken: '',
        avatarColor: ''
    },
    userModalVisible: false,
    userModalType: 'login',
    unreadMessageList: []
};

/**
 * article Reducer
 */
export default function articleReducer(state = defaultState, action: IReduxAction<UserState>): UserState {
    const { type, payload } = action;
    return Object.keys(UserTypeEnum).includes(type) ? { ...state, ...payload } : state;
}
