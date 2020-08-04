import React, {FC, ReactElement, useCallback} from 'react';
import {useHistory} from "react-router";
import {useDispatch, useMappedState} from "redux-react-hook";
import {Layout, Menu} from 'antd';
import {WechatOutlined} from '@ant-design/icons';
import routes, {IRouterConfig} from '../../../../router';
import {setMenuOpenKeys, setMenuSelectedKeys} from "../../../../store/app/actions";
import './index.scss';

const {Sider} = Layout;

const {SubMenu} = Menu;

const [adminRoutes] = routes.filter(item => item.path === '/admin');

const menuList = adminRoutes ? adminRoutes.routes.filter((item: IRouterConfig) => item.path !== '*') : [];

const AdminSider: FC = (): ReactElement => {

    const AppState = useCallback(state => state.app, ['app']);

    const {collapsed, menuOpenKeys, menuSelectedKeys} = useMappedState(AppState);

    const history = useHistory();

    const dispatch = useDispatch();

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

    const openChangeHandle = (openKeys: string[]) => {
        dispatch(setMenuOpenKeys(openKeys))
    };

    const selectedHandle = ({selectedKeys}: {selectedKeys: string[]}) => {
        dispatch(setMenuSelectedKeys(selectedKeys))
    };

    return (
        <Sider
          className="admin-sider"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
            <div className={`admin-sider__desc ${collapsed ? 'admin-sider__desc--center' : ''}`}>
                <WechatOutlined className="admin-sider__logo" />
                {collapsed ? '' : '博客管理系统'}
            </div>
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
        </Sider>
    )
};

export default AdminSider;
