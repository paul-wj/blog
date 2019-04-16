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

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {navList, mode} = this.props;
		return <Menu className="header-menu" selectedKeys={[this.props.location.pathname]} mode={mode}>
			{navList.map(nav => <Menu.Item key={nav.link}>
				<Link to={nav.link}>
					{nav.icon && <Icon type={nav.icon}/>}
					<span>{nav.title}</span>
				</Link>
			</Menu.Item>)}
		</Menu>
	}
}

export default HeaderNav;
