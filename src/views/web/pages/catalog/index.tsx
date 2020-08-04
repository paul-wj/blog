import React, {FC, ReactElement, useCallback} from 'react';
import {useMappedState} from "redux-react-hook";
import {useHistory} from "react-router";
import {Badge, Tag} from 'antd';
import {CatalogInfo} from "../../../../types/article";
import './index.scss';

const Catalog: FC = (): ReactElement => {

    const history = useHistory();

    const categoryListState = useCallback(state => state.article.categoryList, ['article.categoryList']);

    const categoryList = useMappedState(categoryListState);

    return (
        <div className="catalog-container">
            <div className="catalog-container__title">Categories</div>
            <p className="catalog-container__total">
                The total number of categories is
                &nbsp;&nbsp;
                <span>
                    {categoryList.length}
                </span>
            </p>
            <div className="catalog-container__content">
                {categoryList.map((category: CatalogInfo) => (
                    <Badge
                      key={category.id}
                      count={category.counts}
                    >
                        <Tag
                          className="catalog-container__tag"
                          onClick={() => {history.push(`/catalog/${category.id}`)}}
                        >
                            {category.name}
                        </Tag>
                    </Badge>
                ))}
            </div>
        </div>
    )
};

export default Catalog;
