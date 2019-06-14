import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom'
import {Divider, Table, Tag, Popconfirm} from 'antd'
import {connect} from 'react-redux'
import {getArticleList} from '../../../../redux/article/actions'
@connect(state => ({
	tagList: state.article.tagList,
	categoryList: state.article.categoryList
}), {getArticleList})
@withRouter
class ArticleList extends Component {
	constructor(props){
		super(props);
		this.state = {
			tableColumns : [
				{ title: 'id', dataIndex: 'id', align: 'center'},
				{ title: '标题', dataIndex: 'title', align: 'center'},
				{ title: '标签', dataIndex: 'tagIds', align: 'center', render: value => <div style={{lineHeight: '24px'}}>{this.props.tagList.filter(item => value.includes(item.id)).map(tag => <Tag key={tag.id} color={tag.color}>{tag.name}</Tag>)}</div>},
				{ title: '目录', dataIndex: 'categories', align: 'center', render: value => <div style={{lineHeight: '24px'}}>{this.props.categoryList.filter(item => value.includes(item.id)).map(tag => <Tag key={tag.id} color="#2db7f5">{tag.name}</Tag>)}</div>},
				{ title: '更新时间', dataIndex: 'updateTime', align: 'center'},
				{ title: '创建时间', dataIndex: 'createTime', align: 'center'},
				{ title: '操作', align: 'center',  key: 'action',
					render: (value, record) => (<div>
						<button className="link-button"><Link to={{pathname: '/admin/article-edit', state: { articleId: record.id }}}>编辑</Link></button>
						<Divider type="vertical" />
						<Popconfirm title={`确定删除文章"${record.title}"吗?`} onConfirm={this.deleteArticle.bind(this, record.id)} okText="确定" cancelText="取消">
							<button className="link-button">删除</button>
						</Popconfirm>
					</div>)}],
			tableData: [],
			loading: false,
			pagination: {
				showSizeChanger: true,
				total: 0,
				defaultCurrent: 1,
				pageSize: 10,
				current: 1,
				onChange: this.changePaginationCurrent,
				onShowSizeChange: this.onShowSizeChange
			},
			limit: 10,
			offset: 0,
		}
	}

	getArticlePageList = async () => {
		const {limit, offset, pagination} = this.state;
		this.setState({loading: true});
		this.props.getArticleList();
		let res = await this.$webApi.getArticleSimplePageList({limit, offset});
		if (res.flags === 'success') {
			let result = res.data;
			this.setState({tableData: [], total: 0});
			if (result) {
				let items = result.items;
				this.setState({tableData: items, pagination: Object.assign({}, pagination, {total: result.total})})
			}
		}
		this.setState({loading: false});
	};

	deleteArticle = async id => {
		let res = await this.$webApi.deleteArticle(id);
		if (res.flags === 'success') {
			this.$toast.success('删除成功');
			this.getArticlePageList();
		}
	};

	onShowSizeChange =  async (current, pageSize) => {
		const {pagination} = this.state;
		await this.setState({
			pagination: Object.assign({}, pagination, {current, pageSize}),
			limit: pageSize * current,
			offset: pageSize * (current - 1)});
		this.getArticlePageList();
	};

	changePaginationCurrent = async (current, pageSize) => {
		const {pagination} = this.state;
		await this.setState({
			pagination: Object.assign({}, pagination, {current}),
			limit: pageSize * current,
			offset: pageSize * (current - 1)});
		this.getArticlePageList();
	};

	componentDidMount() {
		this.getArticlePageList();
	}

	render() {
		const { tableColumns, tableData, loading, pagination} = this.state;
		return <div>
			<Table rowKey={record => record.id} columns={tableColumns} pagination={pagination} dataSource={tableData} bordered={true} loading={loading}  scroll={{y: 600 }}/>
		</div>
	}
}

export default ArticleList;
