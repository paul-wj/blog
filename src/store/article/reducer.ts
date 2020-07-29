import {ArticleTypeEnum} from '../types';
import {IReduxAction} from '../../types/global';
import {ArticleInfo, CatalogInfo, TagInfo} from "../../types/article";

interface ArticleState {
    articleList: ArticleInfo[];
    categoryList: CatalogInfo[];
    tagList: TagInfo[];
}

/**
 * state
 */
const defaultState: ArticleState = {
    categoryList: [],
    tagList: [],
    articleList: []
};


/**
 * article Reducer
 */
export default function articleReducer(state = defaultState, action: IReduxAction<ArticleState>): ArticleState {
    const { type, payload } = action;
    return Object.keys(ArticleTypeEnum).includes(type) ? { ...state, ...payload } : state;
}
