import React from 'react';
import {LoadableComponent} from 'react-loadable';
import {
    HomeOutlined,
    EditOutlined,
    FolderOutlined,
    FundOutlined,
    UserOutlined,
    ReadOutlined
} from '@ant-design/icons';
import {RouteConfig} from "react-router-config";
import createLoadableBar from '../views/components/lazy';

const Layout = createLoadableBar(() => import(/* webpackChunkName: 'Layout' */'../views/web/components/layout/index'));
const NotFound  = createLoadableBar(() => import(/* webpackChunkName: 'NotFound' */'../views/components/404'));
const Home = createLoadableBar(() => import(/* webpackChunkName: 'Home' */'../views/web/pages/home'));
const Article = createLoadableBar(() => import(/* webpackChunkName: 'Article' */'../views/web/pages/article'));
const Archives = createLoadableBar(() => import(/* webpackChunkName: 'Archives' */'../views/web/pages/archives'));
const Catalog = createLoadableBar(() => import(/* webpackChunkName: 'Catalog' */'../views/web/pages/catalog'));
const Dashboard = createLoadableBar(() => import(/* webpackChunkName: 'Dashboard' */'../views/web/pages/dashboard'));
const About = createLoadableBar(() => import(/* webpackChunkName: 'About' */'../views/web/pages/about'));
const catalogDetail = createLoadableBar(() => import(/* webpackChunkName: 'catalogDetail' */'../views/web/pages/catalog/catalogDetail'));
const TagDetail = createLoadableBar(() => import(/* webpackChunkName: 'TagDetail' */'../views/web/pages/tag/tagDetail'));
const AdminLayout = createLoadableBar(() => import(/* webpackChunkName: 'AdminLayout' */'../views/admin/components/layout/index'));
const AdminEmpty = createLoadableBar(() => import(/* webpackChunkName: 'AdminEmpty' */'../views/admin/components/empty/index'));
const AdminHome = createLoadableBar(() => import(/* webpackChunkName: 'AdminHome' */'../views/admin/pages/home'));
const AdminArticleList = createLoadableBar(() => import(/* webpackChunkName: 'AdminArticleList' */'../views/admin/pages/article'));
const AdminArticleEdit = createLoadableBar(() => import(/* webpackChunkName: 'AdminArticleEdit' */'../views/admin/pages/article/articleEdit'));
const AdminTagList = createLoadableBar(() => import(/* webpackChunkName: 'AdminTagList' */'../views/admin/pages/tag/tagList'));
const AdminCategoryList = createLoadableBar(() => import(/* webpackChunkName: 'AdminCategoryList' */'../views/admin/pages/tag/categoryList'));

export interface IRouterConfig extends Omit<RouteConfig, 'component'> {
    component?: LoadableComponent;
    icon?: string | React.ForwardRefExoticComponent<any>;
    isMenu?: boolean;
}

const routes: IRouterConfig[] = [
    {
        path: '/admin',
        component: AdminLayout,
        routes: [
            {path: '/admin', exact: true, component: AdminHome, name: '首页', icon: HomeOutlined},
            {
                path: '/admin/article',
                component: AdminEmpty,
                name: '文章管理',
                icon: ReadOutlined,
                routes: [
                    {path: '/admin/article/edit', name: '新增文章', component: AdminArticleEdit},
                    {path: '/admin/article/list', name: '文章列表', component: AdminArticleList},
                    {path: '/admin/article/tag-list', name: '标签列表', component: AdminTagList},
                    {path: '/admin/article/category-list', name: '目录列表', component: AdminCategoryList},
                ]
            },
            {path: '*', component: NotFound}
        ]
    },
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
            {path: '*', component: NotFound, isMenu: false}
        ]
    }
];

export default routes;
