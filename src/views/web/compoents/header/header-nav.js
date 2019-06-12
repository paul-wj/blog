import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {Icon, Menu} from 'antd'
import {Link, withRouter} from 'react-router-dom'

@withRouter
class HeaderNav extends Component {

	static propTypes = {
		navList: PropTypes.array.isRequired,
		mode: PropTypes.string
	};
	static defaultProps = {
		navList: [],
		mode: 'horizontal'
	};

	state = {};

	render() {
		const {navList, mode} = this.props;
		return <Menu className="header-menu" selectedKeys={[this.props.location.pathname]} mode={mode}>
			{navList.map(nav => <Menu.Item key={nav.path}>
				<Link to={nav.path}>
					{nav.icon && <Icon type={nav.icon}/>}
					<span>{nav.name}</span>
				</Link>
			</Menu.Item>)}
		</Menu>
	}
}

export default HeaderNav;
