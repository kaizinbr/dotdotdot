import { useEffect, useMemo, useState } from "react";

import { Editor, useEditor } from "@tiptap/react";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { TiptapCollabProvider, WebSocketStatus } from "@hocuspocus/provider";
import type { Doc as YDoc } from "yjs";

import { ExtensionKit } from "../extensions/extension-kit";
import { userColors, userNames } from "../lib/constants";
import { randomElement } from "../lib/utils";
import { EditorUser } from "../components/BlockEditor/types";
import { useSidebar } from "./useSidebar";
// import { initialContent } from "../lib/data/initialContent";
import updateOnDB, {debounce } from "@/lib/utils/updateOnDB";

declare global {
    interface Window {
        editor: Editor | null;
    }
}

export const useBlockEditor = ({
    ydoc,
    provider,
    room,
    supabase,
    initialContent
}: {
    ydoc: YDoc;
    provider?: TiptapCollabProvider | null | undefined;
    room?: string;
    supabase?: any;
    initialContent?: any;
}) => {
    const leftSidebar = useSidebar();
    const [collabState, setCollabState] = useState<WebSocketStatus>(
        WebSocketStatus.Connecting,
    );

    // console.log(provider, "aaaa")

    const editor = useEditor(
        {
            autofocus: true,
            onCreate: ({ editor }) => {
                        editor.commands.setContent(initialContent);
            },
            onUpdate: ({ editor }) => {
                updateOnDB(editor, room, supabase);
            },
            extensions: [
                ...ExtensionKit({
                    provider,
                }),
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
        [ydoc, provider],
    );

    const users = useMemo(() => {
        if (!editor?.storage.collaborationCursor?.users) {
            return [];
        }

        return editor.storage.collaborationCursor?.users.map(
            (user: EditorUser) => {
                const names = user.name?.split(" ");
                const firstName = names?.[0];
                const lastName = names?.[names.length - 1];
                const initials = `${firstName?.[0] || "?"}${
                    lastName?.[0] || "?"
                }`;

                return { ...user, initials: initials.length ? initials : "?" };
            },
        );
    }, [editor?.storage.collaborationCursor?.users]);

    const characterCount = editor?.storage.characterCount || {
        characters: () => 0,
        words: () => 0,
    };

    useEffect(() => {
        provider?.on("status", (event: { status: WebSocketStatus }) => {
            setCollabState(event.status);
        });
    }, [provider]);

    window.editor = editor;

    return { editor, users, characterCount, collabState, leftSidebar };
};
