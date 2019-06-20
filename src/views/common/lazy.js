import React, { Component } from 'react'

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
			return RenderComponent ? <RenderComponent {...this.props} /> :
				<div className="react-spin react-spin-spinning react-spin-show-text">
					<span className="react-spin-dot react-spin-dot-spin">
						<i className="react-spin-dot-item"/>
						<i className="react-spin-dot-item"/>
						<i className="react-spin-dot-item"/>
						<i className="react-spin-dot-item"/>
					</span>
					<div className="react-spin-text">Loading...</div>
				</div>
		}
	};

export default asyncComponent
