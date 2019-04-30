import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { Icon, Tag, Divider } from 'antd'
import { connect } from 'react-redux'


@connect(state => ({
	tagList: state.article.tagList,
	categoryList: state.article.categoryList
}))

@withRouter
class Tags extends Component {

	static propTypes = {
		type: PropTypes.string.isRequired,
		list: PropTypes.array.isRequired
	};

	static defaultProps = {
		type: 'tags',
		list: []
	};

	render() {
		const { tagList, categoryList, type, list } = this.props;
		let currentList = type === 'tags' ? tagList.filter(item => list.includes(item.id)) : categoryList.filter(item => list.includes(item.id));
		return (
			<Fragment>
				<Divider type="vertical" />
				{type === 'tags' ? (
					<Icon type="tag" style={{ marginRight: 7, verticalAlign: 'middle' }} />
				) : (
					<Icon type="folder" style={{ marginRight: 7 }} />
				)}
				{currentList.map((item, i) => (
					<Tag color={type === 'tags' ? item.color : '#2db7f5'} key={item.name}>
						<Link to={`/${type}/${item.name}`}>{item.name}</Link>
					</Tag>
				))}
			</Fragment>
		)
	}
}

export default Tags
