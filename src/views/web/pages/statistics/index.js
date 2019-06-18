import React, {Component} from 'react'
import { Row, Col, Card, Tooltip, Icon} from 'antd';
import './index.scss'

const defaultStatistics = {
	total: 0,
	dayTotal: 0,
	weekTotal: 0,
	weekRingRatio: 0,
	dayRingRatio: 0
};
class Statistics extends Component{

	state = {
		articleStatistics: defaultStatistics,
		commentStatistics: defaultStatistics,
		replyStatistics: defaultStatistics
	};

	getStatisticsForArticle = async () => {
		let res = await this.$webApi.getStatisticsForArticle();
		if (res.flags === 'success') {
			if (res.data) {
				this.setState({articleStatistics: res.data})
			}
		}
	};

	getStatisticsForComment = async () => {
		let res = await this.$webApi.getStatisticsForComment();
		if (res.flags === 'success') {
			if (res.data) {
				this.setState({commentStatistics: res.data})
			}
		}
	};

	getStatisticsForReply = async () => {
		let res = await this.$webApi.getStatisticsForReply();
		if (res.flags === 'success') {
			if (res.data) {
				this.setState({replyStatistics: res.data})
			}
		}
	};

	componentDidMount() {
		this.getStatisticsForArticle();
		this.getStatisticsForComment();
		this.getStatisticsForReply();
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
		const {articleStatistics, commentStatistics, replyStatistics} = this.state;
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
				<Col style={colStyle} {...gridOptions}>
					<Card className="statistics--card">
						<div className="statistics--card--top">
							<div className="statistics--card--top--title">评论数量
								<Tooltip placement="top" title="评论统计数据">
									<Icon className="fr" type="exclamation-circle" />
								</Tooltip>
							</div>
							<div className="statistics--card--top--total">{ commentStatistics.total }</div>
						</div>
						<div className="statistics--card--content">
							<div className="statistics--card--content--fixed">
								<span>周同比 <i>{ commentStatistics.weekRingRatio * 100 }％</i>{commentStatistics.weekRingRatio ? <Icon type={commentStatistics.weekRingRatio > 0 ? 'caret-up' : 'caret-down'} /> : null}</span>
								<span>日同比 <i>{ commentStatistics.dayRingRatio * 100 }％</i>{commentStatistics.dayRingRatio ? <Icon type={commentStatistics.dayRingRatio > 0 ? 'caret-up' : 'caret-down'} /> : null}</span>
							</div>
						</div>
						<div className="statistics--card--footer">
							<span>日评论数</span>{commentStatistics.dayTotal}
						</div>
					</Card>
				</Col>
				<Col style={colStyle} {...gridOptions}>
					<Card className="statistics--card">
						<div className="statistics--card--top">
							<div className="statistics--card--top--title">评论回复数量
								<Tooltip placement="top" title="评论回复统计数据">
									<Icon className="fr" type="exclamation-circle" />
								</Tooltip>
							</div>
							<div className="statistics--card--top--total">{ replyStatistics.total }</div>
						</div>
						<div className="statistics--card--content">
							<div className="statistics--card--content--fixed">
								<span>周同比 <i>{ replyStatistics.weekRingRatio * 100 }％</i>{replyStatistics.weekRingRatio ? <Icon type={replyStatistics.weekRingRatio > 0 ? 'caret-up' : 'caret-down'} /> : null}</span>
								<span>日同比 <i>{ replyStatistics.dayRingRatio * 100 }％</i>{replyStatistics.dayRingRatio ? <Icon type={replyStatistics.dayRingRatio > 0 ? 'caret-up' : 'caret-down'} /> : null}</span>
							</div>
						</div>
						<div className="statistics--card--footer">
							<span>日评论回复数</span>{replyStatistics.dayTotal}
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	}
}

export default Statistics;
