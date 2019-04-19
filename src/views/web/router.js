import Test from './pages/test/index'
import WebLayout from './compoents/layout/index'
import Home from './pages/home/index'
export default [{
	path: '/',
	name: 'app',
	component: WebLayout,
	childRoutes: [
		{ path: '', component: Home },
		{ path: 'article/:id', component: Home},
		{ path: 'test', name: 'test', component: Test}
	]
}]
