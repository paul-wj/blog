import React, {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router";
import {useDispatch, useMappedState} from "redux-react-hook";
import {Dropdown, Menu} from 'antd';
import {createFromIconfontCN} from '@ant-design/icons';
import {ICON_FONT_URL} from "../../../../conf";
import routes, {IRouterConfig} from '../../../../router';
import {openUserModal, loginOut} from "../../../../store/user/actions";

interface MenuOptions {
    name: string;
    type: 10 | 20; // 10: 路由 20: 操作
    path?: string;
    icon?: string | React.ForwardRefExoticComponent<any>;
}

const {routes: webRoutes} = routes.find(item => item.path === '/');

const MyIcon = createFromIconfontCN({
    scriptUrl: ICON_FONT_URL
});

const AppHeaderLeftMenu: FC = (): ReactElement => {

    const history = useHistory();

    const location = useLocation();

    const dispatch = useDispatch();

    const isLoginState = useCallback(state => state.user.isLogin, ['user.isLogin']);

    const isLogin = useMappedState(isLoginState);

    const [menuList, setMenuList] = useState<MenuOptions[]>([]);

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    useEffect(() => {
        const routerList: MenuOptions[] = webRoutes.filter((route: IRouterConfig) => route.isMenu).map((route: IRouterConfig) => ({name: route.name, type: 10, icon: route.icon, path: route.path}));
        setMenuList(routerList.concat(isLogin ? [{name: '修改账户信息', type: 20},{name: '退出登录', type: 20}] : [{name: '登录', type: 20},{name: '注册', type: 20}]))
    }, [isLogin]);

    useEffect(() => {
        setSelectedKeys([location.pathname]);
    }, [location.pathname]);


    const menuClickHandle = ({key} : {key: string}) => {
        const currentClickMenu = menuList.find(menu => menu.name === key || menu.path === key);
        if (currentClickMenu?.type === 10) {
            history.push(currentClickMenu.path);
        } else if (currentClickMenu?.type === 20) {
            switch (key) {
                case '修改账户信息':
                    dispatch(openUserModal('edit'));
                    break;
                case '退出登录':
                    dispatch(loginOut());
                    break;
                case '登录':
                    dispatch(openUserModal('login'));
                    break;
                case '注册':
                    dispatch(openUserModal('register'));
                    break;
                default:
                    break;
            }
        }
    };

    const DropDownMenu = () => {
        return (
            // @ts-ignore
            <Menu onClick={menuClickHandle} selectedKeys={selectedKeys}>
                {
                    menuList.map((menu: MenuOptions) => (
                        <Menu.Item key={menu.path || menu.name}>
                            {menu.icon ? <menu.icon /> : null}
                            <span>{menu.name}</span>
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
    };

    return (
        <Dropdown overlayClassName="app-header-left__drop" trigger={['click']} overlay={DropDownMenu()}>
            <MyIcon className="app-header-left__menu" type="icon-menu" />
        </Dropdown>
    )
};

export default AppHeaderLeftMenu;
