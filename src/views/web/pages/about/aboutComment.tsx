import React, {FC, ReactElement, useCallback, useState, useEffect, memo, useMemo} from "react";
import {useMappedState} from "redux-react-hook";
import {Comment, message} from "antd";
import {GithubOutlined} from '@ant-design/icons';
import AppCommentEditor from '../../components/comment/commentEditor';
import AboutReply from './aboutReply';
import UserAvatar from '../../components/userAvatar';
import {
    getAboutCommentList,
    createAboutComment,
} from "../../../../service/user";

const style = {
    fontSize: '32px'
};

const MemoAboutReply = memo(AboutReply);

const AboutComment: FC = (): ReactElement => {

    const userState = useCallback(state => ({isLogin: state.user.isLogin, userInfo: state.user.userInfo}), ['user']);

    const {isLogin, userInfo} = useMappedState(userState);

    const [value, setValue] = useState<string>('');

    const [submitting, setSubmitting] = useState<boolean>(false);

    const [comments, setComments] = useState([]);

    const fetchGetAboutCommentList = async () => {
        const {flags, data} = await getAboutCommentList();
        if (flags === 'success') {
            setComments(data || []);
        }
    };

    const fetchCreateArticleComment = async () => {
        setSubmitting(true);
        const {flags} = await createAboutComment({content: value});
        if (flags === 'success') {
            message.success(`添加成功`);
            setValue('');
            fetchGetAboutCommentList();
        }
        setSubmitting(false);
    };

    useEffect(() => {
        fetchGetAboutCommentList();
    }, []);

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
                <MemoAboutReply
                  comments={useMemo(() => (comments),[comments])}
                  onSuccess={useCallback(fetchGetAboutCommentList, [])}
                />
            </div>
        </div>
    )
};

export default AboutComment;
