import React, { Component } from 'react'
import {Card, Avatar, Row, Col, Tag} from 'antd';

import './scss/index.scss'

class AppSider extends Component{
	state = {
		statisticsList: [
			{label: '文件', value: 8},
			{label: '目录', value: 12},
			{label: '标签', value: 82}
		],
		recentList: [{label: '文件', value: 8}]
	};
	render() {
		const {statisticsList, recentList} = this.state;
		return <div className="app-sider">
			<Card>
				<p className="app-sider-title"><Avatar size={64} icon="user"/><span>Web Blog</span></p>
				<p className="app-sider-desc">这这这这这这这这这这这这这这这这这这是一个Web Blog</p>
			</Card>
			<Card className="app-sider-statistics">
				<Row gutter={24}>{statisticsList.map(statistics => <Col span={24/statisticsList.length} key={statistics.label} className="app-sider-statistics__list">
					<span className="app-sider-statistics__num">{statistics.value}</span><br/><span className="app-sider-statistics__name">{statistics.label}</span>
					</Col>)}</Row>
			</Card>
			<Card title="文章" className="mt-10">
				<ul className="recent-list">
					{recentList.map(recent => <li key={recent.value}>123</li>)}
				</ul>
			</Card>
			<Card title="标签" className="mt-10">
				<div className="app-sider-tag">
					<Tag color="magenta">magenta</Tag>
					<Tag color="red">red</Tag>
					<Tag color="volcano">volcano</Tag>
					<Tag color="orange">orange</Tag>
					<Tag color="gold">gold</Tag>
					<Tag color="lime">lime</Tag>
					<Tag color="green">green</Tag>
					<Tag color="cyan">cyan</Tag>
					<Tag color="blue">blue</Tag>
					<Tag color="geekblue">geekblue</Tag>
					<Tag color="purple">purple</Tag>
				</div>
			</Card>
		</div>
	}
}
export default AppSider;
