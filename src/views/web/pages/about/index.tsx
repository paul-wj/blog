import React, {FC, ReactElement} from 'react';
import {Divider} from 'antd';
import {QqOutlined, MailOutlined} from '@ant-design/icons';
import dayJs from 'dayjs';
import AboutChart from './aboutChart';
import AboutComment from './aboutComment';
import './index.scss';

const getWorkExperience = () => {
    const startWorkTime = dayJs('2016/02/01');
    const nowTime = dayJs();
    const workExperience = nowTime.diff(startWorkTime, 'month');
    return workExperience > 12 ? `${Math.floor(workExperience / 12)}年${workExperience % 12}个月` : `${workExperience}个月`;
};

const About: FC = (): ReactElement => {

    const experience = getWorkExperience();

    return (
        <div className="about-container">
            <Divider orientation="left">博客简述</Divider>
            <ul className="about-container__list">
                <li>本博客使用的主要技术栈为：</li>
                <li>前端： webpack4 + typescript + react hooks + antd</li>
                <li>后端： typescript + koa2 + koa-swagger-decorator + mysql + socket.io</li>
                <li>
                    源码地址为
                    <a className="about-container__link" href="https://github.com/paul-wj/blog.git" rel="noopener noreferrer" target="_blank">github</a>
                    ，
                    <a className="about-container__link" href="https://github.com/paul-wj/blog-admin.git" rel="noopener noreferrer" target="_blank">后台地址</a>
                    ，仅供参考，不做商业用途！
                </li>
            </ul>
            <Divider orientation="left">个人信息</Divider>
            <ul className="about-container__list">
                <li>个人起点：因16年初开始工作，所以刚工作就接触并使用spa和前后端分离的模式，对技术的革新无阵痛，并热爱新技术。</li>
                <li>
                    工作经验：
                    {experience}
                </li>
                <li>
                    学历专业：专科
                    <Divider type="vertical" />
                    软件技术
                </li>
                <li>
                    联系方式：
                    <QqOutlined />
                    &nbsp;458070960
                    <Divider type="vertical" />
                    <MailOutlined />
                    &nbsp;
                    <a className="about-container__link" href="mailto:paul.wangjie@gmail.com">paul.wangjie@gmail.com</a>
                </li>
                <li>坐标：上海市</li>
            </ul>
            <Divider orientation="left">个人技能</Divider>
            <AboutChart />
            <ul className="about-container__list">
                <li>html、css、js: 能熟练开发符合 W3C 标准的页面。</li>
                <li>es6: es6常用方法熟练使用，掌握面向对象编程实现。</li>
                <li>vue框架(工作使用)熟练掌握使用，当前博客为技术为react全家桶，react熟悉使用。</li>
                <li>node: 掌握koa2全家桶，能完成接口的开发与设计。</li>
                <li>linux: linux基本操作熟悉，云服务器安全防范，防火墙等配置，并完成简单个人网站全栈（前后端）上线流程（pm2、nginx、mysql、redis、Jenkins等为linux上常用程序）。</li>
                <li>mysql: 针对需求可以做到简单的数据库设计。</li>
                <li>webpack: 可以对脚手架进行针对性的打包配置。</li>
            </ul>
            <Divider orientation="left">个人开发工具</Divider>
            <ul className="about-container__list">
                <li>常用开发工具： webstorm、git等</li>
                <li>熟悉的 UI 工具： element-ui、iview、antd、vux等</li>
                <li>熟悉的图表工具：echart、heightchart、G2等</li>
            </ul>
            <Divider orientation="left">个人爱好</Divider>
            <ul className="about-container__list">
                <li>旅游、NBA2K、英雄联盟</li>
                <li>欢迎交流</li>
            </ul>
            <AboutComment />
        </div>
    )
};

export default About;
