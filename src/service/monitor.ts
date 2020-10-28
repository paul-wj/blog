import Request, {FetchResponse} from '../lib/plugins/request';
import {
    WebPerformanceRequestParams,
    WebPerformanceResourceRequestParams,
    WebPageErrorRequestParams,
    WebPerformanceResponse
} from "../types/monitor";

export const createWebPerformance = (data: WebPerformanceRequestParams): FetchResponse<boolean> => {
    return Request.fetch<boolean, WebPerformanceRequestParams>('/monitor/web/performance', data, {method: 'post'});
};

export const createWebPerformanceResource = (data: WebPerformanceResourceRequestParams): FetchResponse<boolean> => {
    return Request.fetch<boolean, WebPerformanceResourceRequestParams>('/monitor/web/performance-resource', data, {method: 'post'});
};

export const createWebPageError = (data: WebPageErrorRequestParams): FetchResponse<boolean> => {
    return Request.fetch<boolean, WebPageErrorRequestParams>('/monitor/web/error', data, {method: 'post'});
};

export const createWebPageResourceError = (data: {href: string, src: string}): FetchResponse<boolean> => {
    return Request.fetch<boolean, {href: string, src: string}>('/monitor/web/error-resource', data, {method: 'post'});
};

export const getWebPagePerformanceList = (params?: {startTime: string, endTime: string}): FetchResponse<WebPerformanceResponse[]> => {
    return Request.fetch<WebPerformanceResponse[], {startTime: string, endTime: string}>('/monitor/web/performance', params, {method: 'get'});
};
