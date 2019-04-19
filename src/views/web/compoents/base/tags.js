import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { Icon, Tag, Divider } from 'antd'

@withRouter
class Tags extends Component {

	state = {
		tagList: [],
		categoryList: []
	};

	static propTypes = {
		type: PropTypes.string.isRequired,
		list: PropTypes.array.isRequired
	};

	static defaultProps = {
		type: 'tags',
		list: []
	};

	getTagAllList = async () => {
		let res = await this.$webApi.getTagAllList();
		if (res.flags === 'success') {
			let result = res.data;
			this.setState({tagList: []});
			if (result && result.length) {
				this.setState({tagList: result})
			}
		}
	};

	getCategoryAllList = async () => {
		let res = await this.$webApi.getCategoryAllList();
		if (res.flags === 'success') {
			let result = res.data;
			this.setState({categoryList: []});
			if (result && result.length) {
				this.setState({categoryList: result})
			}
		}
	};
	componentDidMount() {
		this.getTagAllList();
		this.getCategoryAllList();
	}

	render() {
		const { tagList, categoryList } = this.state;
		const { type, list } = this.props;

		let currentList = type === 'tags' ? tagList.filter(item => list.includes(item.id + '')) : categoryList.filter(item => list.includes(item.id + ''));
		return (
			<Fragment>
				<Divider type="vertical" />
				{type === 'tags' ? (
					<Icon type="folder" style={{ marginRight: 7, verticalAlign: 'middle' }} />
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
