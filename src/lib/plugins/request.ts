/**
 **@Description: 网络请求Request类
 **@Author: Paul Wang
 **@Date: 2020/7/16
 */
import http from 'http'
import https from 'https'
import axios, {AxiosResponse, AxiosRequestConfig, CancelTokenStatic, Canceler, AxiosInstance, AxiosError} from 'axios';
import {message as antdMessage} from 'antd';
import {IAnyData, PageListResponse} from "../../types/global";
import {TOKEN_KEY, REFRESH_TOKEN_KEY, BASE_URL, IS_PROD} from "../../conf";
import {clearUserInfo} from "../utils";

interface PendingConfig {
    url: string;
    cancel: Canceler;
}

interface AsyncHttpResponse<T> {
    code: number;
    message: string;
    result: T;
}

interface HttpResponse<T = null> {
    flags: 'success' | 'fail';
    message: string;
    data?: T;
}

export type FetchResponse<T> = Promise<HttpResponse<T>> | Promise<HttpResponse>;

export type FetchPageListResponse<T> = FetchResponse<PageListResponse<T>>;

class HttpRequest {
    protected baseUrl = BASE_URL;

    protected service: AxiosInstance;

    protected config: AxiosRequestConfig = {};

    protected pendingList: PendingConfig[] = [];

    protected static successCodeList: number[] = [0, 404];

    protected static expiredCodeList: number[] = [401, 403];

    protected static errResponse: HttpResponse = {flags: "fail", message: '网络错误'};

    private static CancelToken: CancelTokenStatic = axios.CancelToken;

    private static instance: HttpRequest;

    constructor() {
        this.setDefaultConfig();
        this.service = axios.create(this.config);
        this.interceptorsRequest();
        this.interceptorsResponse();
    }

    static getInstance(): HttpRequest {
        // 如果 instance 是一个实例 直接返回，  如果不是 实例化后返回
        if (!HttpRequest.instance) {
            HttpRequest.instance = new HttpRequest()
        }
        return HttpRequest.instance
    }

    /**
     * 设置header Authorization
     * @param config
     */
    protected static setRequestAuthorizationHeader(config: AxiosRequestConfig): void {

        /* eslint-disable */
        config.headers[TOKEN_KEY] = window.localStorage.getItem(TOKEN_KEY) || '';
        config.headers['refresh-token'] = window.localStorage.getItem(REFRESH_TOKEN_KEY) || '';
        // @ts-ignore
        config.headers['cip'] = window.returnCitySN ? window.returnCitySN.cip : '';
        /* eslint-disable */
    }

    /**
     * 更新Authorization
     * @param response
     */
    protected static getResponseAuthorizationHeader(response: AxiosResponse): void {
        const authorization = response.headers?.authorization;
        if (authorization) {
            localStorage.setItem(TOKEN_KEY, authorization);
        }
    }

    /**
     * 生成取消函数url
     * @param config
     */
    protected static createCancelUrl(config: AxiosRequestConfig): string {
        const {method, url, data, params} = config;
        return `${url}/&method=${method}&params=${JSON.stringify(params)}&data=${JSON.stringify(data)}`;
    }

    /**
     * 格式化成功信息
     * @param response
     */
    protected static formatterSuccessResponse<T>(response: AxiosResponse<AsyncHttpResponse<T>>): HttpResponse<T> {
        const {data} = response;
        const {successCodeList, expiredCodeList, errResponse} = HttpRequest;
        if (!data) {
            antdMessage.error(errResponse.message);
            return errResponse
        }
        let formatterResponse = {} as HttpResponse<T>;
        const {code, message, result} = data;
        if (successCodeList.includes(code)) {
            formatterResponse = {flags: "success", message, data: result};
        } else if (expiredCodeList.includes(code) || (code === 400 && message === '用户未登录')){
            // 登录信息已过期，清除缓存用户信息
            clearUserInfo();
            formatterResponse = {flags: "fail", message: '登录信息已过期,请重新登录'};
        } else {
            formatterResponse = {flags: "fail", message};
        }
        if (formatterResponse.flags === 'fail') {
            antdMessage.error(formatterResponse.message);
        }
        return formatterResponse;
    }

