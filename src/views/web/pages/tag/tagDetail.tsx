import React, {FC, ReactElement} from 'react';
import {useParams} from "react-router";
import TagArticlePageList from '../../components/tags/tagList';


const TagDetail: FC = (): ReactElement => {

    const {id} = useParams<{id: string}>();

    return (
        <TagArticlePageList key="tagDetail" id={id} />
    )
};

export default TagDetail;
