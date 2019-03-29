import appLayout from '../views/pages/layout/index'
import test from '../views/pages/test/index'
import App from '../App'
export default [{
	path: '/',
	name: 'app',
	component: App,
	childRoutes: [
		{
			path: '/test',
			name: 'test',
			component: test
		},
		{
			path: '/layout',
			name: 'layout',
			component: appLayout
		}
	]
}]
