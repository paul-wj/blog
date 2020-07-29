import Request, {FetchResponse} from '../lib/plugins/request';
import {StatisticsInfo} from "../types/statistics";

export const getStatisticsForArticle = (): FetchResponse<StatisticsInfo> => {
    return Request.fetch<StatisticsInfo>('/extra/statistics/article');
};

export const getStatisticsForComment = (): FetchResponse<StatisticsInfo> => {
    return Request.fetch<StatisticsInfo>('/extra/statistics/comment');
};

export const getStatisticsForReply= (): FetchResponse<StatisticsInfo> => {
    return Request.fetch<StatisticsInfo>('/extra/statistics/reply');
};
