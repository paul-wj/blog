import React, {FC, ReactElement, useCallback} from 'react';
import {useMappedState} from "redux-react-hook";
import {useHistory} from "react-router";
import {Card, Tag} from "antd";
import {TagInfo} from "../../../../types/article";

const AppSiderTag: FC = (): ReactElement => {

    const tagListState = useCallback(state => state.article.tagList, ['article.tagList']);

    const tagList = useMappedState(tagListState);

    const history = useHistory();

    return (
        <Card title="标签" className="app-sider-tag">
            {tagList.map((tag: TagInfo) => <Tag onClick={() => {history.push(`/tag/${tag.id}`)}} key={tag.id} color={tag.color}>{tag.name}</Tag>)}
        </Card>
    )
};

export default AppSiderTag;
