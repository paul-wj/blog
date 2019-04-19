import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import adminRoutes from '../../router'
import './index.scss'

import {Icon, Layout, Menu} from "antd";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

@withRouter
class adminSider extends Component {
	state = {
		collapsed: false,
		menuList: []
	};

	getMenuList = () => {
		let prePath = `/${adminRoutes[0].path}`;
		let routes = this.$lodash.cloneDeep(adminRoutes[0].childRoutes);
		let callback = (routes) => {
			routes.forEach(route => {
				if (route.path === '' || route.path) {
					route.path =  prePath + (route.path ? `/${route.path}` : route.path);
				}
				if (route.childRoutes && route.childRoutes.length) {
					callback(route.childRoutes, route.path)
				}
			})
		};
		callback(routes);
		return routes;
	};

	createMenuComponent = menuList => (menuList.map(menu => (menu.childRoutes && menu.childRoutes.length ?
				<SubMenu key={menu.path} title={<span>{menu.icon ? <Icon type={menu.icon}/> : null}<span>{menu.name}</span></span>}>{this.createMenuComponent(menu.childRoutes)}</SubMenu> :
				<Menu.Item onClick={() => {this.props.history.push(menu.path)}} key={menu.path}>{menu.icon ? <Icon type={menu.icon} /> : null}<span>{menu.name}</span></Menu.Item>)));

	componentWillMount() {
		let menuList = this.getMenuList();
		this.setState({
			menuList: menuList
		})
	}
	render() {
		let { menuList } = this.state;
		return <Sider
			className="admin-sider"
			trigger={null}
			collapsible
			collapsed={this.state.collapsed}
		>
			<div className="admin-msg">
				<Icon className="admin-logo" type="wechat" style={{color: '#52c41a', fontSize: '24px'}}/>
				博客管理系统
			</div>
			<Menu
				defaultSelectedKeys={[this.props.location.pathname]}
				defaultOpenKeys={['sub1']}
				mode="inline"
				theme="dark"
				inlineCollapsed={this.state.collapsed}>
				{menuList.length ? this.createMenuComponent(menuList) : null}
			</Menu>
		</Sider>;
	}
}
export default adminSider;

