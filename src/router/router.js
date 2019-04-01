import Test from '../views/pages/test/index'
import App from '../App'
export default [{
	path: '/',
	name: 'app',
	component: App,
	childRoutes: [
		{
			path: 'test',
			name: 'test',
			component: Test
		}
	]
}]
