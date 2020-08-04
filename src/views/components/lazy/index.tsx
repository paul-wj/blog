import React from 'react';
// @ts-ignore: https://github.com/jamiebuilds/react-loadable/pull/213
import Loadable from '@yeutech-lab/react-loadable';
import {LoadableComponent} from 'react-loadable';
import { Spin } from 'antd';


export default (loader: () => Promise<any>): LoadableComponent => {
    return Loadable({
        loader,
        loading() {
            return <div className="app-component-loading"><Spin size="large" /></div>
        }
    });
};


