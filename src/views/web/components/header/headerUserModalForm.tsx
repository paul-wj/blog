import React, {useImperativeHandle} from "react";
import {Form, Input} from "antd";
import {FieldData} from "rc-field-form/lib/interface";
import {FormInstance, Rule} from "antd/lib/form";
import {UserModalType} from "../../../../store/user/reducer";
import HeaderUserModalUploadForm from './headerUserModalUploadForm';

type RefCurrent = Pick<FormInstance, 'validateFields' | 'resetFields' | 'setFields'>;

const HeaderUserModalForm = React.forwardRef(({type, keys}: {type: UserModalType, keys: string[]}, ref) => {

    const [form] = Form.useForm();

    useImperativeHandle(ref, (): RefCurrent => ({
        validateFields: () => form.validateFields(),
        resetFields: () => form.resetFields(),
        setFields: (fields: FieldData[]) => form.setFields(fields)
    }));

    const compareToFirstPassword = (rule: Rule, value: string) => {
        if (value && value !== form.getFieldValue('password')) {
            return Promise.reject(Error('Two passwords that you enter is inconsistent!'));
        }
        return Promise.resolve();
    };

    return (
        <Form
          name="user_modal"
          layout="vertical"
          form={form}
          scrollToFirstError
        >
            <Form.Item
              name="account"
              label="账号"
              rules={[
                  {required: true, message: 'Please input your username or Email!'}
              ]}
              hidden={!keys.includes('account')}
            >
                <Input placeholder="请输入您的用户名或邮箱" />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                  {type: 'email', message: 'The input is not valid E-mail!'},
                  {required: true, message: 'Please input your E-mail!'}
              ]}
              hidden={!keys.includes('email')}
            >
                <Input placeholder="请输入您的邮箱" disabled={type === 'edit'} />
            </Form.Item>
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                  {required: true, message: 'Please input your username!'}
              ]}
              hidden={!keys.includes('username')}
            >
                <Input placeholder="请输入您的用户名" />
            </Form.Item>
            <Form.Item
              name="oldPassword"
              label="原密码"
              rules={[
                  {required: true, message: 'oldPassword is required'}
              ]}
              hidden={!keys.includes('oldPassword')}
            >
                <Input placeholder="请输入原密码" type="password" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                  {required: true, message: 'Password is required'}
              ]}
              hidden={!keys.includes('password')}
            >
                <Input placeholder="请输入密码" type="password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="确认密码"
              rules={[
                  {required: true, message: 'Please confirm your password!'},
                  {validator: compareToFirstPassword}
              ]}
              hidden={!keys.includes('confirm')}
            >
                <Input placeholder="请输入确认密码" type="password" />
            </Form.Item>
            <Form.Item
              name="profilePicture"
              label="用户头像"
              hidden={!keys.includes('profilePicture')}
              rules={[
                  {required: true, message: 'profilePicture is required'}
              ]}
            >
                {/* @ts-ignore */}
                <HeaderUserModalUploadForm />
            </Form.Item>
        </Form>
    )
});

export default HeaderUserModalForm;
