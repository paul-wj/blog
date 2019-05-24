import React, { Component, Fragment } from 'react'
import {withRouter} from "react-router-dom";
import {translateMarkdown} from '../../../../lib/utils'
import { Spin, Icon, Comment, Form, Button, List, Input, Avatar, Tooltip} from 'antd';
import { connect } from 'react-redux'
import Tags from "../../compoents/base/tags";
import FormItem from '../../../admin/compoents/base/form-item'
import './index.scss'

import relativeTime from 'dayjs/plugin/relativeTime'
import moment from 'dayjs'
moment.extend(relativeTime);

const TextArea = Input.TextArea;


@connect(state => ({
	tagList: state.article.tagList,
	categoryList: state.article.categoryList,
	userInfo: state.user.userInfo
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

				this.setState({
					commentList: res.data.map(item => {
						return Object.assign({}, item, {isReply: false})
					})
				})
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

	openReplyContainer(index) {
		if (typeof index !== 'number') {
			return
		}
		const {commentList} = this.state;
		const currentCommentIsReply = commentList[index].isReply;
		commentList[index].isReply = !currentCommentIsReply;
		this.setState({commentList})
	}

	componentDidMount = () => {
		const id = this.props.match.params.id - 0;
		this.getArticleById(id);
		this.getArticleCommentList(id);
	};

	componentWillReceiveProps = nextProps => {
		const id = nextProps.match.params.id - 0;
		this.getArticleById(id);
		this.getArticleCommentList(id);
	};

	render() {
		const {userInfo} = this.props;
		const {title, content, updateTime, tagIds, categories, commentList, loading} = this.state;

		return <div className="article-detail">
			<Spin tip="Loading..." className="article-spin" size="large" spinning={loading}/>
			<div className="article-header">
				<h1>{title}</h1>
				<div className="article-msg">
					{updateTime ? <Icon type="clock-circle" /> : null}&nbsp;{updateTime}
					{tagIds.length ? <Tags type="tags" list={tagIds} /> : null}
					{categories.length ? <Tags type="categories" list={categories} /> : null}
				</div>
			</div>
			<div className="description" dangerouslySetInnerHTML={{ __html: content }} />

			{title ? <div className="comments">
				<FormItem labelWidth={40}>
					<div slot="label"><Avatar>{userInfo.username}</Avatar></div>
					<TextArea rows={4} value={this.state.commentContent} onInput={e => this.setState({commentContent: e.target.value})} />
				</FormItem>
				<Form.Item className="comment-confirm">
					<Button
						htmlType="submit"
						onClick={this.createArticleComment}
						type="primary">
						添加评论
					</Button>
				</Form.Item>
				<List
					dataSource={commentList}
					itemLayout="horizontal"
					renderItem={(item, index) => <Comment
						actions={ userInfo.userId !== item.userId ? [
							<span><Tooltip title="Like"><Icon type="like"/></Tooltip><span style={{ paddingLeft: 8, cursor: 'auto' }}>1</span></span>,
							<span><Tooltip title="Dislike"><Icon type="dislike"/></Tooltip><span style={{ paddingLeft: 8, cursor: 'auto' }}>{1}</span></span>,
							<span onClick={this.openReplyContainer.bind(this, index)}>{`${item.isReply ? '取消' : ''}回复`}</span>,
						] : null}
						author={<span>{item.userName}</span>}
						avatar={<Avatar>{item.userName}</Avatar>}
						datetime={
							<Tooltip title={moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}>
								<span>{moment(item.createTime).fromNow()}</span>
							</Tooltip>
						}
						content={item.content}>
						{item.isReply ? <Fragment>
							<FormItem key={item.id} labelWidth={0}>
								<TextArea rows={4} value={this.state.commentContent} onInput={e => this.setState({commentContent: e.target.value})} />
							</FormItem>
							<p style={{textAlign: 'right', paddingRight: '10px'}}><Button htmlType="submit" type="primary">发布</Button></p>
						</Fragment> : null}
					</Comment>}/>
			</div> : null}
		</div>
	}
}
export default ArticleDetail
