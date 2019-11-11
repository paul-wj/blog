import React, { Component, Fragment } from 'react'
import {withRouter} from "react-router-dom";
import {Divider, Icon, Spin, Pagination, Empty} from 'antd';
import {translateMarkdown, decodeQuery} from '../../../../lib/utils'
import './index.scss'
import Tags from '../../components/base/tags'

@withRouter
class Home extends Component {
	state = {
		articleList: [],
		loading: false,
		title: null,
		limit: 10,
		offset: 0,
		current: 1,
		total: 0,
		pageSize: 10,
		defaultCurrent: 1
	};

	/**
	 * 获取分页文章列表
	 * @returns {Promise<void>}
	 */
	async getArticlePageList() {
		const {limit, offset, title} = this.state;
		this.setState({loading: true});
		let res = await this.$webApi.getArticlePageList({limit, offset, title});
		if (res.flags === 'success') {
			let result = res.data;
			this.setState({articleList: [], total: 0});
			if (result) {
				let items = result.items;
				if (items && items.length) {
					items.forEach(item => {
						item.description = translateMarkdown(item.content)
					});
				}
				this.setState({articleList: items, total: result.total})
			}
		}
		this.setState({loading: false});
	}

	/**
	 * 每页数量改执行方法
	 * @param current
	 * @param pageSize
	 * @returns {Promise<void>}
	 */
	onShowSizeChange =  (current, pageSize) => {
		this.setState({current, pageSize, limit: pageSize, offset: pageSize * (current - 1)}, () => {this.getArticlePageList()});
	};

	/**
	 * 页码改变执行方法
	 * @param current
	 * @param pageSize
	 * @returns {Promise<void>}
	 */
	changePaginationCurrent = (current, pageSize) => {
		this.setState({current, limit: pageSize, offset: pageSize * (current - 1)}, () => {this.getArticlePageList()});
	};

	/**
	 * 获取url中的参数方法
	 * @param search
	 * @returns {Promise<void>}
	 */
	getKeyword = search => {
		if (search) {
			const {pageSize} = this.state;
			const {current, keyword} = decodeQuery(search);
			this.setState({current: current - 0, title: keyword, limit: pageSize, offset: pageSize * (current - 1)}, () => {this.getArticlePageList()});
		} else {
			this.setState({current: 1, title: null, limit: 10, offset: 0}, () => {this.getArticlePageList()});
		}
	};

	componentDidMount() {
		const {search} = this.props.location;
		this.getKeyword(search);
	}

	componentWillReceiveProps = async nextProps => {
		const {search} = nextProps.location;
		if (search !== this.props.location.search) {
			this.getKeyword(search);
		}
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return null;
		}
	}

	render() {
		const {loading, articleList, total, defaultCurrent, pageSize, current} = this.state;
		return <div className="article-content">
			<Spin tip="Loading..." className="article-content-spin" size="large" spinning={loading}/>
			{articleList.length ? (<Fragment>
				<ul className="article-content__wrapper">
					{articleList.map((item, index) => (<li key={index} className="article-content-list" onClick={e => {this.props.history.push(`/article/${item.id}`)}}>
						<Divider orientation="left">
							<span title={item.title} className="title">{item.title}</span>
							<span className="create-time">{item.updateTime}</span>
						</Divider>
						<div className="article-detail description" dangerouslySetInnerHTML={{ __html: item.description }} />
						<div className="list-item-action">
							<Icon type="message" style={{ marginRight: 7 }} />
							{item.comments}
							&nbsp;&nbsp;
							<Icon type="eye" style={{ marginRight: 7 }} />
							{item.viewCount}
							<Tags type="tags" list={item.tagIds} />
							<Tags type="categories" list={item.categories} />
						</div>
					</li>))}
				</ul>
				<div className="article-content__pagination">
					<Pagination
						showSizeChanger
						onChange={this.changePaginationCurrent}
						onShowSizeChange={this.onShowSizeChange}
						current={current}
						pageSize={pageSize}
						defaultCurrent={defaultCurrent}
						total={total}/>
				</div>
			</Fragment>) : !loading ? <Empty style={{marginTop: '25%'}} /> : ''}
		</div>
	}
}
export default Home
