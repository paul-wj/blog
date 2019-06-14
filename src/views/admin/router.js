import adminLayout from './compoents/layout/index'
import adminIndex from './pages/home/index'
import ArticleCreate from './pages/article/article-create'
import ArticleList from './pages/article/article-list'
import TagList from './pages/tag-category/tag-list'
import CategoryList from './pages/tag-category/category-list'
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
