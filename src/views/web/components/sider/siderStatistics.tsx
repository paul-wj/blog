import React, {FC, ReactElement, useState, useCallback} from 'react';
import {useHistory} from "react-router";
import {Card, Row, Col} from "antd";
import {useMappedState} from "redux-react-hook";

interface StatisticsConfig {
    label: string;
    value: number;
    path?: string;
}

const AppSiderStatistics: FC = (): ReactElement => {

    const [statisticsList, setStatisticsList] = useState([] as StatisticsConfig[]);

    const articleState = useCallback(state => {
        const {articleList, tagList, categoryList} = state.article;
        setStatisticsList([
            {label: '文章', value: articleList?.length || 0, path: '/'},
            {label: '目录', value: categoryList?.length || 0, path: '/catalog'},
            {label: '标签', value: tagList?.length || 0, path: '/archives'}
        ]);
        return state.article;
    }, ['article']);

    const history = useHistory();

    const goToPath = (path: string, index: number) => {
        if (index < 2) {
            history.push(path)
        }
    };

    useMappedState(articleState);

    return (
        <Card className="app-sider-statistics">
            <Row gutter={24}>
                {
                    statisticsList.map((statistics, index) => (
                        <Col
                          span={24 / statisticsList.length}
                          key={statistics.label}
                          className="app-sider-statistics__list"
                        >
                            <span
                              className={`app-sider-statistics__num ${index < 2 ? 'link' : ''}`}
                              onKeyDown={() => {
                                  goToPath(statistics.path, index)
                              }}
                              onClick={() => {
                                  goToPath(statistics.path, index)
                              }}
                              role="button"
                              tabIndex={0}
                            >
                                {statistics.value}
                            </span>
                            <br />
                            <span className="app-sider-statistics__name">
                                {statistics.label}
                            </span>
                        </Col>
                    ))
                }
            </Row>
        </Card>
    )
};

export default AppSiderStatistics;
