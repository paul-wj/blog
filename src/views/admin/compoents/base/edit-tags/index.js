import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
	Tag, Input, Tooltip, Icon
} from 'antd';

class EditTags extends Component{

	static propTypes = {
		tags: PropTypes.array
	};
	static defaultProps = {
		tags: []
	};

	constructor(props) {
		super(props);
		this.state = {
			tags: [123, 1234],
			inputVisible: false,
			inputValue: null
		}
	}
	handleClose = (removedTag) => {
		const tags = this.state.tags.filter(tag => tag !== removedTag);
		console.log(tags);
		this.setState({ tags });
	};

	showInput = () => {
		this.setState({ inputVisible: true }, () => this.input.focus());
	};

	handleInputChange = (e) => {
		this.setState({ inputValue: e.target.value });
	};

	handleInputConfirm = () => {
		const { inputValue } = this.state;
		let { tags } = this.state;
		if (inputValue && tags.indexOf(inputValue) === -1) {
			tags = [...tags, inputValue];
		}
		console.log(tags);
		this.setState({
			tags,
			inputVisible: false,
			inputValue: '',
		});
		this.props.onSuccess(inputValue)
	};
	saveInputRef = input => this.input = input;

	render() {
		// const tags = this.props.tags;
		const { tags, inputVisible, inputValue } = this.state;
		return (
			<div>
				{tags.map((tag, index) => {
					const isLongTag = tag.length > 20;
					const tagElem = (
						<Tag key={tag} closable={true} onClose={() => this.handleClose(tag)}>
							{isLongTag ? `${tag.slice(0, 20)}...` : tag}
						</Tag>
					);
					return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
				})}
				{inputVisible && (
					<Input
						ref={this.saveInputRef}
						type="text"
						size="small"
						style={{ width: 78 }}
						value={inputValue}
						onChange={this.handleInputChange}
						onBlur={this.handleInputConfirm}
						onPressEnter={this.handleInputConfirm}
					/>
				)}
				{!inputVisible && (
					<Tag
						onClick={this.showInput}
						style={{ background: '#fff', borderStyle: 'dashed' }}
					>
						<Icon type="plus" /> New Tag
					</Tag>
				)}
			</div>
		);
	}
}

export default EditTags;
