/**
 **@Description: 前端性能监控类
 **@Author: Paul Wang
 **@Date: 2020/9/11
 */
import {createWebPerformance, createWebPerformanceResource} from "../../../service/monitor";

const navigationTypeMap = {
    0: 'navigate',
    1: 'reload',
    2: 'back_forward'
};

interface PageTimingInfo {
    // 压缩比率，如果是 1 的话，也能说明未开启例如 gzip
    compressionRatio: number;
    // First Paint Time，首次渲染时间（白屏时间）: 从请求开始到浏览器开始解析第一批HTML文档字节的时间差。。
    fpt: number;
    // Time to Interact，首次可交互时间: 浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。。
    tti: number;
    // HTML加载完成时间， 即DOM Ready时间: 如果页面有同步执行的JS，则同步JS执行时间 = ready - tti。。
    ready: number;
    // 页面完全加载时间: load = 首次渲染时间 + DOM解析耗时 + 同步JS执行 + 资源加载耗时。
    loadTime: number;
    // 首包时间
    firstbyte: number;
    // DNS查询耗时
    dns: number;
    // TCP连接耗时
    tcp: number;
    // Time to First Byte（TTFB），请求响应耗时。
    ttfb: number;
    // 内容传输耗时
    trans: number;
    // DOM解析耗时
    dom: number;
    // 资源加载耗时(表示页面中的同步加载资源)
    res: number;
    // SSL安全连接耗时(只在HTTPS下有效)
    sslTime: number;
    // 当前url
    url: string;
    // navigate: 网页通过点击链接、地址栏输入、表单提交、脚本操作等方式加载, reload: 网页通过“重新加载”按钮或者location.reload()方法加载,
    type: string;
}

export default class PerformanceMonitor {

    private static instance: PerformanceMonitor;

    private static SEC = 1000;

    private static TIMEOUT = PerformanceMonitor.SEC * 5;

    private static performance: Performance;

    constructor() {
        // @ts-ignore
        const performance = window.performance || window.msPerformance || window.webkitPerformance;
        if (!performance) {
            return
        }
        PerformanceMonitor.performance = performance;
        PerformanceMonitor.init();
    }

    static getInstance(): PerformanceMonitor {
        // 如果 instance 是一个实例 直接返回，  如果不是 实例化后返回
        if (!PerformanceMonitor.instance) {
            PerformanceMonitor.instance = new PerformanceMonitor()
        }
        return PerformanceMonitor.instance
    }

    protected static setTime = (limit = PerformanceMonitor.TIMEOUT): any => (time: number) => time >= limit;

    protected static getPageTimeDataByTiming(): PageTimingInfo {
        const {
            fetchStart,
            domainLookupStart,
            domainLookupEnd,
            connectStart,
            connectEnd,
            secureConnectionStart,
            requestStart,
            responseStart,
            responseEnd,
            domInteractive,
            domContentLoadedEventStart,
            domContentLoadedEventEnd,
            loadEventStart,
        } = PerformanceMonitor.performance.timing;
        const {type} = PerformanceMonitor.performance.navigation;
        return {
            compressionRatio: null,
            // First Paint Time，首次渲染时间（白屏时间）: 从请求开始到浏览器开始解析第一批HTML文档字节的时间差。。
            fpt: responseEnd - fetchStart,
            // Time to Interact，首次可交互时间: 浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。。
            tti: domInteractive - fetchStart,
            // HTML加载完成时间， 即DOM Ready时间: 如果页面有同步执行的JS，则同步JS执行时间 = ready - tti。。
            ready: domContentLoadedEventStart - fetchStart,
            // 页面完全加载时间: load = 首次渲染时间 + DOM解析耗时 + 同步JS执行 + 资源加载耗时。
            loadTime: loadEventStart - fetchStart,
            // 首包时间
            firstbyte: responseStart - domainLookupStart,
            // DNS查询耗时
            dns: domainLookupEnd - domainLookupStart,
            // TCP连接耗时
            tcp: connectEnd - connectStart,
            // Time to First Byte（TTFB），请求响应耗时。
            ttfb: responseStart - requestStart,
            // 内容传输耗时
            trans: responseEnd - responseStart,
            // DOM解析耗时
            dom: domInteractive - responseEnd,
            // 资源加载耗时(表示页面中的同步加载资源)
            res: loadEventStart - domContentLoadedEventEnd,
            // SSL安全连接耗时(只在HTTPS下有效)
            sslTime: secureConnectionStart ? (connectEnd - secureConnectionStart) : null,
            // 当前url
            url: window.location.href,
            // navigate: 网页通过点击链接、地址栏输入、表单提交、脚本操作等方式加载, reload: 网页通过“重新加载”按钮或者location.reload()方法加载,
            type: navigationTypeMap[type as 0 | 1 | 2]
        }
    }

