import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import {translateMarkdown} from '../../../../lib/utils'
import './index.scss'
@withRouter
class ArticleDetail extends Component {

	state = {
		loading: false,
		title: null,
		tagIds: null,
		categories: null,
		content: null
	};

	getArticleById = async id => {
		if (!id) {
			return
		}
		this.setState({title: null, tagIds: null, categories: null, content: null});
		this.setState({loading: true});
		let res = await this.$webApi.getArticleById(id);
		if (res.flags === 'success') {
			if (res.data) {
				let { title, tagIds, categories, content } = res.data;
				content = translateMarkdown(content);
				this.setState({
					title, tagIds, categories, content
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
		const {title, content} = this.state;
		return <div className="article-detail">
			<div className="article-header">
				<h1>{title}</h1>
			</div>
			<div className="description" dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	}
}
export default ArticleDetail
