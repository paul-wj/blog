import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import {Spin, Descriptions} from 'antd';
import './index.scss'
import {getRandomColor} from "../../../../lib/utils";
import dayJs from 'dayjs';

@withRouter
class Home extends Component {
	state = {
		loading: false,
		recipeList: []
	};

	async getCurrentWeekRecipe() {
		this.setState({loading: true});
		let res = await this.$webApi.getCurrentWeekRecipe();
		if (res.flags === 'success') {
			let result = res.data;
			this.setState({recipeList: []});
			if (result) {
				this.setState({recipeList: result})
			}
		}
		this.setState({loading: false});
	}

	componentDidMount() {
		this.getCurrentWeekRecipe()
	}

	render() {
		const {loading, recipeList} = this.state;
		const monday = dayJs().day(1).format('YYYY/MM/DD');
		const sunday = dayJs().day(7).format('YYYY/MM/DD');
		const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
		return <div className="recipe-content">
			<Spin tip="Loading..." className="recipe-content-spin" size="large" spinning={loading}/>
			<div className="recipe-content-wrapper">
				<p className="recipe-content-title"><span style={{color: getRandomColor()}}>{monday}</span>-<span style={{color: getRandomColor()}}>{sunday}</span>晚餐</p>
				<Descriptions
					bordered
					column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
					{recipeList.map((recipe, index) => <Descriptions.Item label={weekDays[index]} key={recipe.id}><font color={getRandomColor()}>{recipe.recipes.toString()}</font></Descriptions.Item>)}
				</Descriptions>
			</div>
		</div>
	}
}
export default Home
