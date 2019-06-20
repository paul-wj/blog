import lazy from '../common/lazy'
const adminLayout = lazy(() => import(/*webpackChunkName: 'adminLayout'*/'./components/layout/index'));
const adminIndex = lazy(() => import(/*webpackChunkName: 'adminIndex'*/'./pages/home/index'));
const ArticleCreate = lazy(() => import(/*webpackChunkName: 'ArticleCreate'*/'./pages/article/article-create'));
const ArticleList = lazy(() => import(/*webpackChunkName: 'ArticleList'*/'./pages/article/article-list'));
const TagList = lazy(() => import(/*webpackChunkName: 'TagList'*/'./pages/tag-category/tag-list'));
const CategoryList = lazy(() => import(/*webpackChunkName: 'CategoryList'*/'./pages/tag-category/category-list'));
export default [{
	path: 'admin',
	component: adminLayout,
	childRoutes: [
		{ path: '', name: '首页', component: adminIndex, icon: 'home' },
		{
			path: 'article', name: '文章管理', icon: 'read',
			childRoutes: [
				{ path: 'article-edit', name: '新增文章', component: ArticleCreate },
				{ path: 'article-list', name: '文章列表', component: ArticleList },
				{ path: 'tag-list', name: '标签列表', component: TagList },
				{ path: 'category-list', name: '目录列表', component: CategoryList },
			]}
	]
}]
