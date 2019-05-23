import React, {Component} from 'react';
import routes from './router/router'
import { BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import { connect } from 'react-redux'
import { getTags, getCategories } from './redux/article/actions'
import './static/scss/index.scss'
@connect(state => state,{ getTags, getCategories })
@withRouter
class App extends Component {
	componentDidMount() {
		this.props.getTags();
		this.props.getCategories();
	}


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
		return <BrowserRouter>{children}</BrowserRouter>
	}
}
export default App;
