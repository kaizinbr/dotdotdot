"use client";

import { EditorContent, PureEditorContent } from "@tiptap/react";
import React, { useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LinkMenu } from "../menus";

import { useBlockEditor } from "../../hooks/useBlockEditor";

import "@/styles/index.css";

import { Sidebar } from "../Sidebar";
import { EditorContext } from "../../context/EditorContext";
import ImageBlockMenu from "../../extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "../../extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "../../extensions/Table/menus";
import { TiptapProps } from "./types";
import { EditorHeader } from "./components/EditorHeader";
import { TextMenu } from "../menus/TextMenu";
import { ContentItemMenu } from "../menus/ContentItemMenu";
import AvatarB from "@/components/Navbar/Avatar";
import { TbUserFilled } from "react-icons/tb";

import { createClient } from "@/utils/supabase/client";

export const BlockEditor = ({
    ydoc,
    provider,
    room,
    initialContent,
    authorId,
    loggedId,
    avatarData,
}: TiptapProps) => {
    const menuContainerRef = useRef(null);
    const editorRef = useRef<PureEditorContent | null>(null);
    const supabase = createClient();
    const router = useRouter();

    if (authorId !== loggedId) {
        console.log("You are not the author of this document");
        router.push("/nottoday");
    }

    const { editor, users, characterCount, collabState, leftSidebar } =
        useBlockEditor({ ydoc, provider, room, supabase, initialContent });

    const displayedUsers = users.slice(0, 3);
    console.log(avatarData);

    const providerValue = useMemo(() => {
        return {};
    }, []);

    if (!editor) {
        return null;
    }

    return (
        <EditorContext.Provider value={providerValue}>
            <div className="flex h-full " ref={menuContainerRef}>
                <Sidebar
                    isOpen={leftSidebar.isOpen}
                    onClose={leftSidebar.close}
                    editor={editor}
                />
                <div className="relative flex flex-col flex-1 h-full overflow-hidden">
                    <EditorHeader
                        characters={characterCount.characters()}
                        collabState={collabState}
                        users={displayedUsers}
                        words={characterCount.words()}
                        isSidebarOpen={leftSidebar.isOpen}
                        toggleSidebar={leftSidebar.toggle}
                        room={room}
                        editor={editor}
                    />

                    <div className="flex flex-row items-center gap-2 mx-4 mt-24">
                        <div className="flex relative flex-col justify-center items-center h-10 w-10 rounded-full ">
                            {avatarData!.url ? (
                                <AvatarB
                                    size={42}
                                    url={avatarData!.url}
                                    className="size-10"
                                />
                            ) : (
                                <TbUserFilled className="size-10" />
                            )}
                        </div>
                        <div className="flex items-start justify-center flex-col ">
                            <h2 className="text-sm">
                                <span className="text-white font-bold">
                                    {avatarData!.full_name}
                                </span>{" "}
                                <span className="text-xs">
                                    @{avatarData!.username}
                                </span>
                            </h2>
                            <span className=" text-xs text-stone-500 dark:text-stone-400">
                                {/* <PastRelativeTime
                                    date={new Date(post.updated_at)}
                                /> */} Salvo automaticamente
                            </span>
                        </div>
                    </div>
                    <EditorContent
                        editor={editor}
                        ref={editorRef as React.RefObject<HTMLDivElement>}
                        className="flex-1 overflow-y-auto mt-4 min-h-dvh"
                    />
                    {/* <ContentItemMenu editor={editor} /> */}
                    <LinkMenu editor={editor} appendTo={menuContainerRef} />
                    <TextMenu editor={editor} />
                    <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
                    <TableRowMenu editor={editor} appendTo={menuContainerRef} />
                    <TableColumnMenu
                        editor={editor}
                        appendTo={menuContainerRef}
                    />
                    <ImageBlockMenu
                        editor={editor}
                        appendTo={menuContainerRef}
                    />
                </div>
            </div>
        </EditorContext.Provider>
    );
};

export default BlockEditor;
