import React, {Component} from 'react'
import {Icon, Dropdown, Menu, Drawer} from 'antd'
import Music from '../sider/music'
import PropTypes from "prop-types";
import {Link, withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {logout} from '../../../../redux/user/actions'
import {openAuthModal} from "../../../../redux/common/actions";

@connect(state => ({userInfo: state.user.userInfo}), {logout, openAuthModal})
@withRouter
class HeaderLeft extends Component{
	static propTypes = {
		navList: PropTypes.array.isRequired,
	};
	static defaultProps = {
		navList: []
	};

	state = {
		isShowMusic: false
	};

	menuChangeFn = ({item, key, keyPath, selectedKeys, domEvent}) => {
		if (key === '修改账户信息') {
			this.props.openAuthModal('editUser')
		}
		if (key === '退出登录') {
			this.props.logout()
		}
		if (key === '登录') {
			this.props.openAuthModal('login')
		}
		if (key === '注册') {
			this.props.openAuthModal('register')
		}
	};

	toggleOpenDrawer() {
		const {isShowMusic} = this.state;
		this.setState({isShowMusic: !isShowMusic})
	}

	getMenuDom = () => {
		const {navList, location, userInfo} = this.props;
		const token = localStorage.getItem('authorization');
		const currentNavList = navList.slice().concat(userInfo.userId && token ? [{name: '修改账户信息', type: 20},{name: '退出登录', type: 20}] : [{name: '登录', type: 20},{name: '注册', type: 20}]);
		return	(<Menu onClick={this.menuChangeFn} className="header-menu" selectedKeys={[location.pathname]}>
		    {currentNavList.map(nav => <Menu.Item key={nav.path || nav.name}>
			    {nav.type === 10 ?  <Link to={nav.path}>
				    {nav.icon && <Icon type={nav.icon}/>}
				    <span>{nav.name}</span>
			    </Link> : nav.name}
		    </Menu.Item>)}
	    </Menu>);
	};

	render() {
		const {toggleOpenDrawer} = this;
		return <div className="header-left">
			<i onClick={toggleOpenDrawer.bind(this)} className="iconfont icon-yinle header-music" />
			<Icon type="wechat" style={{color: '#52c41a', fontSize: '24px'}} />
			<span className="header-title">汪小二的博客</span>
			<Dropdown overlayClassName="header-dropdown" trigger={['click']} overlay={this.getMenuDom()}>
				<i className="iconfont icon-menu nav-phone-icon" />
			</Dropdown>
			<Drawer
				placement="top"
				height="100%"
				closable={false}
				visible={this.state.isShowMusic}
				className="music-container"
			>
				<Music className="music-mobile" />
				<span className="music-mobile-close"><i onClick={toggleOpenDrawer.bind(this)} className="iconfont icon-close" /></span>
			</Drawer>
		</div>
	}
}
export default HeaderLeft;
