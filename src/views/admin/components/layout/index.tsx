import React, {FC, ReactElement} from 'react';
import { Layout } from 'antd';
import {renderRoutes, RouteConfig} from "react-router-config";

const { Content } = Layout;

interface AdminLayoutProps {
    route: RouteConfig;
}

const AdminLayout: FC<AdminLayoutProps> = ({route}: AdminLayoutProps): ReactElement => {
    return (
        <Layout className="admin-container">
            <Layout>
                <Content>
                    123
                    {renderRoutes(route.routes)}
                </Content>
            </Layout>
        </Layout>
    )
};

export default AdminLayout;
