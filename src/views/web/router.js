import WebLayout from './compoents/layout/index'
import Home from './pages/home/index'
import ArticleDetail from './pages/article/index'
import Archives from './pages/archives'
import Categories from './pages/categories'
import CategoryDetail from './common/list/index'
import TagDetail from  './common/list/index'
export default [{
	path: '/',
	name: 'app',
	component: WebLayout,
	childRoutes: [
		//type(10: 导航菜单， 20：普通页面)
		{ path: '/', component: Home, type: 10, name: '首页'},
		{ path: '/archives', component: Archives, type: 10, name: '归档'},
		{ path: '/categories', component: Categories, type: 10, name: '目录'},
		{ path: 'article/:id', component: ArticleDetail, type: 20},
		{ path: 'category/:id', component: CategoryDetail, type: 20},
		{ path: 'tag/:id', component: TagDetail, type: 20}
	]
}]
