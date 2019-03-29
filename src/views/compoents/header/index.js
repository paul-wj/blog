import React, { Component } from 'react'
import HeaderLeft from './header-left'
import {Row, Col} from 'antd'
import '../../../static/scss/layout.scss'
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
			<Col {...headerRightResponsive} />
		</Row>
	}
}
export default Header;
