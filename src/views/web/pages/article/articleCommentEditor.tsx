import React, {FC, ReactElement} from "react";
import {Form, Input, Button} from 'antd';

const {TextArea} = Input;

export interface ArticleCommentEditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    submitting: boolean;
    value: string;
    buttonName?: string;
}

const ArticleCommentEditor: FC<ArticleCommentEditorProps> = ({onChange, onSubmit, submitting, value, buttonName}: ArticleCommentEditorProps): ReactElement => {
    return (
        <>
            <Form.Item>
                <TextArea rows={4} onChange={e => {onChange(e)}} value={value} />
            </Form.Item>
            <Form.Item className="tr">
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    {buttonName}
                </Button>
            </Form.Item>
        </>
    )
};

ArticleCommentEditor.defaultProps = {
    buttonName: '添加评论'
};

export default ArticleCommentEditor;
