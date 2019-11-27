import React, { Component } from 'react'
import {Card, Icon, Row, Col, Tag, Divider} from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {getArticleList} from '../../../../redux/article/actions'
import Clock from '../../../../lib/plugins/clock'
import Music from './music'
// import Weather from './weather'
import {iconFontUrl} from '../../../../conf'
import './index.scss'

const MyIcon = Icon.createFromIconfontCN({
	scriptUrl: iconFontUrl,
});

@connect(state => ({
	tagList: state.article.tagList,
	categoryList: state.article.categoryList,
	userInfo: state.user.userInfo,
	articleList: state.article.articleList,
	appLayoutWidth: state.app.appLayoutWidth
}), {getArticleList})

@withRouter
class AppSider extends Component{
	state = {
		statisticsList: [
			{label: '文章', value: 0, path: '/'},
			{label: '目录', value: 0},
			{label: '标签', value: 0}
		]
	};

	componentDidMount() {
		this.props.getArticleList();
		new Clock({
			el: document.getElementById('clock'),
			radius: 35,
			width: 80,
			height: 80
		})
	}

	componentWillReceiveProps(nextProps) {
		const {tagList, categoryList, articleList} = nextProps;
		const {statisticsList} = this.state;
		this.setState({statisticsList: statisticsList.map(item => item.label === '文章' ? Object.assign(item, {value: articleList ? articleList.length : 0}) : item)});
		this.setState({statisticsList: statisticsList.map(item => item.label === '目录' ? Object.assign(item, {value: categoryList.length}) : item)});
		this.setState({statisticsList: statisticsList.map(item => item.label === '标签' ? Object.assign(item, {value: tagList.length}) : item)});
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return null;
		}
	}

	render() {
		const {tagList, articleList, appLayoutWidth} = this.props;
		const {statisticsList} = this.state;
		const lastArticleList = articleList.length > 5 ? articleList.filter((item, index) => index < 5) : articleList;
		return <div className="app-sider">
			<Card>
				<p className="app-sider-title">
					<canvas id="clock"/>
					<span>前端汪小二</span>
				</p>
				<p className="warehouse">
					<a className="github-link" href="https://github.com/wj5576081" rel="noreferrer noopener" target="_blank"><Icon type="github" />&nbsp;github</a>
					<Divider type="vertical" />
					<a className="juejin-link" href="https://juejin.im/user/58be7c26a22b9d005ef8ab3f" rel="noreferrer noopener" target="_blank"><MyIcon type="icon-juejin" />&nbsp;juejin</a>
				</p>
				<p className="app-sider-desc">前端打杂，前端自娱自乐</p>
			</Card>
			{/*<Weather/>*/}
			{appLayoutWidth < 992 || window.attachEvent ? null : <Music/>}
			<Card className="app-sider-statistics">
				<Row gutter={24}>
					{statisticsList.map((statistics, index) => <Col
						span={24/statisticsList.length}
						key={statistics.label}
						className="app-sider-statistics__list"
					>
						<span className={`app-sider-statistics__num ${index < 2 ? 'link' : ''}`} onClick={e => {
							if (index < 2) {
								this.props.history.push(`/${index === 0 ? 'archives' : 'categories'}`);
							}
						}}>{statistics.value}</span>
						<br/>
						<span className="app-sider-statistics__name">{statistics.label}</span>
					</Col>)}
				</Row>
			</Card>
			<Card title="最近文章" className="mt-10">
				<ul className="recent-list">
					{lastArticleList ? lastArticleList.map(recent => <li key={recent.id} onClick={e => {this.props.history.push(`/article/${recent.id}`)}}>{recent.title}</li>) : null}
				</ul>
			</Card>
			<Card title="标签" className="mt-10">
				<div className="app-sider-tag">
					{tagList.map(tag => <Tag style={{cursor: 'pointer'}} onClick={e => {this.props.history.push(`/tag/${tag.id}`)}} key={tag.id} color={tag.color}>{tag.name}</Tag>)}
				</div>
			</Card>
		</div>
	}
}
export default AppSider;
