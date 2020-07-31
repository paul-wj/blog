import React, {FC, ReactElement, useCallback, useState, useEffect, memo, useMemo} from "react";
import {useMappedState} from "redux-react-hook";
import {Comment, message} from "antd";
import {GithubOutlined} from '@ant-design/icons';
import AppCommentEditor from '../../components/comment/commentEditor';
import UserAvatar from '../../components/userAvatar';
import ArticleReply from './articleReply';
import {
    getArticleCommentList,
    createArticleComment,
} from "../../../../service/article";

interface ArticleCommentProps {
    id: string;
}

const style = {
    fontSize: '32px'
};

const MemoArticleReply = memo(ArticleReply);

const ArticleComment: FC<ArticleCommentProps> = ({id}: ArticleCommentProps): ReactElement => {

    const userState = useCallback(state => ({isLogin: state.user.isLogin, userInfo: state.user.userInfo}), ['user']);

    const {isLogin, userInfo} = useMappedState(userState);

    const [value, setValue] = useState<string>('');

    const [submitting, setSubmitting] = useState<boolean>(false);

    const [comments, setComments] = useState([]);

    const fetchGetArticleCommentList = async () => {
        const {flags, data} = await getArticleCommentList(id);
        if (flags === 'success') {
            setComments(data || []);
        }
    };

    const fetchCreateArticleComment = async () => {
        setSubmitting(true);
        const {flags} = await createArticleComment(id, {content: value});
        if (flags === 'success') {
            message.success(`添加成功`);
            setValue('');
            fetchGetArticleCommentList();
        }
        setSubmitting(false);
    };

    useEffect(() => {
       fetchGetArticleCommentList();
    }, [id]);

    const changeHandle = (e: any) => {
        setValue(e.target.value);
    };

    return (
        <div className="article-comment">
            <Comment
              avatar={
                  isLogin ?
                      (
                          <UserAvatar
                            profilePicture={userInfo.profilePicture}
                            username={userInfo.username}
                            avatarColor={userInfo.avatarColor}
                            size={32}
                          />
                      ) :
                          <GithubOutlined style={style} />
              }
              content={
                  (
                      <AppCommentEditor
                        onChange={changeHandle}
                        onSubmit={fetchCreateArticleComment}
                        submitting={submitting}
                        value={value}
                      />
                  )
              }
            />
            <div className="article-comment__list">
                <MemoArticleReply
                  comments={useMemo(() => (comments),[comments])}
                  id={useMemo(() => (id),[id])}
                  onSuccess={useCallback(fetchGetArticleCommentList, [])}
                />
            </div>
        </div>
    )
};

export default ArticleComment;
