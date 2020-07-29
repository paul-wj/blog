import React, {FC, ReactElement, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Input} from 'antd';
import {useHistory} from 'react-router-dom';

const AppHeaderSearch: FC = (): ReactElement => {
    const [keyword, setKeyword] = useState<string>();

    const history = useHistory();

    const openArticleListPage = () => {
        history.push(keyword ? `?keyword=${keyword}` : '')
    };

    return (
        <div className="app-header__search">
            <SearchOutlined className="app-header__search-icon" />
            <Input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onBlur={openArticleListPage}
              onPressEnter={openArticleListPage}
              placeholder="搜索文章"
              className="app-header__input"
            />
        </div>
    )
};

export default AppHeaderSearch;
