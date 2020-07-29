import React, {FC, ReactElement, useLayoutEffect, useState} from 'react';
import {Radio} from 'antd';
import {BarChartOutlined, RadarChartOutlined, createFromIconfontCN} from '@ant-design/icons';
import {Chart} from '@antv/g2';
import DataSet from '@antv/data-set';
import {ICON_FONT_URL} from "../../../../conf";

const chartData = [
    { label: 'html,css', value: 80 },
    { label: 'js', value: 80 },
    { label: 'es6', value: 80 },
    { label: 'typescript', value: 70 },
    { label: 'vue', value: 80 },
    { label: 'react', value: 70 },
    { label: 'webpack', value: 70 },
    { label: 'node', value: 60 },
    { label: 'mysql', value: 50 },
    { label: 'linux', value: 50 }
];

const chartOptions = {
    container: 'g2_container',
    forceFit: true,
    autoFit: true
};

const MyIcon = createFromIconfontCN({
    scriptUrl: ICON_FONT_URL
});

const chartTypeList = [
    {value: 10, icon: BarChartOutlined, isAntdIcon: true},
    {value: 20, icon: RadarChartOutlined, isAntdIcon: true},
    {value: 30, icon: 'icon-jizuobiaozhuzhuangtu1', isAntdIcon: false},
    {value: 40, icon: 'icon-fsux_tubiao_nandingmeiguitu', isAntdIcon: false},
];


const AboutChart: FC = (): ReactElement => {

    const [currentIndex, setCurrentIndex] = useState<number>(10);

    const [currentChart, setCurrentChart] = useState(null);

    const createG2BarChart = () => {
        const chart = new Chart(chartOptions);
        chart.data(chartData.sort((startValue, secondValue) => startValue.value - secondValue.value));
        chart.scale({
            value: {
                max: 100,
                min: 0,
                alias: '指数',
            },
        });
        chart.axis('label', {
            title: null,
            tickLine: null,
            line: null,
        });
        chart.axis('value', {
            label: null,
            title: {
                offset: 30,
                style: {
                    fontSize: 12,
                    fontWeight: 300,
                },
            },
        });
        chart.legend(false);
        chart.coordinate().transpose();
        chart
            .interval()
            .color('#1890ff')
            .position('label*value')
            .size(26)
            .label('value', {
                style: {
                    fill: '#8d8d8d',
                },
                offset: 10,
            });
        chart.interaction('element-active');
        chart.render();
        setCurrentChart(chart);
    };

    const createG2RadarChart = () => {
        const { DataView } = DataSet;
        const dv = new DataView().source(chartData.map(item => ({...item, ...{'指数': item.value}})));
        dv.transform({
            type: 'fold',
            fields: ['指数'], // 展开字段集
            key: 'user', // key字段
            value: 'score' // value字段
        });
        const chart = new Chart(chartOptions);
        chart.data(dv.rows);
        chart.scale({
            score: {
                max: 100,
                min: 0,
            },
        });
        chart.coordinate('polar', {
            radius: 0.8
        });
        chart.axis('label', {
            line: null,
            tickLine: null,
            grid: {
                line: {
                    style: {
                        lineDash: null,
                        hideFirstLine: false,
                    },
                },
            }
        });
        chart.axis('score', {
            line: null,
            tickLine: null,
            grid: {
                line: {
                    type: 'polygon',
                    style: {
                        lineDash: null,
                        alternateColor: 'rgba(0, 0, 0, 0.04)'
                    },
                },
            },
        });
        chart.legend('user', {
            marker: {
                symbol: 'circle',
            }
        });
        chart.line().position('label*score').color('user').color('#1890ff')
            .size(4);
        chart.point().position('label*score').color('user')
            .shape('circle')
            .color('#1890ff')
            .size(4)
            .style({
                stroke: '#fff',
                lineWidth: 1,
                fillOpacity: 1
            });
        chart.render();
        setCurrentChart(chart);
    };

    const createG2CircleBarChart = () => {
        const chart = new Chart(chartOptions);
        chart.data(chartData);
        chart.scale({
            count: {
                max: 100,
                min: 0,
            },
        });
        chart.coordinate('theta', {
            innerRadius: 0.2,
            endAngle: Math.PI
        });
        chart.interval()
            .position('label*value')
            .color('#8543e0')
            .style({
                lineAppendWidth: 100
            }); // 线状柱状图
        chart.point()
            .position('label*value')
            .color('#8543e0')
            .shape('circle');
        for (let i = 0, l = chartData.length; i < l; i += 1) {
            const obj = chartData[i];
            chart.annotation().text({
                position: [ obj.label, 0 ],
                content: `${obj.label} `,
                style: {
                    textAlign: 'right'
                }
            });
        }
        chart.annotation().text({
            position: [ '50%', '50%' ],
            content: '前端',
            style: {
                textAlign: 'center',
                fontSize: 24,
                fill: '#8543e0'
            }
        });
        chart.render();
        setCurrentChart(chart);
    };

    const createG2Fsux = () => {
        const chart = new Chart(chartOptions);
        chart.data(chartData);
        chart.coordinate('polar', {
            innerRadius: 0.2
        });
        chart.axis(false);
        chart.interval().position('label*value')
            .color('label', chart.getTheme().colors_pie_16)
            .style({
                lineWidth: 1,
                stroke: '#fff'
            });
        chart.render();
        setCurrentChart(chart);
    };

    const chartDestroy = () => {
        if (currentChart) {
            currentChart.destroy();
        }
    };

    const switchChartByType = (index: number) => {
        switch (index) {
            case 10:
                createG2BarChart();
                break;
            case 20:
                createG2RadarChart();
                break;
            case 30:
                createG2CircleBarChart();
                break;
            case 40:
                createG2Fsux();
                break;
            default:
                createG2BarChart();
                break
        }
    };

    const toggleChartTypeHandle = (e: any) => {
        const index = e.target.value;
        setCurrentIndex(index);
        chartDestroy();
        switchChartByType(index);
    };

    useLayoutEffect(() => {
        switchChartByType(currentIndex);
        return () => {
            chartDestroy();
        }
    }, []);

    return (
        <div className="about-container__chart">
            <Radio.Group value={currentIndex} onChange={toggleChartTypeHandle}>
                {chartTypeList.map((chartInfo) => {
                    return (
                        <Radio.Button value={chartInfo.value}>
                            {chartInfo.isAntdIcon ? React.createElement(chartInfo.icon) : <MyIcon type={chartInfo.icon as string} />}
                        </Radio.Button>
                    )
                })}
            </Radio.Group>
            <div id="g2_container" />
        </div>
    )
};

export default AboutChart;
