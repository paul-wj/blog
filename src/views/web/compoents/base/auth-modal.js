import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Modal, Form, Input, Checkbox} from 'antd'

import {connect} from 'react-redux'
import {openAuthModal, closeAuthModal} from '../../../../redux/common/actions'
import {login, register, editUser} from "../../../../redux/user/actions";

const CollectionCreateForm = Form.create({
	onFieldsChange(props, changedFields) {
		props.onChange(changedFields);
	},
	mapPropsToFields(props) {
		//去除事件参数key
		const fieldKeys = Object.keys(props).filter(key =>  !['onChange', 'formList'].includes(key));
		//循环生成FormField结构
		return fieldKeys.length ? fieldKeys.reduce((startValue, nextKey) => {
			startValue[nextKey] = Form.createFormField({
				...props[nextKey],
				value: props[nextKey].value
			});
			return startValue
		}, {}) : {};
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

const authTypeMap = {
	login: { title: '用户登录', formKeys: ['email', 'password']},
	register: {title: '用户注册', formKeys: ['email', 'username', 'password', 'confirm']},
	editUser: {title: '修改用户信息', formKeys: ['email', 'username', 'oldPassword', 'password', 'confirm']}
};

const checkboxOptions = [
	{ label: '用户名', value: 'username' }, { label: '密码', value: 'password' }
];

@connect(state => ({
	authModalVisible: state.common.authModalVisible,
	authModalType: state.common.authModalType,
	userInfo: state.user.userInfo}), {
	openAuthModal,
	closeAuthModal,
	login,
	register,
	editUser})
@withRouter
class AuthModal extends Component {
	state = {
		fields: {
			email: {
				value: ''
			},
			username: {
				value: ''
			},
			password: {
				value: ''
			},
			confirm: {
				value: ''
			},
			oldPassword: {
				value: ''
			}
		},
		checkboxValues: ['username']
	};

	componentWillReceiveProps(nextProps) {
		const {fields} = this.state;
		const {userInfo} = nextProps;
		//修改用户信息时塞入用户数据
		if (userInfo.userId) {
			this.setState({fields: Object.assign({}, fields, {
					email: {value: userInfo.email},
					username: {value: userInfo.username}
				})})
		}
	}

	checkboxChange = values => {
		if (values.length === 0) {
			return this.$toast.warning('请至少勾选一项')
		}
		this.setState({checkboxValues: values});
	};

	/**
	 * 确认密码的验证
	 */
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.formRef;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!')
		} else {
			callback()
		}
	};

	handleCreate = () => {
		const {authModalType, userInfo} = this.props;
		const form = this.formRef;
		form.validateFields(async (err, values) => {
			if (err) {
				return;
			}
			// console.log('Received values of form: ', values);
			if (['login', 'register'].includes(authModalType)) {
				const {email, username, password} = values;
				const res = await this.props[authModalType](authModalType === 'login' ? {email, password} : {email, password, username});
				if (res.flags === 'success') {
					this.closeModel()
				}
			} else {
				const {email, username, password, oldPassword} = values;
				const res = await this.props[authModalType](userInfo.userId, {email, username, password, oldPassword});
				if (res.flags === 'success') {
					this.closeModel()
				}
			}
		});
	};

	closeModel = () => {
		const {fields} = this.state;
		const form = this.formRef;
		this.props.closeAuthModal();
		form.resetFields();
		this.setState({fields: Object.keys(fields).reduce((startValue, nextKey) => {
				startValue[nextKey] = {value: ''};
				return startValue
			}, {})})
	};

	handleFormChange = changedFields => {
		this.setState(({ fields }) => ({
			fields: { ...fields, ...changedFields },
		}));
	};

	render() {
		const { fields, checkboxValues } = this.state;
		const { authModalVisible, authModalType, userInfo } = this.props;
		const formList = [
			{
				key: 'email',
				label: '邮箱',
				el: <Input placeholder="请输入您的邮箱" disabled={!!userInfo.email} />,
				rules: [
					{ type: 'email', message: 'The input is not valid E-mail!' },
					{ required: true, message: 'Please input your E-mail!' }
				]
			},
			{
				key: 'username',
				label: '用户名',
				el: <Input placeholder="请输入您的用户名"/>,
				rules: [
					{ required: true, message: 'Please input your username!' }
				]
			},
			{
				key: 'oldPassword',
				label: '原密码',
				el: <Input placeholder="请输入原密码" type="password" />,
				rules: [{ required: true, message: 'oldPassword is required' }]
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
				el: <Input placeholder="请输入确认密码" type="password" />,
				rules: [
					{ required: true, message: 'Please confirm your password!' },
					{ validator: this.compareToFirstPassword}
				]
			}
		];
		let formKeys = authModalType ? authTypeMap[authModalType].formKeys : [];
		const currentFormList = formList.filter(item => {
			if (authModalType === 'editUser' && checkboxValues.length === 1) {
				formKeys = checkboxValues.includes('password') ?
					formKeys.filter(key => !['username'].includes(key)) :
					formKeys.filter(key => !['oldPassword', 'confirm'].includes(key));
			}
			return formKeys.includes(item.key)
		});
		const modalTitle = authModalType ? authTypeMap[authModalType].title : '';
		return (
			<Modal
				title={modalTitle}
				maskClosable={false}
				visible={authModalVisible}
				onOk={this.handleCreate}
				onCancel={this.closeModel}
				okText="确认"
				cancelText="取消">
				{authModalType === 'editUser' ?
					(<div className="edit-user-type">
						<span className="text">选择您要修改的个人信息：</span>
						<Checkbox.Group options={checkboxOptions} value={checkboxValues} onChange={this.checkboxChange} />
					</div>) : null}
				<CollectionCreateForm
					formList={currentFormList}
					{...fields}
					ref={formRef => this.formRef = formRef}
					onChange={this.handleFormChange}/>
			</Modal>
		);
	}
}
export default AuthModal;
