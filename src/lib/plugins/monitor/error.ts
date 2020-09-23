import TraceKit from 'tracekit';
import {createWebPageError, createWebPageResourceError} from "../../../service/monitor";

export default class ErrorMonitor {
    private static instance: ErrorMonitor;

    static getInstance(): ErrorMonitor {
        // 如果 instance 是一个实例 直接返回，  如果不是 实例化后返回
        if (!ErrorMonitor.instance) {
            ErrorMonitor.instance = new ErrorMonitor()
        }
        return ErrorMonitor.instance
    }

    constructor() {
        ErrorMonitor.init();
    }

    /**
     * 常见语法、同步、异步错误等错误回调
     * @param message
     * @param url
     * @param lineNum
     * @param columnNum
     * @param error
     */
    protected static windowErrorHandle(message: string, url: string, lineNum: number, columnNum: number, error: Error): boolean {
        /* eslint-disable */
        const {location: {href}} = window;
        createWebPageError({href, message,  url,  lineNum, columnNum, error: JSON.stringify(error, ['message', 'stack'])});
        /* eslint-disable */
        return true;
    };

    /**
     * 资源加载错误回调
     * @param e
     */
    protected static networkErrorHandle(e: Event) {
        const target = e.target || e.srcElement;
        if (target !== window) {
            const {location: {href}} = window;
            const {src} = target as any;
            createWebPageResourceError({href, src});
        }
    }

    /**
     * Promise错误回调
     * @param e
     */
    protected static promiseErrorHandle(e: ErrorEvent) {
        e.preventDefault();
        TraceKit.report((e as any).reason);
        return true;
    }



    protected static bindEvent() {
        window.onerror = ErrorMonitor.windowErrorHandle;
        window.addEventListener('error', ErrorMonitor.networkErrorHandle, true);
        window.addEventListener('unhandledrejection', ErrorMonitor.promiseErrorHandle);
    }

    protected static init() {
        ErrorMonitor.bindEvent();
    };
}
