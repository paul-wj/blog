import Login from '../views/admin/pages/global/login'
import webRouters from '../views/web/router.js'
import adminRouters from '../views/admin/router.js'
export default [
	{path: '', childRoutes: [{ path: 'login', component: Login }]},
	...adminRouters,
	...webRouters]
