import React, {ReactElement} from 'react';
import {Empty} from 'antd';

const AppNotFound = (): ReactElement => {
    return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Page Not Found"
        />
    )
};

export default AppNotFound;
