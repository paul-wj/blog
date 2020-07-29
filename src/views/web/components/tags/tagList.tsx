import React, {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {useHistory} from "react-router";
import {useMappedState} from "redux-react-hook";
import {Spin, Timeline, Pagination} from "antd";
import {getArticlePageListByCategoryId, getArticlePageListByTagId} from '../../../../service/article';
import {RequestPageBody} from "../../../../types/global";
import {ArticleInfo, CatalogInfo, TagInfo} from "../../../../types/article";
import {formatDate, firstLetterUppercase} from "../../../../lib/utils";
import './index.scss';

interface TagArticlePageListProps {
    id: string;
    type?: 'tag' | 'category';
}

const defaultLimit = 10;

const TagArticlePageList: FC<TagArticlePageListProps> = ({id, type}: TagArticlePageListProps): ReactElement => {

    const isTag = type === 'tag';

    const history = useHistory();

    const categoryListState = useCallback(state => ({
        categoryList: state.article.categoryList,
        tagList: state.article.tagList,
    }), ['article.categoryList', 'article.tagList']);

    const {categoryList, tagList} = useMappedState(categoryListState);

    const {name} = (isTag ? tagList : categoryList).find((item: TagInfo | CatalogInfo) => item.id === Number(id));

    const [loading, setLoading] = useState<boolean>(false);

    const [requestParams, setRequestParams] = useState<RequestPageBody>({limit: defaultLimit, offset: 0});

    const [simpleArticleList, setSimpleArticleList] = useState<ArticleInfo[]>([]);

    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const {flags, data} = isTag ? await getArticlePageListByTagId(id, requestParams) : await getArticlePageListByCategoryId(id, requestParams);
            if (flags === 'success') {
                const items = data?.items || [];
                setSimpleArticleList(items);
                setTotal(data?.total || 0);
            }
            setLoading(false);
        })();
    }, [requestParams, id]);

    const paginationChangeHandle = (page: number) => {
        setRequestParams({...requestParams, offset: (page - 1) * requestParams.limit});
    };

    const pagination = {
        current: (requestParams.offset / defaultLimit) + 1,
        onChange: paginationChangeHandle,
        pageSize: defaultLimit,
        total,
        hideOnSinglePage: true
    };

    return (
        <div className="tag-container">
            <Spin
              className="app-spin"
              tip="Loading..."
              spinning={loading}
              size="large"
            />
            <Timeline className="tag-container__content">
                <Timeline.Item>
                    <h1 className="tag-container__title">
                        {name}
                        <span>
                            {firstLetterUppercase(type)}
                        </span>
                    </h1>
                </Timeline.Item>
                <Timeline.Item>
                    <span className="tag-container__desc">{`The total number of articles is ${total}.`}</span>
                    <br />
                    <br />
                </Timeline.Item>
                {
                    simpleArticleList.map((article: ArticleInfo) => (
                        <Timeline.Item className="tag-container__item">
                            <div className="tag-container__info">
                                <span className="tag-container__time">{formatDate(article.createTime, 'MM-DD')}</span>
                                <span
                                  className="tag-container__name"
                                  onKeyDown={() => {history.push(`/article/${article.id}`)}}
                                  onClick={() => {history.push(`/article/${article.id}`)}}
                                  role="button"
                                  tabIndex={0}
                                >
                                    {article.title}
                                </span>
                            </div>
                        </Timeline.Item>
                    ))
                }
            </Timeline>
            <div className="tag-container__footer">
                <Pagination {...pagination} />
            </div>
        </div>
    )
};

TagArticlePageList.defaultProps = {
    type: 'tag'
};

export default TagArticlePageList;
