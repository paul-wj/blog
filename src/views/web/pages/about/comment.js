import React, {Component, Fragment} from 'react'
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {Form, Input, Button, Comment, Avatar, Icon, List, Tooltip} from 'antd';
import './index.scss'
import FormItem from "../../../admin/components/base/form-item";

import relativeTime from 'dayjs/plugin/relativeTime'
import dayJs from 'dayjs'
dayJs.extend(relativeTime);

const { TextArea } = Input;

const UserAvatar = ({userId, profilePicture, avatarColor, username}) => {
	if (userId) {
		if (profilePicture) {
			return <Avatar src={profilePicture}/>
		} else {
			return <Avatar style={{backgroundColor: avatarColor}}>{username}</Avatar>
		}
	} else {
		return <Icon style={{fontSize: '32px', color: '#ccc'}} type="github" />;
	}
};

const CommentEditor = ({ onChange, onSubmit, loading, value }) => (
	<div>
		<Form.Item>
			<TextArea placeholder="尽情留言吧..." rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item labelAlign="right">
			<Button style={{width: '100%'}} htmlType="submit" loading={loading} onClick={onSubmit} type="primary">留言</Button>
		</Form.Item>
	</div>
);

const CommentContent = ({ comment, commentIndex, toggleCommentIsReply, children, onChange, onSubmit}) => {
	const {isReply, userId, userName, userPic, content, createTime} = comment;
	return (
		<Comment
			actions={[<span onClick={toggleCommentIsReply.bind(this, commentIndex)} key="comment-nested-reply-to">{`${isReply ? '取消' : ''}回复`}</span>]}
			author={userName}
			avatar={
				<UserAvatar
					userId={userId}
					profilePicture={userPic}
					username={userName}
				/>
			}
			content={content}
			datetime={
				<Tooltip title={dayJs(createTime).format('YYYY-MM-DD HH:mm:ss')}>
					<span>{dayJs(createTime).fromNow()}</span>
				</Tooltip>
			}
		>
			{isReply ? <Fragment>
				<FormItem key={comment.id} labelWidth={0}>
					<TextArea onChange={e => onChange(e, commentIndex)} placeholder={`回复@${userName}：`} rows={4}/>
				</FormItem>
				<p style={{textAlign: 'right', paddingRight: '10px'}}>
					<Button htmlType="submit" onClick={onSubmit.bind(this, 10, commentIndex)} type="primary">发送</Button>
				</p>
			</Fragment> : null}
			{children}
		</Comment>
	)
};

const CommentReply = ({ reply, commentIndex, replyIndex, toggleCommentReplyIsReply, onChange, onSubmit }) => {
	const {content, createTime, userId, userName, userPic, isReply, commentContent, replyId, replyContent} = reply;
	return (
		<Comment
			actions={[<span onClick={toggleCommentReplyIsReply.bind(this, commentIndex, replyIndex)} key="comment-nested-reply-to">{`${isReply ? '取消' : ''}回复`}</span>]}
			author={userName}
			avatar={
				<UserAvatar
					userId={userId}
					profilePicture={userPic}
					username={userName}
				/>
			}
			content={<p>{content}<span style={{color: '#f26f20', marginLeft: '10px'}}>{`//@${userName}`}：{replyId ? replyContent : commentContent}</span></p>}
			datetime={
				<Tooltip title={dayJs(createTime).format('YYYY-MM-DD HH:mm:ss')}>
					<span>{dayJs(createTime).fromNow()}</span>
				</Tooltip>
			}
		>
			{isReply ? <Fragment>
				<FormItem key={reply.id} labelWidth={0}>
					<TextArea placeholder={`回复@${userName}：`} onChange={e => onChange(e, commentIndex, replyIndex)} rows={4}/>
				</FormItem>
				<p style={{textAlign: 'right', paddingRight: '10px'}}>
					<Button htmlType="submit" onClick={onSubmit.bind(this, 20, commentIndex, replyIndex)} type="primary">发送</Button>
				</p>
			</Fragment> : null}
		</Comment>
	);
};

const CommentReplyList = ({ list, commentIndex, toggleCommentReplyIsReply, onChange, onSubmit }) => (
	<List
		dataSource={list}
		itemLayout="horizontal"
		renderItem={(reply, replyIndex) => <CommentReply
			commentIndex={commentIndex}
			reply={reply}
			replyIndex={replyIndex}
			toggleCommentReplyIsReply={toggleCommentReplyIsReply}
			onChange={onChange}
			onSubmit={onSubmit}
		/>}
	/>
);

@connect(state => ({
	userInfo: state.user.userInfo
}))
@withRouter
class AboutComment extends Component {

