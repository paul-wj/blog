import React, { Component } from 'react'
import {Divider, Icon} from 'antd';
import {translateMarkdown} from '../../../../lib/utils'
import './index.scss'
import Tags from '../../compoents/base/tags'
class Home extends Component {
	state = {
		articleList: [],
		total: 0,
		loading: false
	};

	async getArticleAllList() {
		let res = await this.$webApi.getArticleAllList();
		if (res.flags === 'success') {
			let result = res.data;
			this.setState({articleList: []});
			if (result && result.length) {
				result.forEach(item => {
					let index = item.content.indexOf('<!--more-->');
					item.description = translateMarkdown(item.content.slice(0, index))
				});
				result.reverse();
				this.setState({articleList: result})
			}
		}
	}

	componentDidMount() {
		this.getArticleAllList();
	}

	render() {
		const articleList = this.state.articleList;
		return <div className="article-content">
			<ul>
				{articleList.map((item, index) => (<li key={index} className="article-content-list" onClick={e => {this.props.history.push(`/article/${item.id}`)}}>
						<Divider orientation="left">
							<span className="title">{item.title}</span>
							<span className="create-time">{item.updateTime}</span>
						</Divider>
						<div className="article-detail description" dangerouslySetInnerHTML={{ __html: item.description }} />
						<div className="list-item-action">
							<Icon type="message" style={{ marginRight: 7 }} />
							{item.comments}
							<Tags type="tags" list={item.tagIds} />
							<Tags type="categories" list={item.categories} />
						</div>
				</li>))}
			</ul>
		</div>
	}
}
export default Home
