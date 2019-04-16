import Test from '../pages/test/index'
import WebLayout from '../compoents/layout'
import Home from '../pages/home/index'
export default [{
	path: '/',
	name: 'app',
	component: WebLayout,
	childRoutes: [
		{ path: '', component: Home },
		{ path: 'test', name: 'test', component: Test}
	]
}]
