import React, {FC, ReactElement, useCallback} from 'react';
import {useHistory} from "react-router";
import {useDispatch, useMappedState} from "redux-react-hook";
import {Layout, Button} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {toggleCollapsed} from "../../../../store/app/actions";
import './index.scss';

const {Header} = Layout;

const AdminHeader: FC = (): ReactElement => {

    const collapsedState = useCallback(state => state.app.collapsed, ['app']);

    const collapsed = useMappedState(collapsedState);

    const history = useHistory();

    const dispatch = useDispatch();

    const collapsedButtonClickHandle = () => {
        dispatch(toggleCollapsed(!collapsed));
    };

    return (
        <Header className="admin-header">
            <div className="admin-header__left">
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
            </div>
            <div className="admin-header__right">
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                      history.push('/');
                  }}
                >
                    回到首页
                </Button>
            </div>
        </Header>
    )
};

export default AdminHeader;
