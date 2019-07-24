import React, { Component } from 'react'
import {Row, Col} from 'antd'

import HeaderLeft from './header-left'
import HeaderSearch from './header-search'
import HeaderNav from './header-nav'
import UserInfo from './user-info'
import './index.scss'

import router from '../../router'
const headerLeftResponsive = {xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24 };
const headerRightResponsive = {xxl: 20, xl: 19, lg: 19, sm: 20, xs: 0 };
class Header extends Component{
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		const navList = router[0].childRoutes.filter(item => item.type === 10);
		return <Row>
			<Col {...headerLeftResponsive}><HeaderLeft navList={navList}/></Col>
			<Col className="header-right" {...headerRightResponsive}>
				<HeaderSearch/>
				<UserInfo/>
				<HeaderNav navList={navList}/>
			</Col>
		</Row>
	}
}
export default Header;
