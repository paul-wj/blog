import React, {FC, ReactElement, useCallback} from 'react';
import {Menu} from "antd";
import {useDispatch, useMappedState} from "redux-react-hook";
import {useHistory} from "react-router";
import {setMenuOpenKeys, setMenuSelectedKeys} from "../../../../store/app/actions";
import routes, {IRouterConfig} from '../../../../router';

const {SubMenu} = Menu;

const [adminRoutes] = routes.filter(item => item.path === '/admin');

const menuList = adminRoutes ? adminRoutes.routes.filter((item: IRouterConfig) => item.path !== '*') : [];

const AdminMenu: FC = (): ReactElement => {

    const AppState = useCallback(state => state.app, ['app']);

    const {collapsed, menuOpenKeys, menuSelectedKeys} = useMappedState(AppState);

    const dispatch = useDispatch();

    const history = useHistory();

    const openChangeHandle = (openKeys: string[]) => {
        dispatch(setMenuOpenKeys(openKeys))
    };

    const selectedHandle = ({selectedKeys}: {selectedKeys: string[]}) => {
        dispatch(setMenuSelectedKeys(selectedKeys))
    };

    const getMenuListComponent = (list: IRouterConfig[]) => {
        return (
            list.map((menu: IRouterConfig) => (
                menu.routes && menu.routes.length ? (
                    <SubMenu
                      key={menu.path}
                      title={(
                          <>
                              {menu.icon ? <menu.icon /> : null}
                              <span>{menu.name}</span>
                          </>
                      )}
                    >
                        {getMenuListComponent(menu.routes)}
                    </SubMenu>
                ) : (
                    <Menu.Item
                      key={menu.path}
                      onClick={() => { history.push(menu.path) }}
                    >
                        {menu.icon ? <menu.icon /> : null}
                        <span>{menu.name}</span>
                    </Menu.Item>
                )
            ))
        )
    };

    return (
        <Menu
          mode="inline"
          theme="dark"
          defaultOpenKeys={menuOpenKeys}
          defaultSelectedKeys={menuSelectedKeys}
          inlineCollapsed={collapsed}
          onOpenChange={useCallback(openChangeHandle, [])}
          /* @ts-ignore */
          onSelect={useCallback(selectedHandle, [])}
        >
            {useCallback(getMenuListComponent, [])(menuList)}
        </Menu>
    )
};

export default AdminMenu;
