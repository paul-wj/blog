import React, {FC, ReactElement} from 'react';
import {useHistory} from "react-router";
import {renderRoutes, RouteConfig} from "react-router-config";
import {Layout, Row, Col} from 'antd';
import AdminSider from '../sider';
import AdminHeader from '../header';
import './index.scss';

const { Content } = Layout;

interface AdminLayoutProps {
    route: RouteConfig;
}

const simpleLayoutPathList = ['/admin/monitor/performance'];

const siderLayout = { xxl: 24, xl: 24, lg: 24, sm: 24, xs: 0 };

const AdminLayout: FC<AdminLayoutProps> = ({route}: AdminLayoutProps): ReactElement => {

    const history = useHistory();

    const path = history.location.pathname;

    const isSimpleLayout = simpleLayoutPathList.includes(path);

    return (
        <Layout className="admin-container">
            <Row>
                <Col {...siderLayout}>
                    <AdminSider />
                </Col>
            </Row>
            <Layout>
                <AdminHeader />
                <Content className={`admin-container-content ${isSimpleLayout ? 'admin-container-content--simple' : ''} ${path === '/admin' ? 'admin-container-content--no-padding' : ''}`}>
                    {renderRoutes(route.routes)}
                </Content>
            </Layout>
        </Layout>
    )
};

export default AdminLayout;
