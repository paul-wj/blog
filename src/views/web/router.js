import WebLayout from './compoents/layout/index'
import Home from './pages/home/index'
import ArticleDetail from './pages/article/index'
import Archives from './pages/archives'
export default [{
	path: '/',
	name: 'app',
	component: WebLayout,
	childRoutes: [
		//type(10: 导航菜单， 20：普通页面)
		{ path: '/', component: Home, type: 10, name: '首页'},
		{ path: 'article/:id', component: ArticleDetail, type: 20},
		{ path: '/archives', component: Archives, type: 10, name: '归档'}
	]
}]
