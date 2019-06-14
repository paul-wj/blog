import React, {Component} from 'react'
import { Row, Col, Card, Tooltip, Icon} from 'antd';
import './index.scss'
class Statistics extends Component{

	state = {
		articleStatistics: {
			total: 0,
			dayTotal: 0,
			weekTotal: 0,
			weekRingRatio: 0,
			dayRingRatio: 0
		}
	};

	getStatisticsForArticle = async () => {
		let res = await this.$webApi.getStatisticsForArticle();
		if (res.flags === 'success') {
			if (res.data) {
				this.setState({articleStatistics: res.data})
			}
		}
	};
	componentDidMount() {
		this.getStatisticsForArticle()
	}
	render() {
		const gridOptions = {
			xs: {span: 24},
			sm: {span: 24},
			md: {span: 12},
			lg: {span: 12},
			xl: {span: 6}
		};
		const colStyle = {
			marginBottom: '10px'
		};
		const {articleStatistics} = this.state;
		return <div className="statistics">
			<Row gutter={16}>
				<Col style={colStyle} {...gridOptions}>
					<Card className="statistics--card">
						<div className="statistics--card--top">
							<div className="statistics--card--top--title">文章数量
								<Tooltip placement="top" title="文章统计数据">
									<Icon className="fr" type="exclamation-circle" />
								</Tooltip>
							</div>
							<div className="statistics--card--top--total">{ articleStatistics.total }</div>
						</div>
						<div className="statistics--card--content">
							<div className="statistics--card--content--fixed">
								<span>周同比 <i>{ articleStatistics.weekRingRatio * 100 }％</i>{articleStatistics.weekRingRatio ? <Icon type={articleStatistics.weekRingRatio > 0 ? 'caret-up' : 'caret-down'} /> : null}</span>
								<span>日同比 <i>{ articleStatistics.dayRingRatio * 100 }％</i>{articleStatistics.dayRingRatio ? <Icon type={articleStatistics.dayRingRatio > 0 ? 'caret-up' : 'caret-down'} /> : null}</span>
							</div>
						</div>
						<div className="statistics--card--footer">
							<span>日文章数</span>{articleStatistics.dayTotal}
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	}
}

export default Statistics;
