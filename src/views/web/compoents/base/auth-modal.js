import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Modal, Form, Input, Radio} from 'antd'

import {connect} from 'react-redux'
import {openAuthModal, closeAuthModal} from '../../../../redux/common/actions'




const CollectionCreateForm = Form.create({
	name: 'form_in_modal',
	onFieldsChange(props, changedFields) {
		props.onChange(changedFields);
	},
	mapPropsToFields(props) {
		//去除事件参数key
		const fieldKeys = Object.keys(props).filter(key => key !== 'onChange');
		//循环生成FormField结构
		return fieldKeys.reduce((startValue, nextKey) => {
			startValue[nextKey] = Form.createFormField({
				...props[nextKey],
				value: props[nextKey].value
			});
			return startValue
		}, {});
	}
})(props => {
	let {formList} = props;
	const { getFieldDecorator  } = props.form;
	return (
		<Form layout="vertical">
			{
				formList.map(form => (<Form.Item key={form.key} label={form.label}>
					{getFieldDecorator(form.key, {
						rules: form.rules
					})(form.el)}
				</Form.Item>))
			}
		</Form>
	)
});

@connect(state => ({authModalVisible: state.common.authModalVisible, authModalType: state.common.authModalType, userInfo: state.user.userInfo}), {openAuthModal, closeAuthModal})
@withRouter
class AuthModal extends Component {
	state = {
		fields: {
			email: {
				value: '123',
			},
			password: {
				value: '123123'
			},
			confirm: {
				value: null
			},
			modifier: {
				value: 'public'
			}
		}
	};

	getCurrentForm = () => {
		const fields = this.state.fields;
		const FormList = [
			{
				key: 'email',
				label: '邮箱',
				el: <Input placeholder="请输入您的邮箱"/>,
				rules: [
					{ type: 'email', message: 'The input is not valid E-mail!' },
					{ required: true, message: 'Please input your E-mail!' }
				]
			},
			{
				key: 'password',
				label: '密码',
				el: <Input placeholder="请输入密码" type="password" />,
				rules: [{ required: true, message: 'Password is required' }]
			},
			{
				key: 'confirm',
				label: '确认密码',
				el: <Input placeholder="确认密码" type="password" />,
				rules: [
					{ required: true, message: 'Please confirm your password!' }
				]
			}
		];
		return FormList;
	};

	handleCreate = () => {
		const form = this.formRef;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			console.log('Received values of form: ', values);
			// form.resetFields();
		});
	};
	handleFormChange = changedFields => {
		this.setState(({ fields }) => ({
			fields: { ...fields, ...changedFields },
		}));
	};
	render() {
		const {fields} = this.state;
		const { authModalVisible, userInfo } = this.props;
		const FormList = this.getCurrentForm();
		return (
			<Modal
				title="Modal"
				maskClosable={false}
				visible={authModalVisible}
				onOk={this.handleCreate}
				onCancel={this.props.closeAuthModal}
				okText="确认"
				cancelText="取消">
				<CollectionCreateForm
					formList={FormList}
					{...fields}
					ref={formRef => this.formRef = formRef}
					onChange={this.handleFormChange}/>
			</Modal>
		);
	}
}
export default AuthModal;
