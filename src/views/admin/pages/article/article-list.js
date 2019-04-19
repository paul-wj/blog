import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom'
import {Divider, Table, Tag, Popconfirm } from 'antd'

@withRouter
class ArticleList extends Component {
	constructor(props){
		super(props);
		this.state = {
			tableColumns : [
				{ title: 'id', dataIndex: 'id', align: 'center'},
				{ title: '标题', dataIndex: 'title', align: 'center'},
				{ title: '标签', dataIndex: 'tagIds', align: 'center', render: value => this.state.tagList.filter(item => value.split(',').includes(item.id + '')).map(tag => <Tag key={tag.id} color={tag.color}>{tag.name}</Tag>)},
				{ title: '目录', dataIndex: 'categories', align: 'center', render: value => this.state.tagList.filter(item => value.split(',').includes(item.id + '')).map(tag => <Tag key={tag.id} color="#2db7f5">{tag.name}</Tag>)},
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
			tagList: [],
			categoryList: []
		}
	}
	getArticleAllList = async () => {
		this.setState({loading: true});
		let res = await this.$webApi.getArticleAllList();
		if (res.flags === 'success') {
			let result = res.data;
			this.setState({tableData: []});
			if (result && result.length) {
				this.setState({tableData: result})
			}
		}
		this.setState({loading: false});
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

	deleteArticle = async id => {
		let res = await this.$webApi.deleteArticle(id);
		if (res.flags === 'success') {
			this.$toast.success('删除成功');
			this.getArticleAllList();
		}
	};

	componentDidMount() {
		this.getArticleAllList();
		this.getTagAllList();
		this.getCategoryAllList();
	}

	render() {
		const { tableColumns, tableData, loading } = this.state;
		return <div>
			<Table rowKey={record => record.id} columns={tableColumns} dataSource={tableData} bordered={true} loading={loading} />
		</div>
	}
}

export default ArticleList;
