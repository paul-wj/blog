import React, { Component, Fragment } from 'react'
import {withRouter, Link} from "react-router-dom";
import {Pagination, Spin, Timeline, Icon} from 'antd';
import {formatDate} from '../../../../lib/utils'
import './index.scss'
@withRouter
class Archives extends Component{
	state = {
		articleList: [],
		loading: false,
		limit: 15,
		offset: 0,
		current: 1,
		total: 0,
		pageSize: 15,
		defaultCurrent: 1
	};

	/**
	 * 获取分页文章列表
	 * @returns {Promise<void>}
	 */
	async getArticleSimplePageList() {
		const {limit, offset} = this.state;
		this.setState({loading: true});
		let res = await this.$webApi.getArticleSimplePageList({limit, offset});
		if (res.flags === 'success') {
			let result = res.data;
			this.setState({articleList: [], total: 0});
			if (result) {
				let items = result.items;
				this.setState({articleList: items, total: result.total})
			}
		}
		this.setState({loading: false});
	}

	/**
	 * 页码改变执行方法
	 * @param current
	 * @param pageSize
	 * @returns {Promise<void>}
	 */
	changePaginationCurrent = async (current, pageSize) => {
		await this.setState({current, limit: pageSize * current, offset: pageSize * (current - 1)});
		this.getArticleSimplePageList();
	};

	componentDidMount() {
		this.getArticleSimplePageList()
	}

	render() {
		const {loading, articleList, total, defaultCurrent, pageSize, current} = this.state;
		return <div className="archives">
			<Spin tip="Loading..." className="archives--spin" size="large" spinning={loading}/>
			<Timeline>
				{articleList.length ? (<Fragment>
					<Timeline.Item>
						<span className="desc">{`The total number of articles is ${total}.`}</span>
						<br />
						<br />
					</Timeline.Item>
					<Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">
						<div className="year">
							{articleList[0]['createTime'].slice(0, 4)}
							...
						</div>
						<br />
					</Timeline.Item>
				</Fragment>) : null}
				{articleList.map(article => <Timeline.Item key={article.id}>
					<span className="archives__time">{formatDate(article.createTime, 'MM-DD')}</span>
					<Link to={`/article/${article.id}`}>{article.title}</Link>
					</Timeline.Item>)}
			</Timeline>
			<div className="archives--pagination">
				<Pagination
					onChange={this.changePaginationCurrent}
					current={current}
					pageSize={pageSize}
					defaultCurrent={defaultCurrent}
					total={total}/>
			</div>
		</div>
	}
}
export default Archives
