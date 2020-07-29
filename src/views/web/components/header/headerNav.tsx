import React, {FC, ReactElement} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {Menu} from 'antd';
import routes, {IRouterConfig} from '../../../../router';

const [{routes: webRoutes}] = routes;

const AppHeaderNav: FC = (): ReactElement => {
    const location = useLocation();

    return (
        <Menu
          className="app-header__nav"
          selectedKeys={[location.pathname]}
          mode="horizontal"
        >
            {
                webRoutes.filter((route: IRouterConfig) => route.isMenu)
                    .map((menu: IRouterConfig) => {
                        return (
                            <Menu.Item key={menu.path}>
                                <Link to={menu.path}>
                                    {menu.icon ? <menu.icon className="app-header__nav-icon" /> : null}
                                    <span className="app-header__nav-name">{menu.name}</span>
                                </Link>
                            </Menu.Item>
                        )
                    })
            }
        </Menu>
    )
};

export default AppHeaderNav;
