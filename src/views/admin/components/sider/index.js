import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import adminRoutes from '../../router'
import { connect } from 'react-redux'
import {setOpenKes, setSelectedKeys} from '../../../../redux/app/actions'
import {cloneDeep} from 'lodash'
import './index.scss'

import {Icon, Layout, Menu} from "antd";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


@connect(state => ({
	collapsed: state.app.collapsed,
	openKeys: state.app.openKeys,
	selectedKeys: state.app.selectedKeys
}), {setOpenKes, setSelectedKeys})
@withRouter
class adminSider extends Component {
	state = {
		collapsed: false,
		menuList: []
	};

	getMenuList = () => {
		let prePath = `/${adminRoutes[0].path}`;
		let routes = cloneDeep(adminRoutes[0].childRoutes);
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

	menuOpenChange = (openKeys) => {
		this.props.setOpenKes(openKeys)
	};

	menuSelect = ({selectedKeys}) => {
		this.props.setSelectedKeys(selectedKeys)
	};

	componentWillMount() {
		let menuList = this.getMenuList();
		this.setState({
			menuList: menuList
		})
	}
	render() {
		const { collapsed, openKeys, selectedKeys } = this.props;
		let { menuList } = this.state;
		return <Sider
			className="admin-sider"
			trigger={null}
			collapsible
			collapsed={collapsed}>
			<div className={`admin-msg ${collapsed ? 'admin-msg__center' : ''}`}>
				<Icon className="admin-logo" type="wechat" style={{color: '#52c41a', fontSize: '16px'}}/>
				{collapsed ? '' : '博客管理系统'}
			</div>
			<Menu
				onOpenChange={this.menuOpenChange}
				onSelect={this.menuSelect}
				defaultOpenKeys={openKeys}
				defaultSelectedKeys={selectedKeys}
				mode="inline"
				theme="dark"
				inlineCollapsed={collapsed}>
				{menuList.length ? this.createMenuComponent(menuList) : null}
			</Menu>
		</Sider>;
	}
}
export default adminSider;

