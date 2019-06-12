import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom";
import {Badge, Tag} from "antd"
import './index.scss'
import { connect } from 'react-redux'
import {getCategories} from '../../../../redux/article/actions'

@connect(state => ({
	categoryList: state.article.categoryList,
}), {getCategories})
@withRouter
class Categories extends Component{

	componentDidMount() {
		this.props.getCategories();
	}

	render() {
		const {categoryList} = this.props;
		return <div className="categories">
			<div className="categories--title">Categories</div>
			<p className="categories--total">The total number of categories is {categoryList.length}</p>
			{categoryList.map(category => (<Badge key={category.id} count={category.counts}><Tag color={category.color}>{ category.name }</Tag></Badge>))}
		</div>
	}
}
export default Categories
