import React, {ReactElement} from 'react';
import {Empty} from 'antd';
import {createFromIconfontCN} from '@ant-design/icons';
import {ICON_FONT_URL} from "../../../conf";
import './index.scss';

const MyIcon = createFromIconfontCN({
    scriptUrl: ICON_FONT_URL
});

const AppNotFound = (): ReactElement => {
    return (
        <Empty
          className="empty-container"
          image={<MyIcon type="icon-yepian" style={{fontSize: '200px'}} />}
          description="Page Not Found"
        />
    )
};

export default AppNotFound;
