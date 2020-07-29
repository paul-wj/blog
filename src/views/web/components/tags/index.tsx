import React, {FC, ReactElement, useCallback} from 'react';
import {useHistory} from "react-router";
import {useMappedState} from "redux-react-hook";
import {Tag} from "antd";
import {TagOutlined, FolderOutlined} from '@ant-design/icons';
import {CatalogInfo, TagInfo} from "../../../../types/article";

interface AppTagsProps {
    type?: 'tag' | 'catalog',
    list?: number[]
}

const tagStyle = {
    cursor: 'pointer'
};

const AppTags: FC<AppTagsProps> = ({type, list}: AppTagsProps): ReactElement => {

    const history = useHistory();

    const tagsConfigState = useCallback(state => ({
        tagList: state.article.tagList,
        categoryList: state.article.categoryList
    }), ['article.tagList', 'article.categoryList']);

    const tagsConfig = useMappedState(tagsConfigState);

    const isTag = type === 'tag';

    const currentTags = (isTag ? tagsConfig.tagList : tagsConfig.categoryList).filter((item: TagInfo | CatalogInfo) => list.includes(item.id));

    const tagClickHandle = (id: number) => {
        history.push(`${isTag ? 'tag' : 'category'}/${id}`);
    };

    return (
        <div className="app-tags dib">
            {isTag ? <TagOutlined /> : <FolderOutlined />}
            &nbsp;&nbsp;
            {
                currentTags.map((item: TagInfo) => (
                    <Tag
                      color={item?.color || '#2db7f5'}
                      key={`${type}_${item.id}`}
                      style={tagStyle}
                      onClick={() => {tagClickHandle(item.id)}}
                    >
                        {item.name}
                    </Tag>
                ))
            }
        </div>
    )
};

AppTags.defaultProps = {
    type: "tag",
    list: []
};

export default AppTags;
