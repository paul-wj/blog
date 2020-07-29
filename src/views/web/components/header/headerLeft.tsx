import React, {ReactElement} from 'react';
import {WechatOutlined} from '@ant-design/icons'
import HeaderLeftMenu from './headerLeftMenu';

const AppHeaderLeft = (): ReactElement => {
    return (
        <div className="app-header-left">
            <div className="app-header-left__content">
                <WechatOutlined className="app-header-left__logo" />
                <span className="app-header-left__title">汪小二的博客</span>
            </div>
            <HeaderLeftMenu />
        </div>
    )
};

export default AppHeaderLeft;
