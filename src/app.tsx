import React, {ReactElement, useCallback, useEffect} from "react";
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {useDispatch, useMappedState} from "redux-react-hook";
import routes from './router';
import {getArticleList, getCategories, getTags} from "./store/article/actions";

const App = (): ReactElement => {

    const isLoginState = useCallback(state => state.user.isLogin, ['user.isLogin']);

    const isLogin = useMappedState(isLoginState);

    const currentRouter = isLogin ? routes : routes.filter((route) => route.path !== '/admin');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticleList());
        dispatch(getCategories());
        dispatch(getTags());
    }, []);

    return (
        // @ts-ignore: routes is react-router-config default data
        <BrowserRouter>{renderRoutes([...currentRouter])}</BrowserRouter>
    )
};

export default App;
