import React, {FC, ReactElement, useCallback, memo} from 'react';
import {useMappedState} from "redux-react-hook";
import HeaderUserButtonGroup from './headerUserButtonGroup';
import HeaderUserModal from './headerUserModal';
import HeaderUserNotice from './headerUserNotice';
import HeaderUserInfo from './headerUserInfo';

const MemoHeaderUserModal = memo(HeaderUserModal);

const MemoHeaderUserButtonGroup = memo(HeaderUserButtonGroup);

const MemoHeaderUserInfo = memo(HeaderUserInfo);

const AppHeaderUser: FC = (): ReactElement => {

    const userState = useCallback(state => state.user, ['user']);

    const {isLogin, userModalVisible, userModalType, userInfo} = useMappedState(userState);

    return (
        <div className="app-header__user">
            <MemoHeaderUserModal
              userInfo={userInfo}
              userModalVisible={userModalVisible}
              userModalType={userModalType}
            />
            {
                isLogin ?
                    (
                        <>
                            <HeaderUserNotice userId={userInfo.id} />
                            <MemoHeaderUserInfo userInfo={userInfo} />
                        </>
                    ) :
                        <MemoHeaderUserButtonGroup />
            }
        </div>
    )
};

export default AppHeaderUser;
