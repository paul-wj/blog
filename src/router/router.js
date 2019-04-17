import Login from '../views/admin/pages/global/login'
import webRouters from '../views/web/router'
import adminRouters from '../views/admin/router'
export default [
	{path: '', childRoutes: [{ path: 'login', component: Login }]},
	...webRouters, ...adminRouters]
