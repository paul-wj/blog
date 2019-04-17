import React, { Component } from 'react'
import {Divider, Icon} from 'antd';
import './index.scss'
class Home extends Component {
	state = {
		list: [],
		total: 0,
		loading: false
	};

	async getArticleAllList() {
		let res = await this.$webApi.getArticleAllList();
		console.log(res)
	}

	componentDidMount() {
		this.getArticleAllList();
	}



	render() {
		const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
		return <div className="article-content">
			<ul>
				{arr.map((item, index) => <li key={index} className="article-content-list">
					<Divider orientation="left">
                    <span className="title">
                      123213
                    </span>
						<span className="create-time">123123</span>
					</Divider>
					<div className="article-detail description"/>
					<div className="list-item-action">
						<Icon type="message" style={{ marginRight: 7 }} />
						1
					</div>
				</li>)}
			</ul>
		</div>
	}
}
export default Home
