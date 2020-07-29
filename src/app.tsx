import React, {ReactElement, useEffect} from "react";
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {useDispatch} from "redux-react-hook";
import routes from './router'
import {getArticleList, getCategories, getTags} from "./store/article/actions";

const App = (): ReactElement => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticleList());
        dispatch(getCategories());
        dispatch(getTags());
    }, []);

    return (
        // @ts-ignore: routes is react-router-config default data
        <BrowserRouter>{renderRoutes([...routes])}</BrowserRouter>
    )
};

export default App;
