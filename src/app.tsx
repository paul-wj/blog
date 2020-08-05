import React, {ReactElement, useEffect} from "react";
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {useDispatch} from "redux-react-hook";
import {getArticleList, getCategories, getTags} from "./store/article/actions";
import AppPlayer from './views/components/player';
import routes from './router';

const App = (): ReactElement => {

    const currentRouter = routes;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticleList());
        dispatch(getCategories());
        dispatch(getTags());
    }, []);

    return (
        <BrowserRouter>
            {/* @ts-ignore: routes is react-router-config default data */}
            {renderRoutes([...currentRouter])}
            <AppPlayer />
        </BrowserRouter>
    )
};

export default App;
