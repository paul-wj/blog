import React, {FC, ReactElement} from "react";
import {useDispatch} from "redux-react-hook";
import {Dropdown, Menu} from "antd";
import UserAvatar from '../userAvatar';
import {openUserModal, loginOut} from "../../../../store/user/actions";
import {UserInfo} from "../../../../types/user";

interface UserInfoProps {
    userInfo: UserInfo
}

const HeaderUserInfo: FC<UserInfoProps> = (props: UserInfoProps): ReactElement => {

    const {userInfo: {profilePicture, username, avatarColor}} = props;

    const dispatch = useDispatch();

    const DropDownMenu = () => {
        return (
            <Menu>
                <Menu.Item>
                    <span
                      className="menu-item-btn"
                      onClick={() => {
                          dispatch(openUserModal('edit'))
                      }}
                      onKeyDown={() => {
                          dispatch(openUserModal('edit'))
                      }}
                      role="button"
                      tabIndex={0}
                    >
                        修改账户信息
                    </span>
                </Menu.Item>
                <Menu.Item>
                    <span
                      className="menu-item-btn"
                      onClick={() => {
                          dispatch(loginOut(true))
                      }}
                      onKeyDown={() => {
                          dispatch(loginOut(true))
                      }}
                      role="button"
                      tabIndex={0}
                    >
                        退出登录
                    </span>
                </Menu.Item>
            </Menu>
        )
    };

    return (
        <div className="app-header__info">
            <Dropdown placement="bottomCenter" overlay={DropDownMenu} trigger={['click', 'hover']}>
                <div>
                    <UserAvatar
                      profilePicture={profilePicture}
                      username={username}
                      avatarColor={avatarColor}
                      size="large"
                    />
                </div>
            </Dropdown>
        </div>
    )
};

export default HeaderUserInfo;
