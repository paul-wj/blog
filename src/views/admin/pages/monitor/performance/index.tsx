import React, {FC, ReactElement, useEffect, useLayoutEffect, useState} from 'react';
import {Select, Card, Spin, Row, Col} from 'antd';
import dayJs from 'dayjs';
import {Chart} from '@antv/g2';
import {getWebPagePerformanceList as fetchGetWebPagePerformanceList} from "../../../../../service/monitor";
import './index.scss';
import {WebPerformanceResponse} from "../../../../../types/monitor";

interface TimeRequestParams {startTime: string, endTime: string}

interface PageLoadChartInfo {
    date: string;
    value: number;
    name: string;
}

type PerformanceList = keyof Omit<WebPerformanceResponse, 'ip' | 'createTime' | 'url' | 'userAgent' | 'type' | 'id' | 'compressionRatio'>;

const {Option} = Select;

const timeOptions = [
    {label: '今天', value: 10},
    {label: '近60分钟', value: 20},
    {label: '近4小时', value: 30},
    {label: '近6小时', value: 40},
    {label: '近12小时', value: 50},
    {label: '近1天', value: 60},
    {label: '近2天', value: 70},
    {label: '近3天', value: 80},
    {label: '近7天', value: 90},
    {label: '近15天', value: 100}
];

const timeType = 'YYYY/MM/DD HH:mm:ss';

const performanceMap: Record<PerformanceList, string> = {
    fpt: '白屏时间',
    tti: '首次可交互时间',
    ready: 'HTML加载完成时间',
    loadTime: '页面完全加载时间',
    firstbyte: '首包时间',
    sslTime: 'SSL安全连接耗时',
    dns: 'DNS查询耗时',
    tcp: 'TCP连接耗时',
    dom: 'DOM解析耗时',
    res: '资源加载耗时',
    trans: '内容传输耗时',
    ttfb: '请求响应耗时',
};

const pageLoadChartOptions = {
    container: 'g2_page_load',
    autoFit: true,
    padding: [30, 0, 30, 50]
};

const MonitorPerformance: FC = (): ReactElement => {

    const [loading, setLoading] = useState<boolean>(false);

    const [timeValue, setTimeValue] = useState<number>(10);

    const [pageLoadData, setPageLoadData] = useState<PageLoadChartInfo[]>([]);

    const [pageLoadChart, setPageLoadChart] = useState<Chart>(null);

    const getTimeMapByTimeValue = (): TimeRequestParams => {
        const endTime = dayJs().format(timeType);
        const result: TimeRequestParams = {startTime: '', endTime};
        switch (timeValue) {
            case 10:
                result.startTime = dayJs(dayJs().format(`YYYY/MM/DD`)).format(timeType);
                break;
            case 20:
                result.startTime = dayJs(endTime).subtract(1, "hour").format(timeType);
                break;
            case 30:
                result.startTime = dayJs(endTime).subtract(4, "hour").format(timeType);
                break;
            case 40:
                result.startTime = dayJs(endTime).subtract(6, "hour").format(timeType);
                break;
            case 50:
                result.startTime = dayJs(endTime).subtract(12, "hour").format(timeType);
                break;
            case 60:
                result.startTime = dayJs(endTime).subtract(1, "day").format(timeType);
                break;
            case 70:
                result.startTime = dayJs(endTime).subtract(2, "day").format(timeType);
                break;
            case 80:
                result.startTime = dayJs(endTime).subtract(3, "day").format(timeType);
                break;
            case 90:
                result.startTime = dayJs(endTime).subtract(7, "day").format(timeType);
                break;
            case 100:
                result.startTime = dayJs(endTime).subtract(15, "day").format(timeType);
                break;
            default:
                break;
        }
        return result;
    };

    const getWebPagePerformanceList = async () => {
        setLoading(true);
        const params = getTimeMapByTimeValue();
        const res = await fetchGetWebPagePerformanceList(params);
        if (res.flags === 'success') {
            const {data} = res;
            const chartData: PageLoadChartInfo[] = [];
            if (data.length) {
                data.forEach(item => {
                    Object.keys(performanceMap).forEach((key: PerformanceList) => {
                        chartData.push({name: performanceMap[key], value: item[key] || 0, date: item.createTime})
                    })
                })
            }
            setPageLoadData(chartData);
        }
        setLoading(false);
    };

    const createLoadPageChart = () => {
        const chart = new Chart(pageLoadChartOptions);
        chart.data(pageLoadData);
        chart.scale('date', {
            type: 'timeCat',
            mask: 'YYYY-MM-DD HH:mm'
        });
        chart.scale('value', {
            nice: true,
        });
        chart.tooltip({
            showCrosshairs: true,
            shared: true,
            title: null,
        });

        chart.legend({
            marker:  {
                symbol: 'circle',
            },
            position: 'top',
        });
        chart
            .area()
            .adjust('stack')
            .position('date*value')
            .color('name');
        chart
            .line()
            .adjust('stack')
            .position('date*value')
            .color('name');

        chart.interaction('element-highlight');
        chart.render();
        setPageLoadChart(chart);
    };

    useEffect(() => {
        getWebPagePerformanceList();
    }, [timeValue]);

    useLayoutEffect(() => {
        createLoadPageChart();
        return () => {
            if (pageLoadChart) {
                pageLoadChart.destroy();
            }
        }
    }, []);

    useLayoutEffect(() => {
        if (pageLoadData && pageLoadData.length) {
            // @ts-ignore
            pageLoadChart.options.scales.date.mask = timeValue <= 60 ? 'HH:mm' : 'YYYY-MM-DD HH:mm';
            pageLoadChart.data(pageLoadData);
            pageLoadChart.render();
        }
    }, [pageLoadData]);

    return (
        <div className="monitor-performance">
            <div className="monitor-performance-top">
                <span className="monitor-performance-top__label">时间区间：</span>
                <Select
                  style={{ width: 150 }}
                  placeholder="Select a time"
                  value={timeValue}
                  onChange={value => setTimeValue(value)}
                >
                    {timeOptions.map(item => (<Option value={item.value}>{item.label}</Option>))}
                </Select>
            </div>
            <>
                <Row>
                    <Col span={24}>
                        <Card title="页面性能分解" bordered={false}>
                            <Spin spinning={loading}>
                                <div id="g2_page_load" />
                            </Spin>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>1</Col>
                    <Col span={12}>2</Col>
                </Row>
            </>
        </div>
    )
};

export default MonitorPerformance;
