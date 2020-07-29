import React, {FC, ReactElement, useEffect} from 'react';
import {Card, Divider} from 'antd';
import {GithubOutlined, createFromIconfontCN} from '@ant-design/icons';
import {ICON_FONT_URL} from "../../../../conf";
import Clock from '../../../../lib/plugins/clock'

const MyIcon = createFromIconfontCN({
    scriptUrl: ICON_FONT_URL
});

const AppSiderUser: FC = (): ReactElement => {

    useEffect(() => {
        let clock = new Clock({
            el: document.getElementById('clock') as HTMLCanvasElement,
            radius: 35,
            width: 80,
            height: 80
        });
        clock.start();
        return () => {clock = null;}
    }, []);

    return (
        <Card className="app-sider-user">
            <div className="app-sider-user__title">
                <canvas id="clock" />
                <span>前端汪小二</span>
            </div>
            <div className="app-sider-user__warehouse">
                <a
                  className="github-link"
                  href="https://github.com/paul-wj"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                    <GithubOutlined />
                    &nbsp;github
                </a>
                <Divider type="vertical" />
                <a
                  className="juejin-link"
                  href="https://juejin.im/user/58be7c26a22b9d005ef8ab3f"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                    <MyIcon type="icon-juejin" />
                    &nbsp;juejin
                </a>
            </div>
            <p className="app-sider-user__desc">前端打杂，前端自娱自乐</p>
        </Card>
    )
};

export default AppSiderUser;
