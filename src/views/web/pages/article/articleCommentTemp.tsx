import React, {FC, ReactElement, useCallback, useState} from "react";
import {useMappedState} from "redux-react-hook";
import {Comment, Tooltip} from 'antd';
import {LikeOutlined, DislikeOutlined, DeleteOutlined} from '@ant-design/icons';
import dayJs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import ArticleCommentEditor from './articleCommentEditor';
import UserAvatar from '../../components/userAvatar';
import {CreateArticleCommentReplyRequestBody} from "../../../../types/article";

dayJs.extend(relativeTime);

interface ArticleCommentProps {
    type?: 'comment' | 'reply';
    children?: ReactElement;
    data: {
        id: number;
        commentId: number,
        userId: number;
        userName: string;
        userProfilePicture: string;
        toUserName?: string;
        likes: number;
        dislikes: number;
        createTime: string;
        content: string;
    };
    onSubmit: (id: number, data: CreateArticleCommentReplyRequestBody) => Promise<boolean>;
    onDelete: (id: number) => Promise<boolean>;
    onSuccess: () => Promise<void>;
}

const ArticleCommentTemp: FC<ArticleCommentProps> = ({type, data, onSubmit, onDelete, onSuccess, children}: ArticleCommentProps): ReactElement => {

    const currentUserIdState = useCallback(state => state.user.userInfo.id, ['user']);

    const currentUserId = useMappedState(currentUserIdState);

    const {id, commentId, likes, dislikes, userProfilePicture, userId, userName, toUserName, content, createTime} = data;

    const isComment = type === 'comment';

    const replyWay = isComment ? 10 : 20;

    const replyId = isComment ? null : id;

    const [visible, setVisible] = useState<boolean>(false);

    const [value, setValue] = useState<string>('');

    const [submitting, setSubmitting] = useState<boolean>(false);

    const fetchCreateArticleComment = async () => {
        setSubmitting(true);
        if (await onSubmit(commentId, {content: value, toUserId: userId, type: 30, replyWay, replyId})) {
            onSuccess();
        }
        setSubmitting(false);
    };

    const likeHandle = async () => {
        if (await onSubmit(commentId, {toUserId: userId, type: 10, replyWay, replyId, content: ' '})) {
            onSuccess();
        }
    };

    const dislikeHandle = async () => {
        if (await onSubmit(commentId, {toUserId: userId, type: 20, replyWay, replyId, content: ' '})) {
            onSuccess();
        }
    };

    const deleteHandle = async () => {
        if (await onDelete(id)) {
            onSuccess();
        }
    };

    const changeHandle = (e: any) => {
        setValue(e.target.value);
    };

    return (
        <Comment
          actions={[
              <div className="article-comment__btn">
                  <Tooltip title="Like">
                      <LikeOutlined
                        onKeyDown={likeHandle}
                        onClick={likeHandle}
                      />
                  </Tooltip>
                  {likes}
              </div>,
              <div className="article-comment__btn">
                  <Tooltip title="DisLike">
                      <DislikeOutlined
                        onKeyDown={dislikeHandle}
                        onClick={dislikeHandle}
                      />
                  </Tooltip>
                  {dislikes}
              </div>,
              (
                  currentUserId !== userId ?
                      (
                          <div
                            className="article-comment__btn"
                            onKeyDown={() => {setVisible(!visible)}}
                            onClick={() => {setVisible(!visible)}}
                            role="button"
                            tabIndex={0}
                          >
                              {`${visible ? '取消' : ''}回复`}
                          </div>
                      ) :
                        (
                            <div className="article-comment__btn">
                                <Tooltip title="Delete">
                                    <DeleteOutlined
                                      onKeyDown={deleteHandle}
                                      onClick={deleteHandle}
                                    />
                                </Tooltip>
                            </div>
                        )
              )
          ]}
          author={(
              <div className="comment__author">
                  {userName}
                  &nbsp;&nbsp;
                  {
                      toUserName ? (
                          <>
                              <span>回复</span>
                              &nbsp;&nbsp;
                              {toUserName}
                              &nbsp;&nbsp;
                          </>
                        ) : ''
                  }
                  <span className="comment__time">
                      {dayJs(createTime).fromNow()}
                  </span>
              </div>
          )}
          avatar={
              (
                  <UserAvatar size={32} profilePicture={userProfilePicture} username={userName} />
              )
          }
          content={content}
          key={`${type}_${id}`}
        >
            {visible ? (
                <ArticleCommentEditor
                  onChange={changeHandle}
                  onSubmit={fetchCreateArticleComment}
                  submitting={submitting}
                  value={value}
                  buttonName="发布"
                />
            ) : null}
            {children}
        </Comment>
    )
};

ArticleCommentTemp.defaultProps = {
    type: 'comment',
    children: null
};

export default ArticleCommentTemp;
