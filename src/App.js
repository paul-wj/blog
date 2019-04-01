import React, {Component} from 'react';
import routes from './router/router'
import { Route, Switch, withRouter} from "react-router-dom";
import './App.css';
import AppHeader from './views/compoents/header/index'
import { Layout, Row, Col } from 'antd'
const {
	Header, Sider
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
			<Layout  className="app-content">
				<Row>
					<Col {...siderLayout}><Sider>Sider</Sider></Col>
					<Col {...contentLayout}>
						<div className="app-content-wrapper">{children}</div>
					</Col>
				</Row>
			</Layout>
		</Layout>
	}
}
export default App;
