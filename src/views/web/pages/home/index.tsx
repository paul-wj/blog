import React, {ReactElement, useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router";
import {List, Space} from "antd";
import { MessageOutlined, EyeOutlined } from '@ant-design/icons';
import UserAvatar from '../../../components/userAvatar';
import AppTags from '../../components/tags';
import {ArticleInfo, ArticlePageListRequestBody} from "../../../../types/article";
import {getArticlePageList as fetchGetArticlePageList} from "../../../../service/article";
import {translateMarkdown, decodeQuery} from "../../../../lib/utils";
import './index.scss';

const defaultLimit = 6;

const Home = (): ReactElement => {

    const history = useHistory();

    const {search} = useLocation();

    const [requestParams, setRequestParams] = useState<ArticlePageListRequestBody>({limit: defaultLimit, offset: 0, title: null});

    const [loading, setLoading] = useState<boolean>(false);

    const [articleList, setArticleList] = useState<ArticleInfo[]>([]);

    const [total, setTotal] = useState<number>(0);

    const getArticlePageList = async () => {
        setLoading(true);
        const {flags, data} = await fetchGetArticlePageList(requestParams);
        if (flags === 'success') {
            const items = data?.items || [];
            setArticleList(() => {
                setLoading(false);
                return items.map((item: ArticleInfo) => ({...item, content: translateMarkdown(item.content)}))
            });
            setTotal(data?.total || 0);
        }
    };

    useEffect(() => {
        if (search) {
            const {keyword} = decodeQuery<{keyword: string}>(search);
            setRequestParams({limit: defaultLimit, offset: 0, title: keyword})
        } else {
            setRequestParams({limit: defaultLimit, offset: 0, title: null})
        }
    }, [search]);

    useEffect(() => {
        const container = document.querySelector('.ant-spin-nested-loading');
        container.scrollTop = 0;
        getArticlePageList();
    }, [requestParams]);

    const paginationChangeHandle = (page: number) => {
        setRequestParams({...requestParams, offset: (page - 1) * requestParams.limit});
    };

    const pagination = {
        onChange: paginationChangeHandle,
        pageSize: defaultLimit,
        total,
        hideOnSinglePage: true
    };

    const IconText = ({ icon, text } : {icon: any, text: string}) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const listItemClickHandle = (articleId: number) => {
        history.push(`/article/${articleId}`);
    };

    const renderItem = (item: ArticleInfo) => {
        return (
            <List.Item
              key={item.id}
              actions={[
                  <IconText icon={MessageOutlined} text={`${item.comments}`} key="list-vertical-message" />,
                  <IconText icon={EyeOutlined} text={`${item.viewCount}`} key="list-vertical-star-eye" />,
                  <AppTags list={item.tagIds} />,
                  <AppTags type="catalog" list={item.categories} />,
              ]}
              onClick={() => {listItemClickHandle(item.id)}}
            >
                <List.Item.Meta
                  title={item.title}
                />
                <>
                    {/* eslint-disable-next-line */}
                    <div className="home-container__desc description" dangerouslySetInnerHTML={{ __html: item.content }} />
                    <div className="home-container__info">
                        <UserAvatar
                          profilePicture={item.userProfilePicture}
                          username={item.username}
                          size="small"
                        />
                        <span className="home-container__name">
                            {item.username}
                        </span>
                        发布于
                        <span className="home-container__time">
                            {item.updateTime}
                        </span>
                    </div>
                </>
            </List.Item>
        )
    };

    return (
        <div className="home-container">
            <List
              className="home-container__content"
              itemLayout="vertical"
              size="large"
              loading={loading}
              pagination={pagination}
              dataSource={articleList}
              renderItem={renderItem}
            />
        </div>
    )
};

export default Home;
