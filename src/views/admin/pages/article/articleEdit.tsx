import React, {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router";
import {useMappedState} from "redux-react-hook";
import {Form, Input, Select, Button, Space, message} from "antd";
import AdminArticleEditor from './articleEditor';
import {CatalogInfo, CreateArticleRequestBody} from "../../../../types/article";
import {decodeQuery} from "../../../../lib/utils";
import {getArticleById as FetchGetArticleById, createArticle as FetchCreateArticle, editArticle as FetchEditArticle} from "../../../../service/article";
import './index.scss';

const {Option} = Select;

const ArticleEdit: FC = (): ReactElement => {

    const history = useHistory();

    const {search} = useLocation();

    const articleState = useCallback(state => ({
        tagList: state.article.tagList,
        categoryList: state.article.categoryList,
    }), ['article']);

    const {tagList, categoryList} = useMappedState(articleState);

    const [form] = Form.useForm();

    const [articleId, setArticleId] = useState<number>(null);

    const setDefaultFields = (params: CreateArticleRequestBody) => {
        form.setFields(Object.keys(params).map((name: keyof CreateArticleRequestBody) => ({
            name,
            value: params[name]
        })));
    };

    const getArticleById = async (id: string) => {
        const {flags, data} = await FetchGetArticleById(id);
        if (flags === 'success') {
            const {id: currentId, content, title, categories, tagIds} = data;
            setArticleId(currentId);
            setDefaultFields({content, title, categories, tagIds});
        }
    };

    const createArticle = async (params: CreateArticleRequestBody) => {
        const {flags} = await FetchCreateArticle(params);
        if (flags === 'success') {
            message.success('新增文章成功');
            history.push('/admin/article/list')
        }
    };

    const editArticle = async (id: number, params: CreateArticleRequestBody) => {
        const {flags} = await FetchEditArticle(id, params);
        if (flags === 'success') {
            message.success('保存文章成功');
            history.push('/admin/article/list')
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    const onSubmit = () => {
        form.submit()
    };

    const onFinish = (values: CreateArticleRequestBody) => {
        if (articleId) {
            editArticle(articleId, values);
        } else {
            createArticle(values);
        }
    };

    useEffect(() => {
        if (search) {
            const {id} = decodeQuery<{id: string}>(search);
            getArticleById(id);
        }
    }, [search]);

    return (
        <div className="article-create">
            <Form
              name="article_form"
              layout="horizontal"
              form={form}
              scrollToFirstError
              onFinish={onFinish}
            >
                <Form.Item
                  name="title"
                  label="标题"
                  rules={[
                      {required: true, message: 'Please input article Title!'}
                  ]}
                >
                    <Input placeholder="请输入文章标题" />
                </Form.Item>
                <Form.Item
                  name="categories"
                  label="目录"
                  rules={[
                      {required: true, message: 'Please select article Categories!'}
                  ]}
                >
                    <Select mode="multiple" placeholder="请选择目录">
                        {
                            categoryList.map((category: CatalogInfo) => (
                                <Option
                                  value={category.id}
                                  key={category.id}
                                >
                                    {category.name}
                                </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                  name="tagIds"
                  label="标签"
                  rules={[
                      {required: true, message: 'Please select article TagIds!'}
                  ]}
                >
                    <Select mode="multiple" placeholder="请选择标签">
                        {
                            tagList.map((tag: CatalogInfo) => (
                                <Option
                                  value={tag.id}
                                  key={tag.id}
                                >
                                    {tag.name}
                                </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                  name="content"
                  label="内容"
                  rules={[
                      {required: true, message: 'Please input article Content!'}
                  ]}
                >
                    {/* @ts-ignore */}
                    <AdminArticleEditor />
                </Form.Item>
            </Form>
            <Form.Item>
                <p className="tc">
                    <Space size="middle">
                        <Button type="primary" onClick={onSubmit}>
                            提交
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            重置
                        </Button>
                    </Space>
                </p>
            </Form.Item>
        </div>
    )
};

export default ArticleEdit;
