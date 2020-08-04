import React, {FC, ReactElement, useCallback} from 'react';
import {useDispatch, useMappedState} from "redux-react-hook";
import {Layout} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {toggleCollapsed} from "../../../../store/app/actions";
import './index.scss';

const {Header} = Layout;

const AdminHeader: FC = (): ReactElement => {

    const collapsedState = useCallback(state => state.app.collapsed, ['app']);

    const collapsed = useMappedState(collapsedState);

    const dispatch = useDispatch();

    const collapsedButtonClickHandle = () => {
        dispatch(toggleCollapsed(!collapsed));
    };

    return (
        <Header className="admin-header">
            {
                collapsed ?
                    (
                        <MenuUnfoldOutlined
                          className="admin-header__collapsed"
                          onClick={collapsedButtonClickHandle}
                        />
                    ) :
                    (
                        <MenuFoldOutlined
                          className="admin-header__collapsed"
                          onClick={collapsedButtonClickHandle}
                        />
                    )
            }
        </Header>
    )
};

export default AdminHeader;
