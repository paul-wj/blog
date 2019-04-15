import React, {Component} from 'react';
import routes from './router/router'
import { Route, Switch, withRouter} from "react-router-dom";
import './static/css/App.css';
import AppHeader from './views/compoents/header/index'
import AppSider from './views/compoents/sider/index'
import { Layout, Row, Col, Card } from 'antd'
const {
	Header
} = Layout;
const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 };
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 };
@withRouter
class App extends Component {
	renderRoutes(routes, contextPath) {
		const children = [];
		if (!routes || routes.length === 0) {
			return null
		}
		const renderRoute = (item, routeContentPath) => {
			let newContentPath = item.path ? `${contextPath}/${item.path}` : routeContentPath;
			newContentPath = newContentPath.replace(/\/+/g, '/');
			if (item.component && item.childRoutes) {
				const childRoutes = this.renderRoutes(item.childRoutes, newContentPath);
				children.push(
					<Route
						key={newContentPath}
						render={props => <item.component {...props}>{childRoutes}</item.component>}
						path={newContentPath}
					/>
				)
			} else if (item.component) {
				children.push(<Route key={newContentPath} component={item.component} path={newContentPath} exact/>)
			} else if (item.childRoutes) {
				item.childRoutes.forEach(r => renderRoute(r, newContentPath))
			}
		};
		routes.forEach(item => renderRoute(item, contextPath));
		return <Switch>{children}</Switch>
	}
	render() {
		const children = this.renderRoutes(routes, '/');
		return <Layout className="app-container">
			<Header className="app-header"><AppHeader/></Header>
			<Layout className="app-content">
				<Row className="app-row">
					<Col {...siderLayout}><AppSider/></Col>
					<Col className="app-col" {...contentLayout}>
						<Card className="app-content-wrapper">{children}</Card>
					</Col>
				</Row>
			</Layout>
		</Layout>
	}
}
export default App;