	state = {
		content: '',
		commentReplyContent: '',
		replyToReplyContent: '',
		commentSubmitLoading: false,
		commentList: []
	};

	getCurrentComment = commentIndex => {
		const {commentList} = this.state;
		return commentList[commentIndex];
	};

	getCurrentReply = (commentIndex, replyIndex) => {
		return this.getCurrentComment(commentIndex).replyList[replyIndex];
	};

	toggleCommentIsReply = commentIndex => {
		const {commentList} = this.state;
		const currentComment = this.getCurrentComment(commentIndex);
		const currentIsReply = currentComment.isReply;
		currentComment.isReply = !currentIsReply;
		this.setState({commentList});
	};

	toggleCommentReplyIsReply = (commentIndex, replyIndex) => {
		const {commentList} = this.state;
		const currentReply = this.getCurrentReply(commentIndex, replyIndex);
		const currentIsReply = currentReply.isReply;
		currentReply.isReply = !currentIsReply;
		this.setState({commentList});
	};

	commentChangeHandle = e => {
		this.setState({content: e.target.value});
	};

	commentReplyChangeHandle = (e, commentIndex) => {
		const {commentList} = this.state;
		const value = e.target.value;
		const currentComment = this.getCurrentComment(commentIndex);
		currentComment.replyContent = value;
		this.setState({commentList});
	};

	replyToReplyChangeHandle = (e, commentIndex, replyIndex) => {
		const {commentList} = this.state;
		const value = e.target.value;
		const currentReply = this.getCurrentReply(commentIndex, replyIndex);
		currentReply.replyContent = value;
		this.setState({commentList});
	};

	getAboutCommentList = async () => {
		const res = await this.$webApi.getAboutCommentList();
		if (res.flags === 'success') {
			this.setState({commentList: []});
			const result = res.data;
			if (result && result.length) {
				this.setState({commentList: result.map(item => Object.assign({}, item, {
					isReply: false,
					replyList: item.replyList.map(reply => Object.assign({}, reply, {
						isReply: false,
						replyContent: reply.replyId ? item.replyList.find(replyInfo => replyInfo.id === reply.replyId).content : ''}))
				}))})
			}
		}
	};

	createAboutComment = async () => {
		const {userId} = this.props.userInfo;
		if (!userId) {
			this.$toast.warning('请登录后留言!');
			return
		}
		const {content} = this.state;
		this.setState({commentSubmitLoading: true});
		const res = await this.$webApi.createAboutComment({content});
		if (res.flags === 'success') {
			this.getAboutCommentList();
			this.setState({content: ''});
		}
		this.setState({commentSubmitLoading: false});
	};

	createAboutCommentReply = async (replyType, commentIndex, replyIndex) => {
		const {userId} = this.props.userInfo;
		if (!userId) {
			this.$toast.warning('请登录后留言!');
			return
		}
		const {commentList} = this.state;
		const currentComment = this.getCurrentComment(commentIndex);
		const currentMessage = replyType === 10 ? currentComment : this.getCurrentReply(commentIndex, replyIndex);
		const content = currentMessage.replyContent || '';
		const {userId: sendId, id} = currentMessage;
		const res = await this.$webApi.createAboutCommentReply({replyType, sendId, commentId: currentComment.id, replyId: replyType === 10 ? null : id, content});
		if (res.flags === 'success') {
			this.getAboutCommentList();
			this.setState({commentList});
		}
	};

	componentDidMount = () => {
		this.getAboutCommentList();
	};

	render() {
		const {userId, profilePicture, avatarColor, username} = this.props.userInfo;
		const {content, commentSubmitLoading, commentList} = this.state;
		return <div className="about-comment">
			<Comment
				avatar={
					<UserAvatar
						userId={userId}
						profilePicture={profilePicture}
						avatarColor={avatarColor}
						username={username}
					/>
				}
				content={
					<CommentEditor
						value={content}
						loading={commentSubmitLoading}
						onChange={this.commentChangeHandle}
						onSubmit={this.createAboutComment}
					/>
				}
			/>
			{
				commentList.length > 0 && commentList.map((comment, commentIndex) => {
					return <CommentContent
						comment={comment}
						commentIndex={commentIndex}
						toggleCommentIsReply={this.toggleCommentIsReply}
						onChange={this.commentReplyChangeHandle}
						onSubmit={this.createAboutCommentReply}>
						{comment.replyList.length > 0 && <CommentReplyList
							list={comment.replyList}
							commentIndex={commentIndex}
							toggleCommentReplyIsReply={this.toggleCommentReplyIsReply}
							onChange={this.replyToReplyChangeHandle}
							onSubmit={this.createAboutCommentReply}/>}
					</CommentContent>
				})
			}
		</div>
	}
}
export default AboutComment;
