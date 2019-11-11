import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import {translateMarkdown} from '../../../../lib/utils'
import {Spin, Icon, Divider} from 'antd';
import { connect } from 'react-redux'
import {throttle} from 'lodash'
import Tags from "../../components/base/tags";
import ArticleComment from './comment'

import './index.scss'

let scrollTop = 0;
let contentDomScrollFn;

@connect(state => ({
	tagList: state.article.tagList,
	categoryList: state.article.categoryList,
	userInfo: state.user.userInfo
}))

@withRouter
class ArticleDetail extends Component {

	state = {
		articleId: null,
		loading: false,
		title: null,
		tagIds: [],
		viewCount: 0,
		categories: [],
		content: null,
		commentContent: null,
		commentList: [],
		contentDom: null
	};

	contentDomScrollFn = () => {
		return throttle(() => {
			scrollTop = this.contentDom.scrollTop;
		}, 200)
	};

	getArticleById = async id => {
		if (!id) {
			return
		}
		this.setState({loading: true, title: null, tagIds: [], categories: [], content: null});
		let res = await this.$webApi.getArticleById(id);
		if (res.flags === 'success') {
			if (res.data) {
				let { title, tagIds, categories, content, updateTime, viewCount, comments } = res.data;
				content = translateMarkdown(content);
				this.setState({title, tagIds, categories, content, updateTime, viewCount, comments})
			}
		}
		this.setState({loading: false});
	};

	componentDidMount = () => {
		if (!this.contentDom) {
			contentDomScrollFn = this.contentDomScrollFn();
			this.contentDom = document.getElementsByClassName('app-content-wrapper')[0];
			this.contentDom.addEventListener("scroll", contentDomScrollFn);
		}
		const articleId = this.props.match.params.id - 0;
		this.setState({articleId});
		this.getArticleById(articleId);
	};

	componentWillReceiveProps = nextProps => {
		const articleId = nextProps.match.params.id - 0;
		if (articleId !== this.state.articleId) {
			this.setState({articleId});
			this.getArticleById(articleId);
		}
	};

	componentDidUpdate() {
		if (scrollTop !== this.contentDom.scrollTop) {
			this.contentDom.scrollTop = scrollTop;
		}
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return null;
		};
		this.contentDom.removeEventListener("scroll", contentDomScrollFn);
		scrollTop = 0;
	}

	render() {
		const {articleId, title, content, updateTime, tagIds, categories, loading, viewCount, comments} = this.state;

		return <div className="article-detail">
			<Spin tip="Loading..." className="article-spin" size="large" spinning={loading}/>
			<div className="article-header">
				<h1>{title}</h1>
				<div className="article-msg">
					{updateTime ? <Icon type="clock-circle" /> : null}&nbsp;{updateTime}
					{tagIds.length ? <Tags type="tags" list={tagIds} /> : null}
					{categories.length ? <Tags type="categories" list={categories} /> : null}
					<Divider type="vertical" />
					<Icon type="message" style={{ marginRight: 7 }} />
					{comments}
					&nbsp;&nbsp;
					<a href="#comments" style={{ color: 'inherit' }}>
						<Icon type="eye" style={{ marginRight: 7 }} />
						{viewCount}
					</a>
				</div>
			</div>
			<div className="description" dangerouslySetInnerHTML={{ __html: content }} />
			{title ? <ArticleComment articleId={articleId} articleTitle={title} /> : null}
		</div>
	}
}
export default ArticleDetail
