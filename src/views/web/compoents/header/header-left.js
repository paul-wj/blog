import React, { Component } from 'react'
import {Icon, Dropdown, Menu } from 'antd'
import PropTypes from "prop-types";
import {Link, withRouter} from 'react-router-dom'

@withRouter
class HeaderLeft extends Component{
	static propTypes = {
		navList: PropTypes.array.isRequired,
	};
	static defaultProps = {
		navList: []
	};
	menuDom = (<Menu className="header-menu" selectedKeys={[this.props.location.pathname]}>
		{this.props.navList.map(nav => <Menu.Item key={nav.path}>
			<Link to={nav.path}>
				{nav.icon && <Icon type={nav.icon}/>}
				<span>{nav.name}</span>
			</Link>
		</Menu.Item>)}
	</Menu>);

	render() {
		return <div className="header-left">
			<Icon type="wechat" style={{color: '#52c41a', fontSize: '24px'}} />
			<span className="header-title">汪小二的博客</span>
			<Dropdown overlayClassName="header-dropdown" trigger={['click']} overlay={this.menuDom}>
				<Icon type="menu-o" className="nav-phone-icon" />
			</Dropdown>
		</div>
	}
}
export default HeaderLeft;
