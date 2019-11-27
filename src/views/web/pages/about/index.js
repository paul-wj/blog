import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import { Divider, Button, Icon, Radio } from 'antd';
import {iconFontUrl} from '../../../../conf'
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import dayJs from 'dayjs';
import './index.scss'


const chartData = [
	{ label: 'html,css', value: 80 },
	{ label: 'js', value: 75 },
	{ label: 'es6', value: 70 },
	{ label: 'vue', value: 75 },
	{ label: 'react', value: 55 },
	{ label: 'webpack', value: 65 },
	{ label: 'node', value: 40 },
	{ label: 'mysql', value: 40 },
	{ label: 'linux', value: 40 }
];

const chartOptions = {
	container: 'g2_container',
	forceFit: true,
	padding: 'auto'
};


const MyIcon = Icon.createFromIconfontCN({
	scriptUrl: iconFontUrl,
});

@withRouter
class About extends Component {

	state = {
		chartTypeList: [
			{iconName: 'bar-chart', value: 10, isAntdIcon: true},
			{iconName: 'radar-chart', value: 20, isAntdIcon: true},
			{iconName: 'icon-jizuobiaozhuzhuangtu1', value: 30, isAntdIcon: false},
			{iconName: 'icon-fsux_tubiao_nandingmeiguitu', value: 40, isAntdIcon: false},
		],
		chart: null,
		currentIndex: 10
	};

	componentDidMount() {
		const {currentIndex} = this.state;
		this.switchChartByType(currentIndex);
		console.log(this.getWorkExperience())
	}

	componentWillUnmount() {
		this.chartDestroy();
	}

	getWorkExperience = () => {
		const startWorkTime = dayJs('2016/02');
		const nowTime = dayJs();
		const workExperience = nowTime.diff(startWorkTime, 'month');
		return !workExperience ? '' : workExperience > 12 ? `${Math.floor(workExperience / 12)}年${workExperience % 12}个月` : `${workExperience}个月`;
	};

	toggleChartTypeHandle = e => {
		const currentIndex = e.target.value;
		this.setState({currentIndex});
		this.chartDestroy();
		this.switchChartByType(currentIndex);
	};

	switchChartByType = index => {
		switch (index) {
			case 10:
				this.createG2BarChart();
				break;
			case 20:
				this.createG2RadarChart();
				break;
			case 30:
				this.createG2CircleBarChart();
				break;
			case 40:
				this.createG2Fsux();
				break;
			default:
				this.createG2BarChart();
				break
		}
	};

	chartDestroy = () => {
		const {chart} = this.state;
		if (chart) {
			chart.destroy();
		}
	};

	createG2BarChart = () => {
		const chart = new G2.Chart(chartOptions);
		chart.source(chartData.sort((startValue, secondValue) => {
			return startValue.value - secondValue.value;
		}), {
			value: {
				max: 100,
				min: 0,
				nice: false,
				alias: '指数'
			}
		});
		chart.axis('label', {
			label: {
				textStyle: {
					fill: '#8d8d8d',
					fontSize: 12
				}
			},
			tickLine: {
				alignWithLabel: false,
				length: 0
			},
			line: {
				lineWidth: 0
			}
		});
		chart.axis('value', {
			label: null,
			title: {
				offset: 30,
				textStyle: {
					fontSize: 12,
					fontWeight: 300
				}
			}
		});
		chart.coord().transpose();
		chart.interval().position('label*value').size(26)
			.opacity(1)
			.label('value', {
				textStyle: {
					fill: '#8d8d8d'
				},
				offset: 10
			});
		chart.render();
		this.setState({chart})
	};

	createG2RadarChart = () => {
		const { DataView } = DataSet;
		const dv = new DataView().source(chartData.map(item => (Object.assign({}, item, {'指数': item.value}))));
		dv.transform({
			type: 'fold',
			fields: [ '指数'], // 展开字段集
			key: 'user', // key字段
			value: 'score' // value字段
		});
		const chart = new G2.Chart(chartOptions);
		chart.source(dv, {
			score: {
				min: 0,
				max: 100
			}
		});
		chart.coord('polar', {
			radius: 0.8
		});
		chart.axis('label', {
			line: null,
			tickLine: null,
			grid: {
				lineStyle: {
					lineDash: null
				},
				hideFirstLine: false
			}
		});
		chart.axis('score', {
			line: null,
			tickLine: null,
			grid: {
				type: 'polygon',
				lineStyle: {
					lineDash: null
				},
				alternateColor: 'rgba(0, 0, 0, 0.04)'
			}
		});
		chart.legend('user', {
			marker: 'circle',
			offset: 30
		});
		chart.line().position('label*score').color('user')
			.size(2);
		chart.point().position('label*score').color('user')
			.shape('circle')
			.size(4)
			.style({
				stroke: '#fff',
				lineWidth: 1,
				fillOpacity: 1
			});
		chart.render();
		this.setState({chart})
	};

