import React, {FC, ReactElement, useRef, useMemo, useState, useEffect} from 'react';
import {useDispatch} from "redux-react-hook";
import {Modal, Checkbox, message} from "antd";
import {FormInstance} from 'antd/lib/form';
import {ValidateErrorEntity} from "rc-field-form/lib/interface";
import {UserState, UserModalType} from "../../../../store/user/reducer";
import {closeUserModal, login, register, updateUser} from "../../../../store/user/actions";
import {LoginRequestParams, UpdateUserRequestParams, RegisterUserRequestParams, UserInfo} from "../../../../types/user";
import HeaderUserModalForm from './headerUserModalForm';

type HeaderUserModalProps = Pick<UserState, 'userModalVisible' | 'userModalType' | 'userInfo'>;

type RefCurrent = Pick<FormInstance, 'validateFields' | 'resetFields' | 'setFields'>;

interface UserModalTypeConfig {
    title: string;
    keys: string[];
}

const userModalTypeMap: Record<UserModalType, UserModalTypeConfig> = {
    login: { title: '用户登录', keys: ['account', 'password']},
    register: {title: '用户注册', keys: ['email', 'username', 'password', 'confirm', 'profilePicture']},
    edit: {title: '修改用户信息', keys: ['email', 'username', 'oldPassword', 'password', 'confirm', 'profilePicture']}
};

const checkboxOptions = [
    { label: '用户名', value: 'username', keys: ['email', 'username', 'password'] },
    { label: '密码', value: 'password', keys: ['email', 'oldPassword', 'confirm']},
    { label: '用户头像', value: 'profilePicture', keys: ['email', 'password', 'profilePicture']}
];

const HeaderUserModal: FC<HeaderUserModalProps> = (props: HeaderUserModalProps): ReactElement => {
    const {userModalType, userModalVisible, userInfo} = props;
    const {title, keys} = userModalTypeMap[userModalType];
    const dispatch = useDispatch();

    const formRef: {current: RefCurrent} = useRef();

    const [currentKeys, setCurrentKeys] = useState<string[]>([]);

    const [checkboxValues, setCheckboxValues] = useState<string[]>(['username']);

    useEffect(() => {
        if (userModalType === 'edit') {
            const selectKeys = checkboxValues.reduce((startValue: string[], currentValue: string) => [...new Set([...startValue, ...checkboxOptions.find(item => item.value === currentValue).keys])], []);
            setCurrentKeys(selectKeys);
            const timer = setTimeout(() => {
                clearTimeout(timer);
                formRef.current.setFields(keys.map((key: keyof UserInfo) => ({
                    name: key,
                    value: userInfo[key]
                })));
            }, 10);
        } else {
            setCurrentKeys(keys);
        }
    }, [userModalType, userInfo, checkboxValues]);

    const onCancelHandle = () => {
        dispatch(closeUserModal());
        formRef.current.resetFields();
    };

    const onOkHandle = () => {
        formRef.current.validateFields().catch(async (errorInfo: ValidateErrorEntity) => {
            const {errorFields, values} = errorInfo;
            const currentErrorFields = errorFields.filter(errorMsg => {
                const {name: [name,]} = errorMsg;
                return currentKeys.includes(name as string);
            });
            if (!currentErrorFields.length) {
                let data = null;
                switch (userModalType) {
                    case 'login':
                        data = await dispatch(login(values as LoginRequestParams));
                        break;
                    case 'register':
                        data = await register(values as RegisterUserRequestParams);
                        break;
                    case 'edit':
                        data = await dispatch(updateUser(userInfo.id, values as UpdateUserRequestParams));
                        break;
                    default:
                        break;
                }
                if (data) {
                    onCancelHandle()
                }
            }
        });
    };

    const checkboxChangeHandle = (values: string[]): void => {
        if (values.length === 0) {
            message.warning('请至少勾选一项')
        } else {
            setCheckboxValues(values);
        }
    };

    return (
        <Modal
          title={title}
          maskClosable={false}
          visible={userModalVisible}
          onCancel={onCancelHandle}
          onOk={onOkHandle}
          okText="确认"
          cancelText="取消"
        >
            {userModalType === 'edit' ? (
                <div className="user-modal-checkbox">
                    <span className="user-modal-checkbox__text">选择您要修改的个人信息：</span>
                    <Checkbox.Group
                      options={checkboxOptions}
                      value={checkboxValues}
                      onChange={checkboxChangeHandle}
                    />
                </div>
            ) : null}
            <HeaderUserModalForm
              type={useMemo(() => (userModalType),[userModalType])}
              keys={useMemo(() => (currentKeys),[currentKeys])}
              ref={formRef}
            />
        </Modal>
    )
};

export default HeaderUserModal;
