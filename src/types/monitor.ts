export interface WebPerformanceRequestParams {
    fpt: number;
    tti: number;
    ready: number;
    loadTime: number;
    firstbyte: number;
    compressionRatio: number;
    type: string;
    dns: number;
    tcp: number;
    ttfb: number;
    trans: number;
    dom: number;
    res: number;
    sslTime: number;
    url: string;
    userAgent: string;
}

export interface WebPerformanceResourceRequestParams {
    resourceList: WebPerformanceResourceParams[],
    userAgent: string;
    url: string;
}

export type WebPerformanceResourceParams = Omit<WebPerformanceResourceInfo, 'id' | 'equipmentId' | 'createTime'>;

export interface WebPerformanceResourceInfo {
    name: string;
    encodedBodySize: number;
    decodedBodySize: number;
    timeout: number;
    duration: number;
    protocol: string;
    type: string;
    id: number;
    equipmentId: number;
    createTime: string;
}

export interface WebPageErrorRequestParams {
    href: string;
    message: string;
    url: string;
    lineNum: number;
    columnNum: number;
    error: string;
}

export interface WebPerformanceResponse {
    fpt: number;
    tti: number;
    ready: number;
    loadTime: number;
    firstbyte: number;
    compressionRatio: number;
    type: string;
    createTime: string;
    id: number;
    dns: number;
    tcp: number;
    ttfb: number;
    trans: number;
    dom: number;
    res: number;
    sslTime: number;
    url: string;
    userAgent: string;
    ip: string;
}

