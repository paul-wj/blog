import React, {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {useMappedState} from "redux-react-hook";
import {useHistory} from "react-router";
import {Table, Button, Divider, Popconfirm, Tag, message} from "antd";
import {ColumnsType} from "antd/es/table";
import {getArticleSimplePageList as fetchGetArticleSimplePageList, deleteArticle as fetchDeleteArticle} from "../../../../service/article";
import {ArticleInfo, ArticlePageListRequestBody, CatalogInfo, TagInfo} from "../../../../types/article";

const defaultLimit = 10;

const size = 'small';

export const AdminArticleList: FC = (): ReactElement => {

    const history = useHistory();

    const articleState = useCallback(state => ({
        tagList: state.article.tagList,
        categoryList: state.article.categoryList,
    }), ['article']);

    const {tagList, categoryList} = useMappedState(articleState);

    const [requestParams, setRequestParams] = useState<ArticlePageListRequestBody>({limit: defaultLimit, offset: 0, title: null});

    const [loading, setLoading] = useState<boolean>(false);

    const [tableData, setTableData] = useState<ArticleInfo[]>([]);

    const [total, setTotal] = useState<number>(0);

    const getArticleSimplePageList = async () => {
        setLoading(true);
        const {flags, data} = await fetchGetArticleSimplePageList(requestParams);
        if (flags === 'success') {
            const items = data?.items || [];
            setTableData(items);
            setTotal(data?.total || 0);
        }
        setLoading(false);
    };

    const deleteArticle = async (id: number) => {
      const {flags} = await fetchDeleteArticle(id);
      if (flags === 'success') {
          message.success(`删除成功！`);
          getArticleSimplePageList();
      }
    };

    const paginationChangeHandle = (page: number) => {
        setRequestParams({...requestParams, offset: (page - 1) * requestParams.limit});
    };

    const pagination = {
        onChange: paginationChangeHandle,
        pageSize: defaultLimit,
        total,
        hideOnSinglePage: true
    };

    const columns: ColumnsType = [
        {
            title: 'id',
            dataIndex: 'id',
            align: 'center',
            width: 50
        },
        {
            title: '标题',
            dataIndex: 'title',
            align: 'center',
            render: (value: string) => <div className="text-overflow">{value}</div>
        },
        {
            title: '标签',
            dataIndex: 'tagIds',
            align: 'center',
            render: (tagIds: string) => (
                <>
                    {
                        tagList.filter((item: TagInfo) => tagIds.split(',').includes(`${item.id}`)).map((tag: TagInfo) => (
                            <Tag
                              key={tag.id}
                              color={tag.color}
                            >
                                {tag.name}
                            </Tag>
                        ))
                    }
                </>
            )
        },
        {
            title: '目录',
            dataIndex: 'categories',
            align: 'center',
            render: (categories: string) => (
                <>
                    {
                        categoryList.filter((item: CatalogInfo) => categories.split(',').includes(`${item.id}`)).map((catalog: CatalogInfo) => (
                            <Tag key={catalog.id}>
                                {catalog.name}
                            </Tag>
                        ))
                    }
                </>
            )
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
            render: (value, record: ArticleInfo) => (
                <div>
                    <Button
                      type="link"
                      size={size}
                      onClick={() => {history.push(`/admin/article/edit?id=${record.id}`)}}
                    >
                        编辑
                    </Button>
                    <Divider type="vertical" />
                    <Popconfirm
                      title={`确定删除文章"${record.title}"吗?`}
                      okText="确定"
                      cancelText="取消"
                      onConfirm={() => {deleteArticle(record.id)}}
                    >
                        <Button type="link" size={size}>删除</Button>
                    </Popconfirm>
                </div>
            )
        }
    ];

    useEffect(() => {
        getArticleSimplePageList();
    }, [requestParams]);

    return (
        <div>
            <Table
              loading={loading}
              pagination={pagination}
              columns={columns}
              dataSource={tableData}
              bordered
            />
        </div>
    )
};

export default AdminArticleList;
