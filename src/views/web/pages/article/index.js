import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import {translateMarkdown} from '../../../../lib/utils'
import { Spin, Icon } from 'antd';
import { connect } from 'react-redux'
import Tags from "../../compoents/base/tags";
import './index.scss'


@connect(state => ({
	tagList: state.article.tagList,
	categoryList: state.article.categoryList
}))

@withRouter
class ArticleDetail extends Component {

	state = {
		loading: false,
		title: null,
		tagIds: [],
		categories: [],
		content: null
	};

	getArticleById = async id => {
		if (!id) {
			return
		}
		this.setState({loading: true, title: null, tagIds: [], categories: [], content: null});
		let res = await this.$webApi.getArticleById(id);
		if (res.flags === 'success') {
			if (res.data) {
				let { title, tagIds, categories, content, updateTime } = res.data;
				content = translateMarkdown(content);
				this.setState({
					title, tagIds, categories, content, updateTime
				})
			}
		}
		this.setState({loading: false});
	};

	componentDidMount = () => {
		this.getArticleById(this.props.match.params.id - 0);
	};

	componentWillReceiveProps = props => {
		this.getArticleById(props.match.params.id - 0);
	};

	render() {
		const {title, content, updateTime, tagIds, categories} = this.state;
		return <Spin spinning={this.state.loading} delay={500}>
			<div className="article-detail">
				<div className="article-header">
					<h1>{title}</h1>
					<div className="article-msg">
						{updateTime ? <Icon type="clock-circle" /> : null}&nbsp;{updateTime}
						{tagIds.length ? <Tags type="tags" list={tagIds} /> : null}
						{categories.length ? <Tags type="categories" list={categories} /> : null}
					</div>
				</div>
				<div className="description" dangerouslySetInnerHTML={{ __html: content }} />
			</div>
		</Spin>
	}
}
export default ArticleDetail
