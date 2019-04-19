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
		{ path: '', name: '首页', component: adminIndex },
		{
			path: 'article', name: '文章管理', icon: 'edit',
			childRoutes: [
				{ path: 'article-edit', icon: 'edit', name: '新增文章', component: ArticleCreate },
				{ path: 'article-list', icon: 'edit', name: '文章列表', component: ArticleList },
				{ path: 'tag-list', icon: 'table', name: '标签列表', component: TagList },
				{ path: 'category-list', icon: 'table', name: '目录列表', component: CategoryList },
			]}
	]
}]
