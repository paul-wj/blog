import React, {FC, ReactElement, useEffect, useLayoutEffect, useState} from 'react';
import {Row, Col, Card, Tooltip} from "antd";
import {InfoCircleOutlined, CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons';
import {
    getStatisticsForArticle as fetchGetStatisticsForArticle,
    getStatisticsForComment as fetchGetStatisticsForComment,
    getStatisticsForReply as fetchGetStatisticsForReply,
} from "../../../../service/statistics";
import './index.scss';
import {StatisticsInfo} from "../../../../types/statistics";

interface VisitStatistics {
    visitCounts: string;
    visitPersons: string;
}

const gridOptions = {
    xs: {span: 24},
    sm: {span: 24},
    md: {span: 12},
    lg: {span: 12},
    xl: {span: 6}
};

const defaultStatistics = {
    total: 0,
    dayTotal: 0,
    weekTotal: 0,
    weekRingRatio: 0,
    dayRingRatio: 0
};

const defaultVisitStatistics = {
    visitCounts: '0',
    visitPersons: '0'
};

const Dashboard: FC = (): ReactElement => {

    const [visitStatistics, setVisitStatistics] = useState<VisitStatistics>(defaultVisitStatistics);

    const [articleStatistics, setArticleStatistics] = useState<StatisticsInfo>(defaultStatistics);

    const [commentStatistics, setCommentStatistics] = useState<StatisticsInfo>(defaultStatistics);

    const [replyStatistics, setReplyStatistics] = useState<StatisticsInfo>(defaultStatistics);

    const getStatisticsForArticle = async () => {
        const {flags, data} = await fetchGetStatisticsForArticle();
        if (flags === 'success') {
            setArticleStatistics(data);
        }
    };

    const getStatisticsForComment = async () => {
        const {flags, data} = await fetchGetStatisticsForComment();
        if (flags === 'success') {
            setCommentStatistics(data);
        }
    };

    const getStatisticsForReply = async () => {
        const {flags, data} = await fetchGetStatisticsForReply();
        if (flags === 'success') {
            setReplyStatistics(data);
        }
    };

    const getStatisticsForWebsiteVisits = () => {
        let visitCounts = '0';
        let visitPersons = '0';
        const visitCountDom = document.getElementById("busuanzi_container_site_pv");
        const visitPersonDom = document.getElementById("busuanzi_container_site_uv");
        // chrome对于hidden元素innerText无效
        if (visitCountDom.style.display !== 'none') {
            visitCounts = document.querySelector('#busuanzi_value_site_pv').textContent || '0';
        }
        if (visitPersonDom.style.display !== 'none') {
            visitPersons = document.querySelector('#busuanzi_value_site_uv').textContent || '0';
        }
        setVisitStatistics({
            visitCounts,
            visitPersons
        })
    };

    useLayoutEffect(() => {
        const timer = setTimeout(() => {
            getStatisticsForWebsiteVisits();
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        getStatisticsForArticle();
        getStatisticsForComment();
        getStatisticsForReply();
    }, []);

    return (
        <Row
          className="dashboard-container"
        >
            <Col
              className="dashboard-container__col"
              {...gridOptions}
            >
                <Card className="dashboard-container__card">
                    <div className="dashboard-card__top">
                        <div className="dashboard-card__title">
                            网站访问量
                            <Tooltip placement="top" title="网站访问量">
                                <InfoCircleOutlined className="fr" />
                            </Tooltip>
                        </div>
                        <div className="dashboard-card__total">{visitStatistics.visitCounts}</div>
                    </div>
                    <div className="dashboard-card__content">
                        <div className="dashboard-card__fixed">
                            <div className="dib">
                                总访问量：
                                <span>
                                    {visitStatistics.visitCounts}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-card__footer">
                        <div className="dib">
                            总访客数：
                            <span>
                                {visitStatistics.visitPersons}
                            </span>
                        </div>
                    </div>
                </Card>
            </Col>
            <Col
              className="dashboard-container__col"
              {...gridOptions}
            >
                <Card className="dashboard-container__card">
                    <div className="dashboard-card__top">
                        <div className="dashboard-card__title">
                            文章数量
                            <Tooltip placement="top" title="文章统计数据">
                                <InfoCircleOutlined className="fr" />
                            </Tooltip>
                        </div>
                        <div className="dashboard-card__total">{articleStatistics.total}</div>
                    </div>
                    <div className="dashboard-card__content">
                        <div className="dashboard-card__fixed">
                            <div className="dib">
                                周同比
                                <span>
                                    {articleStatistics.weekRingRatio * 100}
                                    ％
                                </span>
                                {articleStatistics.weekRingRatio > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                            </div>
                            <div className="dib">
                                日同比
                                <span>
                                    {articleStatistics.dayRingRatio * 100}
                                    ％
                                </span>
                                {articleStatistics.dayRingRatio > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-card__footer">
                        <span>日文章数</span>
                        {articleStatistics.dayTotal}
                    </div>
                </Card>
            </Col>
            <Col
              className="dashboard-container__col"
              {...gridOptions}
            >
                <Card className="dashboard-container__card">
                    <div className="dashboard-card__top">
                        <div className="dashboard-card__title">
                            评论数量
                            <Tooltip placement="top" title="评论统计数据">
                                <InfoCircleOutlined className="fr" />
                            </Tooltip>
                        </div>
                        <div className="dashboard-card__total">{commentStatistics.total}</div>
                    </div>
                    <div className="dashboard-card__content">
                        <div className="dashboard-card__fixed">
                            <div className="dib">
                                周同比
                                <span>
                                    {commentStatistics.weekRingRatio * 100}
                                    ％
                                </span>
                                {commentStatistics.weekRingRatio > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                            </div>
                            <div className="dib">
                                日同比
                                <span>
                                    {commentStatistics.dayRingRatio * 100}
                                    ％
                                </span>
                                {commentStatistics.dayRingRatio > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-card__footer">
                        <span>日评论数</span>
                        {commentStatistics.dayTotal}
                    </div>
                </Card>
            </Col>
            <Col
              className="dashboard-container__col"
              {...gridOptions}
            >
                <Card className="dashboard-container__card">
                    <div className="dashboard-card__top">
                        <div className="dashboard-card__title">
                            评论回复数量
                            <Tooltip placement="top" title="评论回复统计数据">
                                <InfoCircleOutlined className="fr" />
                            </Tooltip>
                        </div>
                        <div className="dashboard-card__total">{replyStatistics.total}</div>
                    </div>
                    <div className="dashboard-card__content">
                        <div className="dashboard-card__fixed">
                            <div className="dib">
                                周同比
                                <span>
                                    {replyStatistics.weekRingRatio * 100}
                                    ％
                                </span>
                                {replyStatistics.weekRingRatio > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                            </div>
                            <div className="dib">
                                日同比
                                <span>
                                    {replyStatistics.dayRingRatio * 100}
                                    ％
                                </span>
                                {replyStatistics.dayRingRatio > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-card__footer">
                        <span>日评论回复数</span>
                        {replyStatistics.dayRingRatio}
                    </div>
                </Card>
            </Col>
        </Row>
    )
};

export default Dashboard;
