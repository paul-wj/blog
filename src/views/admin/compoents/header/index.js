import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Icon, Layout} from "antd";

const { Header } = Layout;

@withRouter
class adminHeader extends Component {
	state = {
		collapsed: false,
	};

	render() {
		return <Header style={{ background: '#fff', padding: 0 }}>
			<Icon
				className="trigger"
				type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
				onClick={this.toggle}
			/>
		</Header>;
	}
}
export default adminHeader;

