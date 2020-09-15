import React, {FC, ReactElement, useEffect, useLayoutEffect, useState} from "react";
import SimpleMDE from 'simplemde'
import {translateMarkdown} from "../../../../lib/utils";

interface AdminArticleEditorProps {
    value: string;
    onChange: (value: string) => void;
}

interface ArticleEditorPos {
    ch: number;
    line: number;
}

const AdminArticleEditor: FC<AdminArticleEditorProps> = ({value, onChange}: AdminArticleEditorProps): ReactElement => {

    const [simpleMde, setSimpleMde] = useState<SimpleMDE>(null);

    const [pos, setPos] = useState<ArticleEditorPos>(null);

    useEffect(() => {
        if (simpleMde) {
            simpleMde.value(value);
            simpleMde.codemirror.extendSelection(pos || simpleMde.codemirror.constructor.Pos(simpleMde.codemirror.lastLine()))
        }
    }, [value]);

    useLayoutEffect(() => {
        const simpleMDE = new SimpleMDE({
            element: document.getElementById('editor'),
            autofocus: true,
            previewRender: translateMarkdown,
            placeholder: '请输入文章内容'
        });
        simpleMDE.codemirror.on("blur", () => {
            setPos(simpleMDE.codemirror.doc.getCursor());
            onChange(simpleMDE.value());
        });
        setSimpleMde(simpleMDE);
    }, []);

    return (
        <textarea id="editor" defaultValue={value} />
    )
};

export default AdminArticleEditor;