	createG2CircleBarChart = () => {
		const chart = new G2.Chart(chartOptions);
		chart.source(chartData, {
			count: {
				max: 100
			}
		});
		chart.coord('theta', {
			innerRadius: 0.2,
			endAngle: Math.PI
		});
		chart.interval()
			.position('label*value')
			.color('#8543e0')
			.shape('line')
			.select(false)
			.style({
				lineAppendWidth: 10
			}); // 线状柱状图
		chart.point()
			.position('label*value')
			.color('#8543e0')
			.shape('circle');
		for (let i = 0, l = chartData.length; i < l; i++) {
			const obj = chartData[i];
			chart.guide().text({
				position: [ obj.label, 0 ],
				content: obj.label + ' ',
				style: {
					textAlign: 'right'
				}
			});
		}
		chart.guide().text({
			position: [ '50%', '50%' ],
			content: 'Music',
			style: {
				textAlign: 'center',
				fontSize: 24,
				fill: '#8543e0'
			}
		});
		chart.render();
		this.setState({chart})
	};

	createG2Fsux = () => {
		const chart = new G2.Chart(chartOptions);
		chart.source(chartData);
		chart.coord('polar', {
			innerRadius: 0.2
		});
		chart.axis(false);
		chart.interval().position('label*value')
			.color('label', G2.Global.colors_pie_16)
			.style({
				lineWidth: 1,
				stroke: '#fff'
			});
		chart.render();
		this.setState({chart})
	};

	render() {
		const {chartTypeList, currentIndex} = this.state;
		return <div className="about-content">
			<Divider orientation="left">博客简述</Divider>
			<ul className="desc-list">
				<li>本博客使用的技术为 react + antd + koa2 + mysql + ioredis + socket.io</li>
				<li>源码地址为 <Button style={{padding: 0}} type="link"><a href="https://github.com/paul-wj/blog.git" rel="noopener noreferrer" target="_blank">github</a></Button>，仅供参考，不做商业用途！</li>
			</ul>
			<Divider orientation="left">个人信息</Divider>
			<ul className="desc-list">
				<li>个人起点：因16年初开始工作，所以刚工作就接触并使用spa和前后端分离的模式，对技术的革新无阵痛，并热爱新技术。</li>
				<li>工作经验：{this.getWorkExperience()}</li>
				<li>学历专业：专科<Divider type="vertical" />软件技术</li>
				<li>联系方式： <Icon type="qq" style={{marginRight: '5px'}} />458070960<Divider type="vertical" /><Icon type="mail" style={{marginRight: '5px'}} /><Button style={{padding: 0}} type="link"><a href="mailto:paul.wangjie@gmail.com">paul.wangjie@gmail.com</a></Button></li>
				<li>坐标：上海市</li>
			</ul>
			<Divider orientation="left">个人技能</Divider>
			<Radio.Group value={currentIndex} onChange={this.toggleChartTypeHandle}>
				{chartTypeList.map((chartInfo) => {
					return <Radio.Button value={chartInfo.value}>
							{chartInfo.isAntdIcon ? <Icon type={chartInfo.iconName}/> : <MyIcon type={chartInfo.iconName} />}
					</Radio.Button>
				})}
			</Radio.Group>
			<div id="g2_container"/>
			<ul className="desc-list">
				<li>html、css、js: 能熟练开发符合 W3C 标准的页面。</li>
				<li>es6: es6常用方法熟练使用，掌握面向对象编程实现。</li>
				<li>vue框架熟练掌握使用，当前博客为技术为react全家桶，react熟悉使用。</li>
				<li>node: 掌握koa2全家桶，能完成接口的开发与设计。</li>
				<li>linux: linux基本操作熟悉，云服务器安全防范，防火墙等配置，并完成简单个人网站全栈（前后端）上线流程（pm2、nginx、mysql、redis、Jenkins等为linux上常用程序）。</li>
				<li>mysql: 针对需求可以做到简单的数据库设计。</li>
				<li>webpack: 可以对脚手架进行针对性的打包配置。</li>
			</ul>
			<Divider orientation="left">个人开发工具</Divider>
			<ul className="desc-list">
				<li>常用开发工具： webstorm、git等</li>
				<li>熟悉的 UI 工具： element-ui、iview、antd、vux等</li>
				<li>熟悉的图表工具：echart、heightchart、G2等</li>
			</ul>
			<Divider orientation="left">个人爱好</Divider>
			<ul className="desc-list">
				<li>旅游、NBA2K、英雄联盟</li>
				<li>欢迎交流</li>
			</ul>
		</div>
	}
}
export default About;
