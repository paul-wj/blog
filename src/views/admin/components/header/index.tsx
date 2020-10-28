import React, {FC, ReactElement, useCallback} from 'react';
import {useHistory} from "react-router";
import {useDispatch, useMappedState} from "redux-react-hook";
import {Layout, Button, Row, Col, Drawer} from 'antd';
import {createFromIconfontCN, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {toggleCollapsed, toggleMenuMobileOpen} from "../../../../store/app/actions";
import {ICON_FONT_URL} from "../../../../conf";
import AdminSider from '../sider';
import './index.scss';

const MyIcon = createFromIconfontCN({
    scriptUrl: ICON_FONT_URL
});


const {Header} = Layout;

const pcCollapsedLayout = { xxl: 12, xl: 12, lg: 12, sm: 12, xs: 0 };

const pcButtonLayout = { xxl: 12, xl: 12, lg: 12, sm: 12, xs: 12 };

const mobileMenuLayout = { xxl: 0, xl: 0, lg: 0, sm: 0, xs: 12 };

const AdminHeader: FC = (): ReactElement => {

    const appState = useCallback(state => ({collapsed: state.app.collapsed, menuMobileOpen: state.app.menuMobileOpen}), ['app']);

    const {collapsed, menuMobileOpen} = useMappedState(appState);

    const history = useHistory();

    const dispatch = useDispatch();

    const collapsedButtonClickHandle = () => {
        dispatch(toggleCollapsed(!collapsed));
    };

    const menuButtonClickHandle = () => {
        if (collapsed) {
            dispatch(toggleCollapsed(false));
        }
        dispatch(toggleMenuMobileOpen(!menuMobileOpen));
    };

    return (
        <>
            <Header className="admin-header">
                <Row>
                    <Col {...mobileMenuLayout}>
                        <MyIcon
                          onClick={menuButtonClickHandle}
                          className="admin-header__menu"
                          type="icon-menu"
                        />
                    </Col>
                    <Col className="admin-header__left" {...pcCollapsedLayout}>
                        {
                            collapsed ?
                                (
                                    <MenuUnfoldOutlined
                                      className="admin-header__collapsed"
                                      onClick={collapsedButtonClickHandle}
                                    />
                                ) :
                                (
                                    <MenuFoldOutlined
                                      className="admin-header__collapsed"
                                      onClick={collapsedButtonClickHandle}
                                    />
                                )
                        }
                    </Col>
                    <Col className="admin-header__right" {...pcButtonLayout}>
                        <Button
                          type="link"
                          size="small"
                          onClick={() => {
                              history.push('/');
                          }}
                        >
                            前台首页
                        </Button>
                    </Col>
                </Row>
            </Header>
            <Drawer
              placement="left"
              visible={menuMobileOpen}
              closable={false}
              onClose={menuButtonClickHandle}
              width={200}
              className="admin-header__drawer"
            >
                <AdminSider />
            </Drawer>
        </>
    )
};

export default AdminHeader;
