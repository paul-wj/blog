import React, {FC, ReactElement} from "react";
import {useDispatch} from "redux-react-hook";
import {Button} from "antd";
import {openUserModal} from "../../../../store/user/actions";

const HeaderUserButtonGroup: FC = (): ReactElement => {

    const dispatch = useDispatch();

    return (
        <>
            <Button ghost type="primary" size="small" onClick={() => dispatch(openUserModal('login'))}>登录</Button>
            <Button size="small" className="ml20" ghost danger onClick={() => dispatch(openUserModal('register'))}>注册</Button>
        </>
    )
};

export default HeaderUserButtonGroup;
