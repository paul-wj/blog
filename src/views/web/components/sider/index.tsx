import React, {ReactElement} from 'react';
import AppSiderUser from './siderUser';
import AppSiderStatistics from './siderStatistics';
import AppSiderArticle from './siderArticle'
import AppSiderTag from './siderTag'
import './index.scss';

const AppSider = (): ReactElement => {
    return (
        <div className="app-sider">
            <AppSiderUser />
            <AppSiderStatistics />
            <AppSiderArticle />
            <AppSiderTag />
        </div>
    )
};

export default AppSider;
