import React, {FC, ReactElement, useCallback} from 'react';
import {useMappedState} from "redux-react-hook";
import UserAvatar from '../../../web/components/userAvatar';
import './index.scss';


const AdminHome: FC = (): ReactElement => {

    const userState = useCallback(state => ({userInfo: state.user.userInfo}), ['user']);

    const {userInfo} = useMappedState(userState);

    return (
        <div className="admin-home">
            <div className="admin-home__info">
                <p className="admin-home__title">WELCOME</p>
                <p className="admin-home__desc">欢迎进入后台系统</p>
                <UserAvatar
                  profilePicture={userInfo.profilePicture}
                  username={userInfo.username}
                  avatarColor={userInfo.avatarColor}
                  size={150}
                />
                <p className="admin-home__name">{userInfo.username}</p>
                <p className="admin-home__saying">实践是检验真理的唯一标准</p>
            </div>
        </div>
    )
};

export default AdminHome;
