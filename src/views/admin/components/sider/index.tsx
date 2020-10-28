import React, {FC, ReactElement, useCallback} from 'react';
import {useMappedState} from "redux-react-hook";
import {Layout} from 'antd';
import {WechatOutlined} from '@ant-design/icons';
import AdminMenu from '../menu';
import './index.scss';

const {Sider} = Layout;

const AdminSider: FC = (): ReactElement => {

    const AppState = useCallback(state => state.app, ['app']);

    const {collapsed} = useMappedState(AppState);

    return (
        <Sider
          className="admin-sider"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
            <div className={`admin-sider__desc ${collapsed ? 'admin-sider__desc--center' : ''}`}>
                <WechatOutlined className="admin-sider__logo" />
                {collapsed ? '' : '博客管理系统'}
            </div>
            <AdminMenu />
        </Sider>
    )
};

export default AdminSider;
