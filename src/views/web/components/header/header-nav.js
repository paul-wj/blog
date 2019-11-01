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

	render() {
		const {navList, mode} = this.props;
		return <Menu className="header-menu" selectedKeys={[this.props.location.pathname]} mode={mode}>
			{navList.map(nav => <Menu.Item key={nav.path}>
				<Link to={nav.path}>
					{nav.iconType ? nav.iconType === 10 ? <Icon type={nav.iconClassName}/> : <i className={`iconfont ${nav.iconClassName}`}/> : null}
					<span>{nav.name}</span>
				</Link>
			</Menu.Item>)}
		</Menu>
	}
}

export default HeaderNav;
