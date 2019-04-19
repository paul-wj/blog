import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom";
import './index.scss'
@withRouter
class index extends Component {

	static propTypes = {
		labelWidth: PropTypes.number,
		position: PropTypes.string,
		inline: PropTypes.bool
	};
	static defaultProps = {
		labelWidth: null,
		position: 'left',
		inline: false
	};

	render() {
		let propsChildren = this.props.children;
		let children = propsChildren ? Array.isArray(propsChildren) ? propsChildren : [propsChildren] : [];
		let labelDom = children.find(item => item.props && item.props.slot === 'label');
		let contentDom = children.filter(item => typeof item === 'string' || (item.props && item.props.slot !== 'label'));
		let labelWidth = this.props.position === 'left' ?
			(typeof this.props.labelWidth === 'string' ?
				this.props.labelWidth : this.props.labelWidth + 'px') : '';
		return children.length ? <div
			style={{display: this.props.inline ? 'inline-block' : 'block'}}
			className={`custom-form-item ${this.props.position === 'top' ? 'label-position__top' : ''}`}>
		<div className="custom-form-item__el custom-form-item__label"
		     style={{width: labelWidth}}>{labelDom}</div>
		<div className="custom-form-item__el custom-form-item__content" style={{marginLeft: labelWidth}}>{contentDom && contentDom.map(item => item)}</div>
	</div> : null
	}
}

export default index;
