import React, { Component } from 'react'
import {Icon, Input, Row, Col} from 'antd'
import { withRouter } from 'react-router-dom'

@withRouter
class HeaderSearch extends Component{

	state = {
		keyword: ''
	};

	openResultUrl = () => {
		const {keyword} = this.state;
		this.props.history.push(`/${keyword ? `?current=1&keyword=${keyword}` : ''}`)
	};

	render() {
		const {keyword} = this.state;
		return <Row className="header-search">
			<Col>
				<Icon
					className="header-search-icon"
					type="search"/>
				<Input
					type="text"
					value={keyword}
					onChange={e => this.setState({keyword: e.target.value})}
					onBlur={this.openResultUrl}
					onPressEnter={this.openResultUrl}
					placeholder="搜索文章"
					className="header-search-input"/>
			</Col>
		</Row>
	}
}
export default HeaderSearch;
