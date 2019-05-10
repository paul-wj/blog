import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import {translateMarkdown} from '../../../../lib/utils'
import { Spin, Icon, Comment, Form, Button, List, Input, Avatar} from 'antd';
import { connect } from 'react-redux'
import Tags from "../../compoents/base/tags";
import './index.scss'
const TextArea = Input.TextArea;


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
		content: null,
		commentContent: null,
		commentList: []
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

	getArticleCommentList = async id => {
		let res = await this.$webApi.getArticleCommentList(id);
		if (res.flags === 'success') {
			this.setState({commentList: []});
			if (res.data && res.data.length) {
				this.setState({commentList: res.data})
			}
		}
	};

	createArticleComment = async () => {
		const id = this.props.match.params.id;
		let res = await this.$webApi.createArticleComment(id, {content: this.state.commentContent});
		if (res.flags === 'success') {
			this.getArticleCommentList(id);
			this.setState({commentContent: null});
		}
	};

	componentDidMount = () => {
		const id = this.props.match.params.id - 0;
		this.getArticleById(id);
		this.getArticleCommentList(id);
	};

	componentWillReceiveProps = props => {
		const id = props.match.params.id - 0;
		this.getArticleById(id);
		this.getArticleCommentList(id);
	};

	render() {
		const {title, content, updateTime, tagIds, categories, commentList} = this.state;
		return <Spin wrapperClassName="article-spin" spinning={this.state.loading} delay={500}>
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
				<div className="comments">
					<Form.Item colon={false} label={<Avatar>汪</Avatar>} labelAlign={'left'} labelCol={{span: 1}} wrapperCol={{span: 23}}>
						<TextArea rows={4} value={this.state.commentContent} onInput={e => this.setState({commentContent: e.target.value})} />
					</Form.Item>
					<Form.Item className="comment-confirm">
						<Button
							htmlType="submit"
							onClick={this.createArticleComment}
							type="primary">
							Add Comment
						</Button>
					</Form.Item>
					<List
						dataSource={commentList}
						itemLayout="horizontal"
						renderItem={item => <Comment author={<span>{item.userName}&nbsp;&nbsp;{item.createTime}</span>} avatar={<Avatar>{item.userName}</Avatar>} content={item.content} />}/>
				</div>
			</div>
		</Spin>
	}
}
export default ArticleDetail
