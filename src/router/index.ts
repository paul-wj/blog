import React from 'react';
import {LoadableComponent} from 'react-loadable';
import {HomeOutlined, EditOutlined, FolderOutlined, FundOutlined, UserOutlined} from '@ant-design/icons';
import {RouteConfigComponentProps} from "react-router-config";
import createLoadableBar from '../views/components/lazy';

const Layout = createLoadableBar(() => import(/* webpackChunkName: 'Layout' */'../views/web/components/layout/index'));
const Home = createLoadableBar(() => import(/* webpackChunkName: 'Home' */'../views/web/pages/home'));
const Article = createLoadableBar(() => import(/* webpackChunkName: 'Article' */'../views/web/pages/article'));
const Archives = createLoadableBar(() => import(/* webpackChunkName: 'Archives' */'../views/web/pages/archives'));
const Catalog = createLoadableBar(() => import(/* webpackChunkName: 'Catalog' */'../views/web/pages/catalog'));
const Dashboard = createLoadableBar(() => import(/* webpackChunkName: 'Dashboard' */'../views/web/pages/dashboard'));
const About = createLoadableBar(() => import(/* webpackChunkName: 'About' */'../views/web/pages/about'));
const catalogDetail = createLoadableBar(() => import(/* webpackChunkName: 'catalogDetail' */'../views/web/pages/catalog/catalogDetail'));
const TagDetail = createLoadableBar(() => import(/* webpackChunkName: 'TagDetail' */'../views/web/pages/tag/tagDetail'));
const AdminLayout = createLoadableBar(() => import(/* webpackChunkName: 'AdminLayout' */'../views/admin/components/layout/index'));
const AdminHome = createLoadableBar(() => import(/* webpackChunkName: 'AdminHome' */'../views/admin/pages/home'));

export interface IRouterConfig {
    component?: LoadableComponent;
    render?: (props: RouteConfigComponentProps<any>) => React.ReactNode;
    path?: string;
    exact?: boolean;
    name?: string;
    icon?: string | React.ForwardRefExoticComponent<any>;
    isMenu?: boolean;
    routes?: IRouterConfig[]
}

const routes: IRouterConfig[] = [
    {
        path: '/',
        component: Layout,
        routes: [
            {path: '/', exact: true, component: Home, name: '首页', icon: HomeOutlined, isMenu: true},
            {path: '/archives', component: Archives, name: '归档', icon: EditOutlined, isMenu: true},
            {path: '/catalog', component: Catalog, name: '目录', icon: FolderOutlined, isMenu: true},
            {path: '/dashboard', component: Dashboard, name: '统计', icon: FundOutlined, isMenu: true},
            {path: '/about', component: About, name: '关于', icon: UserOutlined, isMenu: true},
            {path: '/article/:id',component: Article, isMenu: false},
            {path: '/tag/:id', component: TagDetail, isMenu: false},
            {path: '/catalog/:id', component: catalogDetail, isMenu: false},
        ]
    },
    {
        path: '/',
        component: AdminLayout,
        routes: [
            {path: '/admin', exact: true, component: AdminHome, name: '后台首页'},
        ]
    }
];

export default routes;
