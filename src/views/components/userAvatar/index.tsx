import React, {FC, ReactElement} from "react";
import {Avatar} from "antd";
import {UserInfo} from "../../../types/user";

type UserAvatarProps =
    Pick<UserInfo, 'profilePicture' | 'username'>
    & { avatarColor?: string, size?: number | 'large' | 'small' | 'default' };

const UserAvatar: FC<UserAvatarProps> = ({profilePicture, username, avatarColor, size}: UserAvatarProps): ReactElement => {

    const style = {
        backgroundColor: avatarColor
    };

    return (
        <>
            {
                profilePicture ?
                    (
                        <Avatar
                          className="user-avatar"
                          size={size}
                          src={profilePicture}
                          alt={username}
                        />
                    ) :
                    (
                        <Avatar
                          className="user-avatar"
                          size={size}
                          style={style}
                          alt={username}
                        >
                            {username}
                        </Avatar>
                    )
            }
        </>
    )
};

UserAvatar.defaultProps = {
    avatarColor: '#48b2ff',
    size: "large"
};

export default UserAvatar;
