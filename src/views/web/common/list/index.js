import React, {Component, Fragment} from 'react'
import {withRouter, Link} from "react-router-dom";
import {Pagination, Spin, Timeline} from 'antd';

import {formatDate, firstLetterUppercase} from "../../../../lib/utils";
import { connect } from 'react-redux'

import './index.scss'

@connect(state => ({
	tagList: state.article.tagList,
	categoryList: state.article.categoryList
}),{})
@withRouter
class CategoryDetail extends Component{
	state = {
		articleList: [],
		loading: false,
		limit: 15,
		offset: 0,
		current: 1,
		total: 0,
		pageSize: 15,
		defaultCurrent: 1,
		id: null,
		type: 'category'
	};

	/**
	 * 获取分页文章列表
	 * @returns {Promise<void>}
	 */
	async getArticlePageListByCategoryId() {
		const {type, limit, offset, id} = this.state;
		this.setState({loading: true});
		let res = type === 'category' ? await this.$webApi.getArticlePageListByCategoryId(id, {limit, offset}) : await this.$webApi.getArticlePageListByTagId(id, {limit, offset});
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
	 * 获取url中的参数方法
	 * @returns {Promise<void>}
	 */
	getKeyword = id => {
		const {url} = this.props.match;
		if (id) {
			this.setState({id, type: url.indexOf('category') > -1 ? 'category' : 'tag'}, () => {this.getArticlePageListByCategoryId()});
		}
	};

	componentDidMount() {
		const {id} = this.props.match.params;
		this.getKeyword(id);
	}

	componentWillReceiveProps = async nextProps => {
		const {id} = nextProps.match.params;
		if (id !== this.props.match.params.id) {
			this.getKeyword(id);
		}
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return null;
		}
	}

	render() {
		const {type, id, loading, articleList, total, defaultCurrent, pageSize, current} = this.state;
		const {tagList, categoryList} = this.props;
		const name = id ? type === 'category' ? categoryList.find(item => item.id === id - 0).name : tagList.find(item => item.id === id - 0).name : '';
		return <div className={`${type}-detail`}>
			<Spin tip="Loading..." className={`${type}-detail--spin`} size="large" spinning={loading}/>
			<Timeline>
				{articleList.length ? (<Fragment>
					<Timeline.Item>
						<h1 className={`${type}-detail--title`}>{name}<span>{firstLetterUppercase(type)}</span></h1>
					</Timeline.Item>
					{total > pageSize ? <Timeline.Item>
						<span className="desc">{`The total number of articles is ${total}.`}</span>
						<br/>
						<br/>
					</Timeline.Item> : null}
				</Fragment>) : null}
				{articleList.map(article => <Timeline.Item key={article.id}>
					<span className={`${type}-detail__time`}>{formatDate(article.createTime, 'MM-DD')}</span>
					<Link to={`/article/${article.id}`}>{article.title}</Link>
				</Timeline.Item>)}
			</Timeline>
			{total > pageSize ? (<div className={`${type}-detail--pagination`}>
				<Pagination
					onChange={this.changePaginationCurrent}
					current={current}
					pageSize={pageSize}
					defaultCurrent={defaultCurrent}
					total={total}/>
			</div>) : null}
		</div>
	}
}
export default CategoryDetail
