import { useEffect, useMemo, useState } from "react";

import { Editor, useEditor } from "@tiptap/react";

import { ExtensionKit } from "../extensions/extension-kit";
import updateOnDB, {debounce } from "@/lib/utils/updateOnDB";

declare global {
    interface Window {
        editor: Editor | null;
    }
}

export const useBlockEditor = ({
    room,
    supabase,
    initialContent
}: {
    room?: string;
    supabase?: any;
    initialContent?: any;
}) => {

    const editor = useEditor(
        {
            autofocus: true,
            onCreate: ({ editor }) => {
                        editor.commands.setContent(initialContent);
            },
            // onUpdate: ({ editor }) => {
            //     updateOnDB(editor, room, supabase);
            // },
            extensions: [
                ...ExtensionKit(),
            ],
            editorProps: {
                attributes: {
                    autocomplete: "off",
                    autocorrect: "off",
                    autocapitalize: "off",
                    class: "min-h-full",
                },
            },
        },
    );

    const characterCount = editor?.storage.characterCount || {
        characters: () => 0,
        words: () => 0,
    };

    // window.editor = editor;

    return { editor, characterCount };
};
