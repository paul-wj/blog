import {Dispatch} from 'redux';
import {ArticleTypeEnum} from '../types';
import {getArticleAllList, getTagAllList, getCategoryAllList} from "../../service/article";
import {ArticleInfo, CatalogInfo, TagInfo} from "../../types/article";

export const getArticleList = () => {
    return async (dispatch: Dispatch): Promise<ArticleInfo[]> => {
        const {flags, data} = await getArticleAllList();
        let result: ArticleInfo[] = [];
        if (flags === 'success' && data?.length) {
            result = data;
        }
        dispatch({ type: ArticleTypeEnum.ARTICLE_GET_LIST, payload: {articleList: result} });
        return result;
    }
};

export const getTags = () => {
    return async (dispatch: Dispatch): Promise<TagInfo[]> => {
        const {flags, data} = await getTagAllList();
        let result: TagInfo[] = [];
        if (flags === 'success' && data?.length) {
            result = data;
        }
        dispatch({ type: ArticleTypeEnum.ARTICLE_GET_TAG_LIST, payload: {tagList: result} });
        return result;
    }
};

export const getCategories = () => {
    return async (dispatch: Dispatch): Promise<CatalogInfo[]> => {
        const {flags, data} = await getCategoryAllList();
        let result: CatalogInfo[] = [];
        if (flags === 'success' && data?.length) {
            result = data;
        }
        dispatch({ type: ArticleTypeEnum.ARTICLE_GET_CATEGORY_LIST, payload: {categoryList: result} });
        return result;
    }
};