    /**
     * 格式化错误信息
     * @param err
     */
    protected static formatterErrorResponse(err: AxiosError): HttpResponse {
        // @ts-ignore
        if (err.__CANCEL__) {
            return {flags: 'fail', message: '请勿重复请求'}
        }
        const {response, message}= err;
        if (!response) {
            antdMessage.error(message);
            return {flags: 'fail', message}
        }
        const {errResponse} = HttpRequest;
        if (![401, 422].includes(response.status)) {
            antdMessage.error(errResponse.message);
            return errResponse;
        }
        const responseErrorMessage = response?.data?.message;
        antdMessage.error(responseErrorMessage);
        return {flags: 'fail', message: responseErrorMessage}
    }

    /**
     * 返回log展示
     * @param response
     */
    protected static responseLog(response: AxiosResponse): void {
        const {config, data} = response;
        const {method, url, data: requestData, params} = config;
        if (!IS_PROD) {
            const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
                Math.random() * 255
            )},${Math.round(Math.random() * 255)})`;
            /* eslint-disable */
            console.log(
                '%c┍------------------------------------------------------------------┑',
                `color:${randomColor};`
            );
            console.log('| 请求地址：', url);
            console.log('| 请求类型：', method);
            console.log('| 请求params：', params);
            console.log('| 请求data：', requestData);
            console.log('| 返回数据：', data);
            console.log(
                '%c┕------------------------------------------------------------------┙',
                `color:${randomColor};`
            )
            /* eslint-disable */
        }
    }

    /**
     * 设置axios默认参数
     */
    protected setDefaultConfig(): void {
        this.config = {
            baseURL: this.baseUrl,
            headers: {
                timestamp: new Date().getTime(),
            },
            method: 'get',
            timeout: 30000,
            httpAgent: new http.Agent({ keepAlive: true }),
            httpsAgent: new https.Agent({ keepAlive: true })
        }
    }

    /**
     * axios请求拦截
     */
    protected interceptorsRequest(): void {
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                HttpRequest.setRequestAuthorizationHeader(config);
                this.removePending(config);
                // 用户无自定义cancelToken时才可添加
                if (!config.cancelToken) {
                    this.addPending(config);
                }
                return config
            },
            (error: any) => Promise.reject(error)
        );
    }

    /**
     * axios返回拦截
     */
    protected interceptorsResponse(): void {
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                HttpRequest.getResponseAuthorizationHeader(response);
                HttpRequest.responseLog(response);
                this.removePending(response.config);
                return response;
            },
            (error: any) => Promise.reject(error)
        );
    }

    /**
     * 添加cancel
     */
    protected addPending(config: AxiosRequestConfig): void {
        // eslint-disable-next-line
        config.cancelToken = new HttpRequest.CancelToken((cancel: Canceler) => {
            this.pendingList.push({
                url: HttpRequest.createCancelUrl(config),
                cancel
            });
        });
    }

    /**
     * 移除cancel
     */
    protected removePending(config: AxiosRequestConfig): void {
        const {pendingList} = this;
        const urlString = HttpRequest.createCancelUrl(config);
        const index = this.pendingList.findIndex((pending: PendingConfig) => pending.url === urlString);
        if (index > -1) {
            const {cancel} = pendingList[index];
            cancel();
            pendingList.splice(index, 1);
        }
    }

    /**
     * 请求方法
     * @param url
     * @param data
     * @param options
     */
    fetch<T, U = null>(url: string, data?: U, options?: AxiosRequestConfig): FetchResponse<T> {
        const isGet = ['get', 'GET', undefined].includes(options?.method);
        const requestData: {data: IAnyData} | {params: IAnyData} = isGet ? {params: data} : {data};
        return this.service({
            ...options,
            url,
            ...requestData
        }).then((response: AxiosResponse<AsyncHttpResponse<T>>) => HttpRequest.formatterSuccessResponse<T>(response))
          .catch((err: AxiosError) => HttpRequest.formatterErrorResponse(err))
    }
}

export default HttpRequest.getInstance();
