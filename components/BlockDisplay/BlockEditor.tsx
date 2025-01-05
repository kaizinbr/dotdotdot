"use client";

import { EditorContent, PureEditorContent } from "@tiptap/react";
import React, { useMemo, useRef, useEffect } from "react";

import { useBlockEditor } from "../../hooks/useBlockEditorOff";

import "@/styles/index.css";

import { EditorContext } from "../../context/EditorContext";

export const BlockEditor = ({ json }: { json: string }) => {
    // const menuContainerRef = useRef(null);
    const editorRef = useRef<PureEditorContent | null>(null);
    // console.log(json);

    const { editor } = useBlockEditor(json);

    const providerValue = useMemo(() => {
        return {};
    }, []);

    if (!editor) {
        return null;
    }

    // console.log(editor.getJSON());

    return (
        <EditorContext.Provider value={providerValue}>
            <div className="relative flex flex-col flex-1 h-full overflow-hidden">
                <EditorContent
                    editor={editor}
                    ref={editorRef as React.RefObject<HTMLDivElement>}
                    className="flex-1 overflow-y-auto"
                />
            </div>
        </EditorContext.Provider>
    );
};

export default BlockEditor;
