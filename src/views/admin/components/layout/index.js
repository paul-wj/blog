import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import AdminSider from '../sider'
import AdminHeader from '../header'
import './index.scss'

import { Layout } from 'antd';
const { Content } = Layout;



@withRouter
class adminLayout extends Component {
	state = {
		collapsed: false,
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		return (
			<Layout className="admin-container">
				<AdminSider/>
				<Layout>
					<AdminHeader/>
					<Content
						style={{
							margin: '24px 16px',
							padding: 24,
							background: '#fff',
							minHeight: 280,
							overflow: 'hidden',
							overflowY: 'auto'
						}}>
						{this.props.children}
					</Content>
				</Layout>
			</Layout>
		);
	}
}
export default adminLayout;
