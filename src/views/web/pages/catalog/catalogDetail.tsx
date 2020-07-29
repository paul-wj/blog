import React, {FC, ReactElement} from 'react';
import {useParams} from "react-router";
import TagArticlePageList from '../../components/tags/tagList';


const CatalogDetail: FC = (): ReactElement => {

    const {id} = useParams<{id: string}>();

    return (
        <TagArticlePageList id={id} type="category" />
    )
};

export default CatalogDetail;
