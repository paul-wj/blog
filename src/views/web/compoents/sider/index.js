import React, { Component } from 'react'
import {Card, Avatar, Row, Col, Tag} from 'antd';

import './index.scss'

class AppSider extends Component{
	state = {
		tagList: [],
		statisticsList: [
			{label: '文章', value: 0},
			{label: '目录', value: 0},
			{label: '标签', value: 0}
		],
		articleList: []
	};

	async getArticleAllList() {
		let res = await this.$webApi.getArticleAllList();
		if (res.flags === 'success') {
			let result = res.data;
			let statisticsList = this.state.statisticsList;
			this.setState({articleList: []});
			if (result && result.length) {
				this.setState({
					articleList: result,
					statisticsList: statisticsList.map(item => item.label === '文章' ? Object.assign(item, {value: result.length}) : item)
				});
			}
		}
	}
	getCategoryAllList = async () => {
		let res = await this.$webApi.getCategoryAllList();
		if (res.flags === 'success') {
			let result = res.data;
			let statisticsList = this.state.statisticsList;
			if (result && result.length) {
				this.setState({
					articleList: result,
					statisticsList: statisticsList.map(item => item.label === '目录' ? Object.assign(item, {value: result.length}) : item)
				});
			}
		}
	};

	getTagAllList = async () => {
		let res = await this.$webApi.getTagAllList();
		if (res.flags === 'success') {
			let statisticsList = this.state.statisticsList;
			let result = res.data;
			this.setState({tagList: []});
			if (result && result.length) {
				this.setState({
					tagList: result,
					statisticsList: statisticsList.map(item => item.label === '标签' ? Object.assign(item, {value: result.length}) : item)
				});
			}
		}
	};

	componentDidMount() {
		this.getTagAllList();
		this.getCategoryAllList();
		this.getArticleAllList();
	}

	render() {
		const {tagList, statisticsList, articleList} = this.state;
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
					{articleList.map(recent => <li key={recent.id}>{recent.title}</li>)}
				</ul>
			</Card>
			<Card title="标签" className="mt-10">
				<div className="app-sider-tag">
					{tagList.map(tag => <Tag key={tag.id} color={tag.color}>{tag.name}</Tag>)}
				</div>
			</Card>
		</div>
	}
}
export default AppSider;
