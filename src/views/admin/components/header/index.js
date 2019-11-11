import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Icon, Layout} from "antd";

import { connect } from 'react-redux'
import {toggleCollapsed} from '../../../../redux/app/actions'
const { Header } = Layout;

@connect(state => ({
	collapsed: state.app.collapsed,
}), {toggleCollapsed})
@withRouter
class adminHeader extends Component {

	render() {
		const {collapsed} = this.props;
		return <Header style={{ background: '#fff', padding: '0 12px'}}>
			<Icon
				style={{fontSize: '20px'}}
				className="trigger"
				type={collapsed ? 'menu-unfold' : 'menu-fold'}
				onClick={() => {this.props.toggleCollapsed(!collapsed)}}/>
		</Header>;
	}
}
export default adminHeader;

