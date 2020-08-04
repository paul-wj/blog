import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch} from "redux-react-hook";
import {Button, Divider, Popconfirm, Table, Drawer, message, Form, Input, Space} from "antd";
import {ColumnsType} from "antd/es/table";
import {CatalogInfo, CreateCategoryRequestBody} from "../../../../types/article";
import {getCategories} from "../../../../store/article/actions";
import {createCategory as fetchCreateCategory, editCategory as fetchEditCategory, deleteCategory as fetchDeleteCategory} from "../../../../service/article";

const size = 'small';

const AdminCategoryList: FC = (): ReactElement => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const [categoryList, setCategoryList] = useState<CatalogInfo[]>([]);

    const [visible, setVisible] = useState<boolean>(false);

    const [categoryId, setCategoryId] = useState<number>(null);

    const [form] = Form.useForm();

    const openDrawer = (row?: CatalogInfo) => {
        if (row) {
            const {id, name} = row;
            setCategoryId(id);
            form.setFields([
                {name: 'name', value: name}
            ])
        }
        setVisible(true);
    };

    const closeDrawerHandle = () => {
        setVisible(false);
        setCategoryId(null);
        form.resetFields();
    };

    const getCategoryList = async () => {
        setLoading(true);
        const list = await dispatch(getCategories());
        if (list) {
            // @ts-ignore
            setCategoryList(list);
        }
        setLoading(false);
    };

    const createCategory = async (params: CreateCategoryRequestBody) => {
        const {flags} = await fetchCreateCategory(params);
        if (flags === 'success') {
            message.success(`新增目录成功`);
            closeDrawerHandle();
            getCategoryList();
        }
    };

    const editCategory = async (params: CreateCategoryRequestBody) => {
        const {flags} = await fetchEditCategory(categoryId, params);
        if (flags === 'success') {
            message.success(`编辑目录成功`);
            closeDrawerHandle();
            getCategoryList();
        }
    };

    const deleteCategory = async (id: number) => {
        const {flags} = await fetchDeleteCategory(id);
        if (flags === 'success') {
            message.success(`删除目录成功`);
            getCategoryList();
        }
    };

    const onSubmit = () => {
        form.submit()
    };

    const onFinish = (params: CreateCategoryRequestBody) => {
        if (categoryId) {
            editCategory(params);
        } else {
            createCategory(params);
        }
    };

    const columns: ColumnsType = [
        {
            title: 'id',
            dataIndex: 'id',
            align: 'center',
            width: 50
        },
        {
            title: '名称',
            dataIndex: 'name',
            align: 'center',
            render: (value: string) => <div className="text-overflow">{value}</div>
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            align: 'center'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            align: 'center'
        },
        {
            title: '操作',
            align: 'center',
            key: 'action',
            width: 170,
            render: (value, record: CatalogInfo) => (
                <div>
                    <Button
                      type="link"
                      size={size}
                      onClick={() => {openDrawer(record)}}
                    >
                        编辑
                    </Button>
                    <Divider type="vertical" />
                    <Popconfirm
                      title={`确定删除目录"${record.name}"吗?`}
                      okText="确定"
                      cancelText="取消"
                      onConfirm={() => {deleteCategory(record.id)}}
                    >
                        <Button type="link" size={size}>删除</Button>
                    </Popconfirm>
                </div>
            )
        }
    ];

    useEffect(() => {
        getCategoryList();
    }, []);

    return (
        <div className="Category-list">
            <p className="tr mb20"><Button onClick={() => {openDrawer()}} type="primary">新增目录</Button></p>
            <Table
              loading={loading}
              columns={columns}
              dataSource={categoryList}
              bordered
            />
            <Drawer
              title={`${categoryId ? '编辑' : '新增'}目录`}
              placement="right"
              width={350}
              maskClosable={false}
              onClose={closeDrawerHandle}
              visible={visible}
            >
                <Form
                  name="article_form"
                  layout="horizontal"
                  form={form}
                  scrollToFirstError
                  onFinish={onFinish}
                >
                    <Form.Item
                      name="name"
                      label="目录名称"
                      rules={[
                          {required: true, message: 'Please input category Name!'}
                      ]}
                    >
                        <Input placeholder="请输入目录名称" />
                    </Form.Item>
                    <Form.Item>
                        <p className="tc">
                            <Space size="middle">
                                <Button type="primary" onClick={onSubmit}>
                                    提交
                                </Button>
                                <Button htmlType="button" onClick={closeDrawerHandle}>
                                    取消
                                </Button>
                            </Space>
                        </p>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
};

export default AdminCategoryList;
