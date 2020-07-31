import React, {FC, memo, ReactElement, useCallback} from "react";
import {message} from "antd";
import AppComment, {AppCommentRequestBody} from "../../components/comment/comment";
import {AboutCommentInfo, AboutCommentReplyInfo} from "../../../../types/user";
import {createAboutCommentReply} from "../../../../service/user";


interface AboutReplyProps {
    comments: AboutCommentInfo[];
    onSuccess: () => Promise<void>;
}

const MemoAppComment = memo(AppComment);

const formatterCommentInfo = (comment: AboutCommentInfo) => {
    const {id, userName, userId, userPic: userProfilePicture, createTime, content} = comment;
    return {id, commentId: id, userName, userId, userProfilePicture, createTime, content}
};

const formatterReplyInfo = (reply: AboutCommentReplyInfo) => {
    const {id, commentId, userName, userId, userPic: userProfilePicture, toUserName, createTime, content} = reply;
    return {id, commentId, userName, userId, userProfilePicture, toUserName, createTime, content}
};

const AboutReply: FC<AboutReplyProps> = ({onSuccess, comments}: AboutReplyProps): ReactElement => {

    const fetchCreateAboutCommentReply = async (commentId: number, {replyWay: replyType, content, replyId, toUserId: sendId}: AppCommentRequestBody) => {
        const {flags} = await createAboutCommentReply({commentId, replyType, content, replyId, sendId});
        const isSuccess = flags === 'success';
        if (isSuccess) {
            message.success('回复成功');
        }
        return isSuccess;
    };

    const createReplyList = (replyList: AboutCommentReplyInfo[]) => {
        return (
            <>
                {
                    replyList.map((reply: AboutCommentReplyInfo) => (
                        <MemoAppComment
                          source="about"
                          type="reply"
                          data={formatterReplyInfo(reply)}
                          onSubmit={useCallback(fetchCreateAboutCommentReply, [])}
                          onSuccess={useCallback(onSuccess, [])}
                        />
                    ))
                }
            </>
        )
    };

    const CommentList = (): ReactElement => {
        return (
            <>
                {
                    comments.map((comment: AboutCommentInfo) => (
                        <MemoAppComment
                          source="about"
                          type="comment"
                          data={formatterCommentInfo(comment)}
                          onSubmit={useCallback(fetchCreateAboutCommentReply, [])}
                          onSuccess={useCallback(onSuccess, [])}
                        >
                            {createReplyList(comment.replyList)}
                        </MemoAppComment>
                    ))
                }
            </>
        )
    };

    return (
        <CommentList />
    )
};

export default AboutReply;
