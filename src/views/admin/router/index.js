import adminLayout from '../compoents/layout/index'
import adminIndex from '../pages/home/index'
export default [{
	path: 'admin',
	name: 'app',
	component: adminLayout,
	childRoutes: [
		{ path: '', component: adminIndex }
	]
}]
