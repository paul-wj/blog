import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux'
import {Avatar, Button, Comment, Icon, Input, List, Tooltip} from "antd";

import FormItem from "../../../admin/compoents/base/form-item";

import relativeTime from 'dayjs/plugin/relativeTime'
import moment from 'dayjs'
moment.extend(relativeTime);

const TextArea = Input.TextArea;

@connect(state => ({
	userInfo: state.user.userInfo
}))
@withRouter
class ArticleReply extends Component{

	static propTypes = {
		commentList: PropTypes.array.isRequired
	};

	state = {
		replyContent: null,
		replyToReplyContent: null
	};

	openReplyContainer = index => {
		const {updateCommentList, commentList} = this.props;
		if (typeof index !== 'number') {
			return
		}
		const currentCommentIsReply = commentList[index].isReply;
		commentList[index].isReply = !currentCommentIsReply;
		updateCommentList(commentList)
	};

	createArticleCommentReply = async (index, type) => {
		const {getCommentList, commentList} = this.props;
		const currentComment = commentList[index];
		let res = await this.$webApi.createArticleCommentReply(currentComment.id, {replyWay: 10, content: this.state.replyContent, toUserId: currentComment.userId, type});
		if (res.flags === 'success') {
			if (type === 30) {
				this.$toast.success('回复成功');
			}
			this.setState({replyContent: null});
			getCommentList();
		}
	};
	openReplyToReplyContainer = (commentIndex, replyIndex) => {
		const {updateCommentList, commentList} = this.props;
		const currentComment = commentList[commentIndex];
		const currentReply = currentComment.reply.replyList[replyIndex];
		const currentReplyIsReply = currentReply.isReply;
		currentReply.isReply = !currentReplyIsReply;
		updateCommentList(commentList)
	};
	createArticleReplyToReply = async (commentIndex, replyIndex, type) => {
		const {getCommentList, commentList} = this.props;
		const currentComment = commentList[commentIndex];
		const currentReply = currentComment.reply.replyList[replyIndex];
		let res = await this.$webApi.createArticleCommentReply(currentComment.id, {replyWay: 20, replyId: currentReply.id, content: this.state.replyToReplyContent, toUserId: currentReply.userId, type});
		if (res.flags === 'success') {
			if (type === 30) {
				this.$toast.success('回复成功');
			}
			this.setState({replyToReplyContent: null});
			getCommentList();
		}
	};

	render() {
		const {commentList, userInfo} = this.props;
		return commentList && commentList.length ? <List
			dataSource={commentList}
			itemLayout="horizontal"
			renderItem={(comment, commentIndex) => <Comment
				actions={[
					<span><Tooltip title="Like" onClick={this.createArticleCommentReply.bind(this, commentIndex, 10)}><Icon type="like"/></Tooltip><span style={{ paddingLeft: 8, cursor: 'auto' }}>{comment.reply.likes}</span></span>,
					<span><Tooltip title="Dislike" onClick={this.createArticleCommentReply.bind(this, commentIndex, 20)}><Icon type="dislike"/></Tooltip><span style={{ paddingLeft: 8, cursor: 'auto' }}>{comment.reply.dislikes}</span></span>,
					userInfo.userId !== comment.userId ? <span onClick={this.openReplyContainer.bind(this, commentIndex)}>{`${comment.isReply ? '取消' : ''}回复`}</span> : null,
				]}
				author={<span>{comment.userName}</span>}
				avatar={<Avatar>{comment.userName}</Avatar>}
				datetime={
					<Tooltip title={moment(comment.createTime).format('YYYY-MM-DD HH:mm:ss')}>
						<span>{moment(comment.createTime).fromNow()}</span>
					</Tooltip>
				}
				content={comment.content}>
				{comment.isReply ? <Fragment>
					<FormItem key={comment.id} labelWidth={0}>
						<TextArea rows={4} value={this.state.replyContent} onInput={e => this.setState({replyContent: e.target.value})} />
					</FormItem>
					<p style={{textAlign: 'right', paddingRight: '10px'}}>
						<Button htmlType="submit" onClick={this.createArticleCommentReply.bind(this, commentIndex, 30)} type="primary">发布</Button>
					</p>
				</Fragment> : null}
				{comment.reply.replyList.length ? <List
					dataSource={comment.reply.replyList}
					itemLayout="horizontal"
					renderItem={(reply, replyIndex) => <Comment
						actions={[
							<span><Tooltip title="Like" onClick={this.createArticleReplyToReply.bind(this, commentIndex, replyIndex, 10)}><Icon type="like"/></Tooltip><span style={{ paddingLeft: 8, cursor: 'auto' }}>{1}</span></span>,
							<span><Tooltip title="Dislike" onClick={this.createArticleReplyToReply.bind(this, commentIndex, replyIndex, 20)}><Icon type="dislike"/></Tooltip><span style={{ paddingLeft: 8, cursor: 'auto' }}>{1}</span></span>,
							userInfo.userId !== reply.userId ? <span onClick={this.openReplyToReplyContainer.bind(this, commentIndex, replyIndex)}>{`${reply.isReply ? '取消' : ''}回复`}</span> : null,
						]}
						author={<span>{reply.userName}&nbsp;&nbsp;<i style={{color: '#666', fontStyle: 'normal'}}>回复</i>&nbsp;&nbsp;{reply.toUserName}</span>}
						avatar={<Avatar>{reply.userName}</Avatar>}
						datetime={
							<Tooltip title={moment(reply.createTime).format('YYYY-MM-DD HH:mm:ss')}>
								<span>{moment(reply.createTime).fromNow()}</span>
							</Tooltip>
						}
						content={reply.content}>
						{reply.isReply ? <Fragment>
							<FormItem key={reply.id} labelWidth={0}>
								<TextArea rows={4} value={this.state.replyToReplyContent} onInput={e => this.setState({replyToReplyContent: e.target.value})} />
							</FormItem>
							<p style={{textAlign: 'right', paddingRight: '10px'}}>
								<Button htmlType="submit" onClick={this.createArticleReplyToReply.bind(this, commentIndex, replyIndex, 30)} type="primary">发布</Button>
							</p>
						</Fragment> : null}
					</Comment>}/> : null}
			</Comment>}/> : null;
	}
}

export default ArticleReply;
