import React, {FC, ReactElement} from 'react';
import {useHistory} from "react-router";
import {renderRoutes, RouteConfig} from "react-router-config";
import { Layout } from 'antd';
import AdminSider from '../sider';
import AdminHeader from '../header';
import './index.scss';

const { Content } = Layout;

interface AdminLayoutProps {
    route: RouteConfig;
}

const AdminLayout: FC<AdminLayoutProps> = ({route}: AdminLayoutProps): ReactElement => {

    const history = useHistory();

    const path = history.location.pathname;

    return (
        <Layout className="admin-container">
            <AdminSider />
            <Layout>
                <AdminHeader />
                <Content className={`admin-container__content ${path === '/admin' ? 'admin-container__content--no-padding' : ''}`}>
                    {renderRoutes(route.routes)}
                </Content>
            </Layout>
        </Layout>
    )
};

export default AdminLayout;
