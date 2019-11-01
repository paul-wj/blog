import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import AppHeader from '../header/index'
import AppSider from '../sider/index'
import {Layout, Row, Col, BackTop, notification} from 'antd'
import {noticeTypeList} from "../../../../conf";
import {getUnreadMessageList} from '../../../../redux/common/actions'
import WebSocket from "../../../../lib/plugins/web-socket";

const {
	Header
} = Layout;


@connect(state => ({userInfo: state.user.userInfo}), {getUnreadMessageList})
@withRouter
class WebLayout extends Component {
	static propTypes = {
		children: PropTypes.node
	};

	componentDidMount() {
		const {userInfo: {userId}} = this.props;
		const token = localStorage.getItem('authorization');
		const isLogin = userId && token;
		if (isLogin) {
			this.startWebSocketServer(userId);
		}
	}

	componentWillReceiveProps = nextProps => {
		const {userInfo: {userId}} = this.props;
		const {userId: currentUserId} = nextProps.userInfo;
		if (userId !== currentUserId) {
			if (currentUserId) {
				const token = localStorage.getItem('authorization');
				const isLogin = currentUserId && token;
				isLogin && this.startWebSocketServer(currentUserId);
			} else {
				this.disconnectWebSocketServer();
			}
		}
	};

	componentWillUnmount() {
		this.disconnectWebSocketServer()
	}


	static createWebSocket(id, webSocket) {
		window[`sockets_${id}`] = webSocket;
	}


	startWebSocketServer(userId) {
		const webSocket = new WebSocket();
		webSocket.connect('ws://188.188.188.233:9000', '/notice');

		webSocket.register('connect', ()=>{
			console.log('Socket connected');
			webSocket.socket.emit('joinNoticeRoom', userId);
			WebLayout.createWebSocket(userId, webSocket);
			// webSocket.socket.emit('sendNotice', '123123');
		});

		webSocket.register('disconnect', ()=>{
			console.log('Socket disconnected');
		});

		webSocket.register('error', (msg)=>{
			console.log(msg);
		});

		webSocket.register('getNotice', data => {
			const {sendName, content, title, type} = data;
			this.props.getUnreadMessageList();
			notification.open({
				message: `${sendName}${noticeTypeList[type]}"${title}"`,
				description: content,
			});
		});
	}

	disconnectWebSocketServer() {
		const {userInfo: {userId}} = this.props;
		window[`sockets_${userId}`] = null;
		delete window[`sockets_${userId}`];
	}

	render() {
		const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 };
		const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 };
		return <Layout className="app-container">
			<Header className="app-header"><AppHeader/></Header>
			<Layout className="app-content">
				<Row className="app-row">
					<Col {...siderLayout}><AppSider/></Col>
					<Col className="app-col" {...contentLayout}>
						<article className="app-content-wrapper">{this.props.children}</article>
					</Col>
				</Row>
			</Layout>
			<BackTop target={() => document.querySelector('.app-content-wrapper')} />
		</Layout>
	}
}
export default WebLayout;
