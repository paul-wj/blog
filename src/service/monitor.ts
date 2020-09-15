import Request, {FetchResponse} from '../lib/plugins/request';
import {WebPerformanceRequestParams, WebPerformanceResourceRequestParams} from "../types/monitor";

export const createWebPerformance = (data: WebPerformanceRequestParams): FetchResponse<boolean> => {
    return Request.fetch<boolean, WebPerformanceRequestParams>('/monitor/web/performance', data, {method: 'post'});
};

export const createWebPerformanceResource = (data: WebPerformanceResourceRequestParams): FetchResponse<boolean> => {
    return Request.fetch<boolean, WebPerformanceResourceRequestParams>('/monitor/web/performance-resource', data, {method: 'post'});
};
