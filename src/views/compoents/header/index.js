import React, { Component } from 'react'
import {Row, Col} from 'antd'

import HeaderLeft from './header-left'
import HeaderSearch from './header-search'
import HeaderNav from './header-nav'
import '../../../static/scss/layout.scss'
import './scss/index.scss'

import { NAV_LIST } from '../../conf/index'
const headerLeftResponsive = {xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24 };
const headerRightResponsive = {xxl: 20, xl: 19, lg: 19, sm: 20, xs: 0 };
class Header extends Component{
	constructor(props) {
		super(props);
		this.state = {
			test: 123
		}
	}
	render() {
		return <Row>
			<Col {...headerLeftResponsive}><HeaderLeft/></Col>
			<Col {...headerRightResponsive}>
				<HeaderSearch/>
				<HeaderNav navList={NAV_LIST}/>
			</Col>
		</Row>
	}
}
export default Header;
