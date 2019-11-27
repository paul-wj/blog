import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {Icon, Menu} from 'antd'
import {Link, withRouter} from 'react-router-dom'

@connect(state => ({
	appLayoutWidth: state.app.appLayoutWidth
}))
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
		const {navList, mode, appLayoutWidth} = this.props;
		const isExceed_1100 = appLayoutWidth > 1100;
		return <Menu className="header-menu" selectedKeys={[this.props.location.pathname]} mode={mode}>
			{navList.map(nav => <Menu.Item title={nav.name} style={{minWidth: isExceed_1100 ? '' : '50px'}} key={nav.path}>
				<Link to={nav.path}>
					{nav.iconType ? nav.iconType === 10 ? <Icon style={{marginRight: isExceed_1100 ? '' : 0}} type={nav.iconClassName}/> : <i className={`iconfont ${nav.iconClassName}`}/> : null}
					{isExceed_1100 ? <span>{nav.name}</span> : null}
				</Link>
			</Menu.Item>)}
		</Menu>
	}
}

export default HeaderNav;
