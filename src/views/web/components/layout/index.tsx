import React, {FC, ReactElement} from 'react';
import {renderRoutes, RouteConfig} from 'react-router-config';
import {useHistory} from "react-router";
import {Layout, Row, Col, BackTop} from 'antd';
import AppHeader from '../header';
import AppSider from '../sider';
import './index.scss';

interface AppLayoutProps {
    route: RouteConfig;
}

const {
    Header
} = Layout;

const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 };

const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 };

const noBorderPathList = ['/', '/dashboard'];

const AppLayout: FC<AppLayoutProps> = ({route}: AppLayoutProps): ReactElement => {

    const history = useHistory();

    const path = history.location.pathname;

    const isNoBorder = noBorderPathList.includes(path);

    return (
        <Layout className="app-container">
            <Header className="app-header">
                <AppHeader />
            </Header>
            <Layout className="app-wrapper">
                <Row className="app-content">
                    <Col className="h100" {...siderLayout}>
                        <AppSider />
                    </Col>
                    <Col className={`app-main  ${isNoBorder ? '' : 'app-main--border'}`} {...contentLayout}>
                        <article id="app-main-content" className="app-main-content">{renderRoutes(route.routes)}</article>
                    </Col>
                </Row>
            </Layout>
            <BackTop target={() => document.getElementById('app-main-content')} />
        </Layout>
    )
};

export default AppLayout;
