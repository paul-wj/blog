import React, {FC, ReactElement, useCallback} from 'react';
import {Card} from "antd";
import {useMappedState} from "redux-react-hook";
import {useHistory} from "react-router";
import {ArticleInfo} from "../../../../types/article";

const AppSiderArticle: FC = (): ReactElement => {

    const articleListState = useCallback(state => state.article.articleList, ['article.tagList']);

    const articleList = useMappedState(articleListState).filter((item: ArticleInfo, index: number) => index < 5);

    const history = useHistory();

    const goToPath = (id: number) => {
        history.push(`/article/${id}`)
    };

    return (
        <Card title="最近文章" className="app-sider-article">
            {
                articleList ?
                    articleList.map((recent: ArticleInfo) =>
                        (
                            <div
                              className="app-sider-article__item"
                              key={recent.id}
                              onKeyDown={() => {
                                  goToPath(recent.id)
                              }}
                              onClick={() => {
                                  goToPath(recent.id)
                              }}
                              role="button"
                              tabIndex={0}
                            >
                                {recent.title}
                            </div>
                        )
                    ) : null
            }
        </Card>
    )
};

export default AppSiderArticle;
