import React, { Component } from 'react'
import {Spin} from "antd";

/**
 * 使用 webpack 的 import 方法实现动态加载组件！dynamic import
 * @param {Function} importComponent - example const xx = asyncComponent(() => import('./xxx'))
 */
export const asyncComponent = importComponent =>
	class AsyncComponent extends Component {
		constructor(props) {
			super(props);
			this.state = { component: null }
		}

		async componentDidMount() {
			const { default: component } = await importComponent();
			this.setState({ component })
		}

		render() {
			const RenderComponent = this.state.component;
			return RenderComponent ? <RenderComponent {...this.props} /> : <Spin tip="Loading..." className="global-spin" size="large" spinning={true}/>
		}
	};

export default asyncComponent
