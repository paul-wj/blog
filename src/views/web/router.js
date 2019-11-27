import lazy from '../common/lazy'
import WebLayout from './components/layout/index';
const Home = lazy(() => import(/*webpackChunkName: 'Home'*/'./pages/home/index'));
const ArticleDetail = lazy(() => import(/*webpackChunkName: 'ArticleDetail'*/'./pages/article/index'));
const Archives = lazy(() => import(/*webpackChunkName: 'Archives'*/'./pages/archives'));
const Categories = lazy(() => import(/*webpackChunkName: 'Categories'*/'./pages/categories'));
const CategoryDetail = lazy(() => import(/*webpackChunkName: 'CategoryDetail'*/'./common/list/index'));
const TagDetail = lazy(() => import(/*webpackChunkName: 'TagDetail'*/'./common/list/index'));
const Statistics = lazy(() => import(/*webpackChunkName: 'Statistics'*/'./pages/statistics'));
// const Recipe = lazy(() => import(/*webpackChunkName: 'Recipe'*/'./pages/recipe'));
const About = lazy(() => import(/*webpackChunkName: 'Index'*/'./pages/about'));
export default [{
	path: '/',
	name: 'app',
	component: WebLayout,
	childRoutes: [
		//type(10: 导航菜单， 20：普通页面) iconType(10: antd内置图标， 20：iconfont 图标)
		{ path: '/', component: Home, type: 10, name: '首页', iconType: 10, iconClassName: 'home'},
		{ path: '/archives', component: Archives, type: 10, name: '归档', iconType: 10, iconClassName: 'edit'},
		{ path: '/categories', component: Categories, type: 10, name: '目录', iconType: 10, iconClassName: 'folder'},
		{ path: '/statistics', component: Statistics, type: 10, name: '统计', iconType: 10, iconClassName: 'fund'},
		// { path: '/recipe', component: Recipe, type: 10, name: '菜谱'},
		{path: '/about', component: About, type: 10, name: '关于', iconType: 10, iconClassName: 'user'},
		{ path: 'article/:id', component: ArticleDetail, type: 20},
		{ path: 'category/:id', component: CategoryDetail, type: 20},
		{ path: 'tag/:id', component: TagDetail, type: 20}
	]
}]
