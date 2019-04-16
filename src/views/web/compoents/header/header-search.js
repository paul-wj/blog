import React, { Component } from 'react'
import {Icon, Input, Row, Col} from 'antd'
import { withRouter } from 'react-router-dom'

@withRouter
class HeaderSearch extends Component{
	render() {
		return <Row className="header-search">
			<Col>
				<Icon
					className="header-search-icon"
					type="search"/>
				<Input
					className="header-search-input"
					placeholder="搜索"/>
			</Col>
		</Row>
	}
}
export default HeaderSearch;
