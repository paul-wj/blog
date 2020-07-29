import React, {ReactElement} from 'react';
import {Row, Col} from 'antd';
import AppHeaderLeft from './headerLeft';
import AppHeaderRight from './headerRight';
import './index.scss';

const headerLeftResponsive = {xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24};
const headerRightResponsive = {xxl: 20, xl: 19, lg: 19, sm: 20, xs: 0};

const AppHeader = (): ReactElement => {
    return (
        <Row className="app-header">
            <Col {...headerLeftResponsive}><AppHeaderLeft /></Col>
            <Col {...headerRightResponsive}><AppHeaderRight /></Col>
        </Row>
    )
};

export default AppHeader;
