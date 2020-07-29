import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useHistory} from "react-router";
import {Spin, Timeline, Pagination} from "antd";
import {ClockCircleOutlined} from '@ant-design/icons';
import {getArticleSimplePageList} from '../../../../service/article';
import {RequestPageBody} from "../../../../types/global";
import {ArticleInfo} from "../../../../types/article";
import {formatDate} from "../../../../lib/utils";
import './index.scss';

const defaultLimit = 10;

const Archives: FC = (): ReactElement => {

    const history = useHistory();

    const [loading, setLoading] = useState<boolean>(false);

    const [requestParams, setRequestParams] = useState<RequestPageBody>({limit: defaultLimit, offset: 0});

    const [simpleArticleList, setSimpleArticleList] = useState<ArticleInfo[]>([]);

    const [lastCreateTime, setLastCreateTime] = useState<string>('');

    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const {flags, data} = await getArticleSimplePageList(requestParams);
            if (flags === 'success') {
                const items = data?.items || [];
                if (items.length) {
                    setLastCreateTime(items[0].createTime.slice(0, 4));
                }
                setSimpleArticleList(items);
                setTotal(data?.total || 0);
            }
            setLoading(false);
        })();
    }, [requestParams]);

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
        <div className="archives-container">
            <Spin
              className="app-spin"
              tip="Loading..."
              spinning={loading}
              size="large"
            />
            <Timeline className="archives-container__content">
                <Timeline.Item>
                    <span className="archives-container__desc">{`The total number of articles is ${total}.`}</span>
                    <br />
                    <br />
                </Timeline.Item>
                <Timeline.Item dot={<ClockCircleOutlined />} color="red">
                    <div className="year">
                        {lastCreateTime}
                        ...
                    </div>
                    <br />
                </Timeline.Item>
                {
                    simpleArticleList.map((article: ArticleInfo) => (
                        <Timeline.Item className="archives-container__item">
                            <div className="archives-container__info">
                                <span className="archives-container__time">{formatDate(article.createTime, 'MM-DD')}</span>
                                <span
                                  className="archives-container__title"
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
            <div className="archives-container__footer">
                <Pagination {...pagination} />
            </div>
        </div>
    )
};

export default Archives;
