import React, {ReactElement, useEffect, useState} from "react";
import {useParams} from "react-router";
import {Divider} from 'antd';
import { MessageOutlined, EyeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import AppTags from "../../components/tags";
import ArticleComment from './articleComment';
import {ArticleInfo} from "../../../../types/article";
import {getArticleById} from "../../../../service/article";
import {translateMarkdown} from "../../../../lib/utils";
import './index.scss';

const Article = (): ReactElement => {

    const params = useParams<{id: string}>();

    const [articleDetail, setArticleDetail] = useState<ArticleInfo>({
        id: null,
        title: '',
        viewCount: 0,
        tagIds: [],
        categories: [],
        content: '',
        userId: null,
        username: '',
        userProfilePicture: '',
        comments: 0,
        updateTime: '',
        createTime: '',
    });

    useEffect(() => {
        (async () => {
            const {flags, data} = await getArticleById(params.id);
            if (flags === 'success') {
                data.content = translateMarkdown(data.content);
                setArticleDetail(data);
            }
        })();
    }, [params.id]);

    return (
        <div className="article-detail">
            <div className="article-detail__top">
                <h3 className="article-detail__title">{articleDetail.title}</h3>
                <div className="article-detail__info">
                    <ClockCircleOutlined />
                    <span>{articleDetail.updateTime}</span>
                    <Divider type="vertical" />
                    <AppTags list={articleDetail.tagIds} />
                    <Divider type="vertical" />
                    <AppTags type="catalog" list={articleDetail.categories} />
                    <Divider type="vertical" />
                    <MessageOutlined />
                    <span>{articleDetail.comments}</span>
                    <Divider type="vertical" />
                    <EyeOutlined />
                    <span>{articleDetail.viewCount}</span>
                </div>
            </div>
            {/* eslint-disable-next-line */}
            <div className="article-detail__content description" dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
            <div className="article-detail__bottom">
                <ArticleComment id={params.id} />
            </div>
        </div>
    )
};

export default Article;
