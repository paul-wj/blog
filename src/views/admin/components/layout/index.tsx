import React, {FC, ReactElement} from 'react';
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
    return (
        <Layout className="admin-container">
            <AdminSider />
            <Layout>
                <AdminHeader />
                <Content className="admin-container__content">
                    {renderRoutes(route.routes)}
                </Content>
            </Layout>
        </Layout>
    )
};

export default AdminLayout;