    protected static getPageTimeDataByEntries(): PageTimingInfo {
        const [{
            encodedBodySize,
            decodedBodySize,
            fetchStart,
            domainLookupStart,
            domainLookupEnd,
            connectStart,
            connectEnd,
            secureConnectionStart,
            requestStart,
            responseStart,
            responseEnd,
            domInteractive,
            domContentLoadedEventStart,
            domContentLoadedEventEnd,
            loadEventStart,
            name,
            type
        }] = PerformanceMonitor.performance.getEntriesByType('navigation') as [any];
        return {
            // 压缩比率，如果是 1 的话，也能说明未开启例如 gzip
            compressionRatio: decodedBodySize / encodedBodySize,
            // First Paint Time，首次渲染时间（白屏时间）: 从请求开始到浏览器开始解析第一批HTML文档字节的时间差。。
            fpt: responseEnd - fetchStart,
            // Time to Interact，首次可交互时间: 浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。。
            tti: domInteractive - fetchStart,
            // HTML加载完成时间， 即DOM Ready时间: 如果页面有同步执行的JS，则同步JS执行时间 = ready - tti。。
            ready: domContentLoadedEventStart - fetchStart,
            // 页面完全加载时间: load = 首次渲染时间 + DOM解析耗时 + 同步JS执行 + 资源加载耗时。
            loadTime: loadEventStart - fetchStart,
            // 首包时间
            firstbyte: responseStart - domainLookupStart,
            // DNS查询耗时
            dns: domainLookupEnd - domainLookupStart,
            // TCP连接耗时
            tcp: connectEnd - connectStart,
            // Time to First Byte（TTFB），请求响应耗时。
            ttfb: responseStart - requestStart,
            // 内容传输耗时
            trans: responseEnd - responseStart,
            // DOM解析耗时
            dom: domInteractive - responseEnd,
            // 资源加载耗时(表示页面中的同步加载资源)
            res: loadEventStart - domContentLoadedEventEnd,
            // SSL安全连接耗时(只在HTTPS下有效)
            sslTime: secureConnectionStart ? (connectEnd - secureConnectionStart) : null,
            // 当前url
            url: String(name),
            // navigate: 网页通过点击链接、地址栏输入、表单提交、脚本操作等方式加载, reload: 网页通过“重新加载”按钮或者location.reload()方法加载,
            type: String(type)
        }
    };

    protected static getTimeoutRes(): any[] {
        const isTimeout = PerformanceMonitor.setTime();
        const resourceTimes = PerformanceMonitor.performance.getEntriesByType('resource');
        // @ts-ignore
        return resourceTimes ? resourceTimes.filter(({startTime, responseEnd}) => isTimeout(responseEnd - startTime)).map(({name, encodedBodySize, decodedBodySize, duration, nextHopProtocol, initiatorType}) => ({name, encodedBodySize, decodedBodySize, timeout: PerformanceMonitor.TIMEOUT, duration, protocol: nextHopProtocol, type: initiatorType})) : [];
    };

    protected static logPackage(): void {
        const {performance} = PerformanceMonitor;
        const resourceList = PerformanceMonitor.getTimeoutRes();
        const {userAgent} = navigator;
        let firstPageTimeData;
        if (performance.getEntriesByType('navigation').length > 0) {
            firstPageTimeData = PerformanceMonitor.getPageTimeDataByEntries();
        } else if (performance && performance.timing) {
            firstPageTimeData = PerformanceMonitor.getPageTimeDataByTiming();
        }
        const timeData = {...firstPageTimeData, userAgent};
        createWebPerformance(timeData);
        if (resourceList.length) {
            createWebPerformanceResource({
                url: firstPageTimeData.url,
                userAgent,
                resourceList
            })
        }
    }

    protected static bindEvent(): void {
        const preLoad: (e: Event) => any = window.onload;
        window.onload = (e: Event) => {
            if (preLoad && typeof preLoad === 'function') {
                preLoad(e);
            }
            // @ts-ignore 尽量不影响页面主线程
            if (window.requestIdleCallback) {
                // @ts-ignore
                window.requestIdleCallback(PerformanceMonitor.logPackage);
            } else {
                setTimeout(PerformanceMonitor.logPackage);
            }
        };
    }

    protected static init(): void {
        if (!performance) {
            return;
        }
        PerformanceMonitor.bindEvent();
    };
}


