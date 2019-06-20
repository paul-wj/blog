import React, {Component} from 'react';
import {Divider, Table, Drawer, Button, Input, Popconfirm } from 'antd'
import FormItem from '../../components/base/form-item'
import { connect } from 'react-redux'
import {getCategories} from '../../../../redux/article/actions'

@connect(state => ({}), {getCategories})
class CategoryList extends Component {
	constructor(props){
		super(props);
		this.state = {
			tableColumns : [
				{ title: 'id', dataIndex: 'id', align: 'center'},
				{ title: '名称', dataIndex: 'name', align: 'center'},
				{ title: '更新时间', dataIndex: 'updateTime', align: 'center'},
				{ title: '创建时间', dataIndex: 'createTime', align: 'center'},
				{ title: '操作', align: 'center',  key: 'action',
					render: (value, record) => (<div>
						<button className="link-button"  onClick={e => this.showEditDrawer(e, record)}>编辑</button>
						<Divider type="vertical" />
						<Popconfirm title={`确定删除目录"${record.name}"吗?`} onConfirm={this.deleteCategory.bind(this, record.id)} okText="确定" cancelText="取消">
							<button className="link-button">删除</button>
						</Popconfirm>
					</div>)}],
			tableData: [],
			loading: false,
			visible: false,
			requestParams: {
				name: null,
				id: null
			}
		}
	}
	getCategoryAllList = async () => {
		this.setState({loading: true});
		let res = await this.props.getCategories();
		if (res.flags === 'success') {
			let result = res.data;
			this.setState({tableData: []});
			if (result && result.length) {
				this.setState({tableData: result})
			}
		}
		this.setState({loading: false});
	};

	createCategory = async () => {
		let res = await this.$webApi.createCategory(this.state.requestParams);
		if (res.flags === 'success') {
			this.$toast.success('创建目录成功');
			this.getCategoryAllList();
			this.closeDrawer();
		}
	};

	editCategory = async id => {
		let res = await this.$webApi.editCategory(id, this.state.requestParams);
		if (res.flags === 'success') {
			this.$toast.success('编辑目录成功');
			this.getCategoryAllList();
			this.closeDrawer();
		}
	};

	deleteCategory = async id => {
		let res = await this.$webApi.deleteCategory(id);
		if (res.flags === 'success') {
			this.$toast.success('删除目录成功');
			this.getCategoryAllList();
		}
	};
	openDrawer = () => {
		this.setState({visible: true,});
	};
	closeDrawer = () => {
		this.setState({
			visible: false,
			requestParams: {
				name: null,
				id: null
			}
		});
	};
	saveDrawer = () => {
		let id = this.state.requestParams.id;
		if (id) {
			this.editCategory(id);
			return
		}
		this.createCategory();
	};

	showEditDrawer = (e, row) => {
		e.preventDefault();
		let {id, name} = row;
		this.setState({
			requestParams: Object.assign({}, this.state.requestParams, {id, name})
		});
		this.openDrawer()
	};

	componentDidMount() {
		this.getCategoryAllList();
	}

	render() {
		const { tableColumns, tableData, loading, visible, requestParams } = this.state;
		return <div>
			<p><Button onClick={this.openDrawer} type="primary">新增目录</Button></p>
			<Table rowKey={record => record.id} columns={tableColumns} dataSource={tableData} bordered={true} loading={loading} />
			<Drawer
				title={`${requestParams.id ? '编辑' : '新增'}目录`}
				placement="right"
				width={350}
				maskClosable={false}
				onClose={this.closeDrawer}
				visible={visible}
			>
				<FormItem labelWidth={70}>
					<div slot="label">目录名称:</div>
					<Input onChange={ e => this.setState({requestParams: Object.assign({}, requestParams, {name: e.target.value})})} value={requestParams.name} placeholder="请输入目录名称" />
				</FormItem>
				<FormItem labelWidth={0}>
					<Button onClick={this.saveDrawer} type="primary">保存</Button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<Button onClick={this.closeDrawer}>取消</Button>
				</FormItem>
			</Drawer>
		</div>
	}
}

export default CategoryList;
