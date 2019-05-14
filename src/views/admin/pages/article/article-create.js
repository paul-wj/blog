import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { Input, Select, Button} from 'antd';
import SimpleMDE from 'simplemde'
import { translateMarkdown } from '../../../../lib/utils'
import 'simplemde/dist/simplemde.min.css'
import './index.scss'
import FormItem from '../../compoents/base/form-item'

const Option = Select.Option;
@withRouter
class ArticleCreate extends Component {
	constructor(props){
		super(props);
		this.state = {
			articleId: null,
			categoryList: [],
			tagList: [],
			requestParams: {
				title: null,
				categories: [],
				tagIds: []
			}
		}
	}

	getArticleById = async id => {
		let res = await this.$webApi.getArticleById(id);
		if (res.flags === 'success') {
			if (res.data) {
				let { title, tagIds, categories, content } = res.data;
				this.smde.value(content);
				this.setState({
					requestParams: Object.assign({}, this.state.requestParams, {title, tagIds, categories})
				})
			}
		}
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

	createArticle = async () => {
		let {title, categories, tagIds} = this.state.requestParams;
		console.log(categories, tagIds)
		let res = await this.$webApi.createArticle({title, categories, tagIds, content: this.smde.value()});
		if (res.flags === 'success') {
			this.$toast.success('保存文章成功');
			this.onSuccess()
		}
	};

	editArticle = async () => {
		let {title, categories, tagIds} = this.state.requestParams;
		let res = await this.$webApi.editArticle(this.state.articleId, {title, categories: categories.toString(), tagIds: tagIds.toString(), content: this.smde.value()});
		if (res.flags === 'success') {
			this.$toast.success('编辑文章成功');
			this.onSuccess()
		}
	};

	onSuccess = () => {
		this.setState({
			articleId: null,
			requestParams: {
				title: null,
				categories: [],
				tagIds: []
			}
		});
		this.smde.value('');
		this.props.history.push('/admin/article-list')
	};

	componentDidMount() {
		this.smde = new SimpleMDE({
			element: document.getElementById('editor').childElementCount,
			autofocus: true,
			autosave: true,
			previewRender: translateMarkdown
		});
		let articleId = this.props.location.state ? this.props.location.state.articleId : null;
		this.setState({articleId});
		if (articleId) {
			this.getArticleById(articleId);
		}
		this.getTagAllList();
		this.getCategoryAllList();
	}

	render() {
		const {value, categoryList, tagList, requestParams} = this.state;
		return <div className="article-create">
			<FormItem labelWidth={70}>
				<div slot="label"><strong>标题:</strong></div>
				<Input value={requestParams.title} onInput={e => this.setState({requestParams: Object.assign({}, requestParams, {title: e.target.value})})} placeholder="请输入标题" />
			</FormItem>
			<FormItem labelWidth={70}>
				<div slot="label"><strong>目录:</strong></div>
				<Select placeholder="请选择目录" allowClear value={requestParams.categories} onChange={value => this.setState({requestParams: Object.assign({}, requestParams, {categories: value})})} mode="multiple" style={{width: '200px'}}>
					{categoryList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
				</Select>
			</FormItem>
			<FormItem labelWidth={70}>
				<div slot="label"><strong>标签:</strong></div>
				<Select placeholder="请选择标签" allowClear mode="multiple" value={requestParams.tagIds} onChange={value => this.setState({requestParams: Object.assign({}, requestParams, {tagIds: value})})} style={{width: '200px'}}>
					{tagList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
				</Select>
			</FormItem>
			<FormItem labelWidth={70}>
				<div slot="label"><strong>内容:</strong></div>
				<textarea id="editor" defaultValue={value} />
			</FormItem>
			<p style={{textAlign: 'center'}}>
				<Button onClick={this.state.articleId ? this.editArticle : this.createArticle}>保存</Button>
			</p>
		</div>
	}
}

export default ArticleCreate;
