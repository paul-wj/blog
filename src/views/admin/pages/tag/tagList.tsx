import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch} from "redux-react-hook";
import {Button, Divider, Popconfirm, Table, Drawer, message, Form, Input, Space} from "antd";
import {ColumnsType} from "antd/es/table";
import {TagInfo, CreateTagRequestBody} from "../../../../types/article";
import {getTags} from "../../../../store/article/actions";
import {createTag as fetchCreateTag, editTag as fetchEditTag, deleteTag as fetchDeleteTag} from "../../../../service/article";
import {getRandomColor} from "../../../../lib/utils";

const size = 'small';

const AdminTagList: FC = (): ReactElement => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const [tagList, setTagList] = useState<TagInfo[]>([]);

    const [visible, setVisible] = useState<boolean>(false);

    const [tagId, setTagId] = useState<number>(null);

    const [form] = Form.useForm();

    const openDrawer = (row?: TagInfo) => {
        if (row) {
            const {id, name, color} = row;
            setTagId(id);
            form.setFields([
                {name: 'name', value: name},
                {name: 'color', value: color}
            ])
        } else {
            form.setFields([
                {name: 'color', value: getRandomColor()}
            ])
        }
        setVisible(true);
    };

    const closeDrawerHandle = () => {
        setVisible(false);
        setTagId(null);
        form.resetFields();
    };

    const getTagList = async () => {
        setLoading(true);
        const list = await dispatch(getTags());
        if (list) {
            // @ts-ignore
            setTagList(list);
        }
        setLoading(false);
    };

    const createTag = async (params: CreateTagRequestBody) => {
      const {flags} = await fetchCreateTag(params);
      if (flags === 'success') {
          message.success(`新增标签成功`);
          closeDrawerHandle();
          getTagList();
      }
    };

    const editTag = async (params: CreateTagRequestBody) => {
        const {flags} = await fetchEditTag(tagId, params);
        if (flags === 'success') {
            message.success(`编辑标签成功`);
            closeDrawerHandle();
            getTagList();
        }
    };

    const deleteTag = async (id: number) => {
        const {flags} = await fetchDeleteTag(id);
        if (flags === 'success') {
            message.success(`删除标签成功`);
            getTagList();
        }
    };

    const onSubmit = () => {
        form.submit()
    };

    const onFinish = (params: CreateTagRequestBody) => {
        if (tagId) {
            editTag(params);
        } else {
            createTag(params);
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
            render: (value, record: TagInfo) => (
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
                      title={`确定删除标签"${record.name}"吗?`}
                      okText="确定"
                      cancelText="取消"
                      onConfirm={() => {deleteTag(record.id)}}
                    >
                        <Button type="link" size={size}>删除</Button>
                    </Popconfirm>
                </div>
            )
        }
    ];

    useEffect(() => {
        getTagList();
    }, []);

    return (
        <div className="tag-list">
            <p className="tr mb20"><Button onClick={() => {openDrawer()}} type="primary">新增目录</Button></p>
            <Table
              loading={loading}
              columns={columns}
              dataSource={tagList}
              bordered
            />
            <Drawer
              title={`${tagId ? '编辑' : '新增'}标签`}
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
                      label="标签名称"
                      rules={[
                          {required: true, message: 'Please input tag Name!'}
                      ]}
                    >
                        <Input placeholder="请输入标签名称" />
                    </Form.Item>
                    <Form.Item
                      name="color"
                      label="标签颜色"
                      rules={[
                          {required: true, message: 'Please input tag Color!'}
                      ]}
                    >
                        <Input placeholder="请输入标签颜色" />
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

export default AdminTagList;
