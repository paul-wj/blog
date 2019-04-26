import WebLayout from './compoents/layout/index'
import Home from './pages/home/index'
import ArticleDetail from './pages/article/index'
export default [{
	path: '/',
	name: 'app',
	component: WebLayout,
	childRoutes: [
		{ path: '', component: Home },
		{ path: 'article/:id', component: ArticleDetail}
	]
}]
