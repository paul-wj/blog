import React, {Component} from 'react'
import {Icon, Badge, Dropdown, Tabs, Button, List, Avatar} from 'antd'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {getUnreadMessageList} from '../../../../redux/common/actions'
import {noticeTypeList, noticeRouterList} from "../../../../conf";

const { TabPane } = Tabs;
const ButtonGroup = Button.Group;

const badgeStyle = {
	minWidth: '10px',
	height: '14px',
	padding: '0 4px',
	lineHeight: '14px',
	borderRadius: '50%'
};



@connect(state => ({
	unreadMessageList: state.app.unreadMessageList
}), {getUnreadMessageList})
@withRouter
class UserNotice extends Component {

	state = {
		visible: false,
		noticeContainerVisible: false,
		unreadMessageList: []
	};


	async readMessage(messageId, type, sourceId) {
		const res = await this.$webApi.readMessage({messageId});
		if (res.flags === 'success') {
			this.props.getUnreadMessageList();
			this.goNoticeRouter(type, sourceId)
		}
	}

	clearUnreadMessage = async () => {
		const messageIdList = this.props.unreadMessageList.map(item => item.messageId);
		if (!messageIdList.length) {
			this.$toast.warning('暂无可清空消息');
			return
		}
		const res = await this.$webApi.clearUnreadMessage({messageIdList});
		if (res.flags === 'success') {
			this.props.getUnreadMessageList();
		}
	};

	handleVisibleChange = visible =>{
		if (visible) {
			this.props.getUnreadMessageList();
		}
		this.setState({visible, noticeContainerVisible: visible});
	};

	onNoticeContainerClick = e => {
		e.stopPropagation();
		this.setState({noticeContainerVisible: true});
	};

	goNoticeRouter(type, sourceId) {
		this.props.history.push(`${noticeRouterList[type]}${sourceId}`)
	}

	getNoticeList(noticeData) {
		const {item, i} = noticeData;
		const {content, createDate, title, type, sourceId, profilePicture, sendName, messageId} = item;
		const titleResult = `${sendName}${noticeTypeList[type]}"${title}"`;
		const titleStyle = {
			color: 'rgba(0,0,0,.65)',
			fontSize: '14px',
		};
		return <List.Item key={`${item.id}_${i}`}>
			<List.Item.Meta
				avatar={<Avatar src={profilePicture} />}
				title={<span style={titleStyle}>{titleResult}</span>}
				description={
					<div>
						<div>{content}</div>
						<div>{createDate}</div>
					</div>
				}
				onClick={() => {this.readMessage(messageId, type, sourceId)}}
			/>
		</List.Item>
	}

	getNoticeContainer() {
		const {unreadMessageList} = this.props;
		const unreadMessageCounts = unreadMessageList.length;
		return <div className="notice-container" onClick={this.onNoticeContainerClick}>
			<Tabs defaultActiveKey="1">
				<TabPane tab={`消息${unreadMessageCounts ? `(${unreadMessageCounts})` : ''}`} key="1">
					<div className="notice-content">
						<List
							dataSource={unreadMessageList}
							renderItem={(item, i) => this.getNoticeList({item, i})}
						/>
					</div>
					<ButtonGroup>
						<Button onClick={this.clearUnreadMessage}>清空消息</Button>
					</ButtonGroup>
				</TabPane>
			</Tabs>
		</div>
	}


	componentDidMount() {
		this.props.getUnreadMessageList();
	}

	render() {
		const {unreadMessageList} = this.props;
		const {visible, noticeContainerVisible} = this.state;
		const popoverProps = {
			visible: noticeContainerVisible
		};
		return (
			<Dropdown
				placement="bottomRight"
				visible={visible}
				trigger={['click']}
				overlay={this.getNoticeContainer()}
				onVisibleChange={this.handleVisibleChange}
				{...popoverProps}
			>
				<div className="user-notice">
					<Badge style={badgeStyle} count={unreadMessageList.length}>
						<Icon style={{fontSize: '16px'}} type="bell"/>
					</Badge>
				</div>
			</Dropdown>
		);
	}
}

export default UserNotice;
