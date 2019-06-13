import React, {Component} from 'react'
import { Row, Col, Card, Tooltip, Icon} from 'antd';
import './index.scss'
class Statistics extends Component{
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
							<div className="statistics--card--top--total">123</div>
						</div>
						<div className="statistics--card--content">
							<div className="statistics--card--content--fixed">
								<span>周同比 <i>12％</i><Icon type="caret-up" /></span>
								<span>日同比 <i>11％</i><Icon type="caret-down" /></span>
							</div>
						</div>
						<div className="statistics--card--footer">
							<span>日文章数</span>1
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	}
}

export default Statistics;
