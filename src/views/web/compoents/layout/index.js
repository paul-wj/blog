import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom";
import AppHeader from '../header/index'
import AppSider from '../sider/index'
import { Layout, Row, Col } from 'antd'
const {
	Header
} = Layout;

@withRouter
class WebLayout extends Component {
	static propTypes = {
		children: PropTypes.node
	};
	render() {
		const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 };
		const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 };
		return <Layout className="app-container">
			<Header className="app-header"><AppHeader/></Header>
			<Layout className="app-content">
				<Row className="app-row">
					<Col {...siderLayout}><AppSider/></Col>
					<Col className="app-col" {...contentLayout}>
						<article className="app-content-wrapper">{this.props.children}</article>
					</Col>
				</Row>
			</Layout>
		</Layout>
	}
}
export default WebLayout;
