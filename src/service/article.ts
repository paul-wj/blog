import Request, {FetchResponse, FetchPageListResponse} from '../lib/plugins/request';
import {
    TagInfo,
    CatalogInfo,
    ArticleInfo,
    ArticlePageListRequestBody,
    CommentInfo,
    CreateArticleCommentReplyRequestBody,
    CreateArticleRequestBody,
    CreateTagRequestBody,
    CreateCategoryRequestBody
} from "../types/article";
import {
    PageListResponse,
    RequestPageBody
} from "../types/global";

export const getArticleAllList = (): FetchResponse<ArticleInfo[]> => {
    return Request.fetch<ArticleInfo[]>('/article/all');
};

export const getTagAllList = (): FetchResponse<TagInfo[]> => {
    return Request.fetch<TagInfo[]>('/tag/all');
};

export const createTag = (data: CreateTagRequestBody): FetchResponse<boolean> => {
    return Request.fetch<boolean, CreateTagRequestBody>('/tag', data, {method: 'post'});
};

export const editTag = (id: number, data: CreateTagRequestBody): FetchResponse<boolean> => {
    return Request.fetch<boolean, CreateTagRequestBody>(`/tag/${id}`, data, {method: 'patch'});
};

export const deleteTag = (id: number): FetchResponse<boolean> => {
    return Request.fetch<boolean, null>(`/tag/${id}`, null, {method: 'delete'});
};

export const getCategoryAllList = (): FetchResponse<CatalogInfo[]> => {
    return Request.fetch<CatalogInfo[]>('/category/all');
};

export const createCategory = (data: CreateCategoryRequestBody): FetchResponse<boolean> => {
    return Request.fetch<boolean, CreateCategoryRequestBody>('/category', data, {method: 'post'});
};

export const editCategory = (id: number, data: CreateCategoryRequestBody): FetchResponse<boolean> => {
    return Request.fetch<boolean, CreateCategoryRequestBody>(`/category/${id}`, data, {method: 'patch'});
};

export const deleteCategory = (id: number): FetchResponse<boolean> => {
    return Request.fetch<boolean, null>(`/category/${id}`, null, {method: 'delete'});
};

export const getArticlePageList = (data: ArticlePageListRequestBody): FetchPageListResponse<ArticleInfo> => {
    return Request.fetch<PageListResponse<ArticleInfo>, ArticlePageListRequestBody>('/article/page', data, {method: 'get'} );
};

export const getArticleById = (id: string): FetchResponse<ArticleInfo> => {
    return Request.fetch<ArticleInfo>(`/article/${id}`);
};


export const createArticle = (params: CreateArticleRequestBody): FetchResponse<boolean> => {
    return Request.fetch<boolean, CreateArticleRequestBody>(`/article`, params, {method: 'post'});
};

export const editArticle = (id: number, params: CreateArticleRequestBody): FetchResponse<boolean> => {
    return Request.fetch<boolean, CreateArticleRequestBody>(`/article/${id}`, params, {method: 'patch'});
};

export const deleteArticle = (id: number): FetchResponse<boolean> => {
    return Request.fetch<boolean, null>(`/article/${id}`, null, {method: 'delete'});
};

export const getArticleCommentList = (id: string): FetchResponse<CommentInfo[]> => {
    return Request.fetch<CommentInfo[]>(`/article/comment/${id}`);
};

export const createArticleComment = (id: string, data: {content: string}): FetchResponse<boolean> => {
    return Request.fetch<boolean, {content: string}>(`/article/comment/${id}`, data, {method: "POST"});
};

export const createArticleCommentReply = (id: number, data: CreateArticleCommentReplyRequestBody): FetchResponse<boolean> => {
    return Request.fetch<boolean, CreateArticleCommentReplyRequestBody>(`/article/reply/${id}`, data, {method: "POST"});
};

export const deleteArticleComment = (commentId: number): FetchResponse<boolean> => {
    return Request.fetch<boolean, null>(`/article/comment/${commentId}`, null, {method: 'delete'});
};

export const deleteArticleCommentReply = (replyId: number): FetchResponse<boolean> => {
    return Request.fetch<boolean, null>(`/article/reply/${replyId}`, null, {method: 'delete'});
};

export const getArticleSimplePageList = (params: RequestPageBody): FetchPageListResponse<ArticleInfo> => {
    return Request.fetch<PageListResponse<ArticleInfo>, RequestPageBody>(`/article/page/simple`, params, {method: 'get'});
};


export const getArticlePageListByCategoryId = (id: string, params: RequestPageBody): FetchPageListResponse<ArticleInfo> => {
    return Request.fetch<PageListResponse<ArticleInfo>, RequestPageBody>(`/article/category/${id}`, params, {method: 'get'});
};

export const getArticlePageListByTagId = (id: string, params: RequestPageBody): FetchPageListResponse<ArticleInfo> => {
    return Request.fetch<PageListResponse<ArticleInfo>, RequestPageBody>(`/article/tag/${id}`, params, {method: 'get'});
};
