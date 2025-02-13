"use client";

import { EditorContent, PureEditorContent } from "@tiptap/react";
import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LinkMenu } from "../menus";
import Loading from "../Loading";

import { useBlockEditor } from "../../hooks/useBlockEditor";

import "@/styles/index.css";

import ImageBlockMenu from "../../extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "../../extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "../../extensions/Table/menus";
import { TiptapProps } from "./types";
import { EditorHeader } from "./components/EditorHeader";
import { TextMenu } from "../menus/TextMenu";
import { MenuBar } from "../menus/TextMenu/MenuBar";
import { ContentItemMenu } from "../menus/ContentItemMenu";
import AvatarB from "@/components/Navbar/Avatar";
import { TbUserFilled } from "react-icons/tb";

import { createClient } from "@/utils/supabase/client";

// const MenuBar = ({editor}: {editor: any}) => {
//     // const { editor } = useCurrentEditor();

//     if (!editor) {
//         return null;
//     }

//     return (
//         <div className="control-group">
//             <div
//                 className={`
//                     button-group
//                     bg-neutral-900 gap-1
//                     flex flex-wrap p-2
//                 `}
//             >
//                 <MenuBtn
//                     icon={<Bold />}
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                     isActive={editor.isActive("bold")}
//                     disabled={!editor.can().chain().focus().toggleBold().run()}
//                 />
//                 <MenuBtn
//                     icon={<Italic />}
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                     isActive={editor.isActive("italic")}
//                     disabled={!editor.can().chain().focus().toggleItalic().run()}
//                 />
//                 <MenuBtn
//                     icon={<Strikethrough />}
//                     onClick={() => editor.chain().focus().toggleStrike().run()}
//                     isActive={editor.isActive("strike")}
//                     disabled={!editor.can().chain().focus().toggleStrike().run()}
//                 />
//                 <MenuBtn
//                     icon={<Code />}
//                     onClick={() => editor.chain().focus().toggleCode().run()}
//                     isActive={editor.isActive("code")}
//                     disabled={!editor.can().chain().focus().toggleCode().run()}
//                 />
//                 {/* <button
//                     onClick={() => editor.chain().focus().unsetAllMarks().run()}
//                 >
//                     Clear marks
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().clearNodes().run()}
//                 >
//                     Clear nodes
//                 </button> */}

//                 <SelectHeading editor={editor} />

//                 <button
//                     onClick={() =>
//                         editor.chain().focus().toggleBulletList().run()
//                     }
//                     className={editor.isActive("bulletList") ? "is-active" : ""}
//                 >
//                     Bullet list
//                 </button>
//                 <button
//                     onClick={() =>
//                         editor.chain().focus().toggleOrderedList().run()
//                     }
//                     className={
//                         editor.isActive("orderedList") ? "is-active" : ""
//                     }
//                 >
//                     Ordered list
//                 </button>
//                 <button
//                     onClick={() =>
//                         editor.chain().focus().toggleCodeBlock().run()
//                     }
//                     className={editor.isActive("codeBlock") ? "is-active" : ""}
//                 >
//                     Code block
//                 </button>
//                 <button
//                     onClick={() =>
//                         editor.chain().focus().toggleBlockquote().run()
//                     }
//                     className={editor.isActive("blockquote") ? "is-active" : ""}
//                 >
//                     Blockquote
//                 </button>
//                 <button
//                     onClick={() =>
//                         editor.chain().focus().setHorizontalRule().run()
//                     }
//                 >
//                     Horizontal rule
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().setHardBreak().run()}
//                 >
//                     Hard break
//                 </button>
//                 {/* <button
//                     onClick={() => editor.chain().focus().undo().run()}
//                     disabled={!editor.can().chain().focus().undo().run()}
//                 >
//                     Undo
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().redo().run()}
//                     disabled={!editor.can().chain().focus().redo().run()}
//                 >
//                     Redo
//                 </button> */}
//                 <button
//                     onClick={() =>
//                         editor.chain().focus().setColor("#958DF1").run()
//                     }
//                     className={
//                         editor.isActive("textStyle", { color: "#958DF1" })
//                             ? "is-active"
//                             : ""
//                     }
//                 >
//                     Purple
//                 </button>
//             </div>
//         </div>
//     );
// };

export const BlockEditor = ({ avatarData }: TiptapProps) => {
    const menuContainerRef = useRef(null);
    const editorRef = useRef<PureEditorContent | null>(null);
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const { editor, characterCount } = useBlockEditor({ supabase });

    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="flex h-full " ref={menuContainerRef}>
                <div className="relative flex flex-col flex-1 h-full">
                    <EditorHeader
                        characters={characterCount.characters()}
                        words={characterCount.words()}
                        editor={editor}
                        setLoading={setLoading}
                    />

                    <div className="flex flex-row items-center gap-2 mx-4 mt-16">
                        <div className="flex relative flex-col justify-center items-center size-10 rounded-full ">
                            {avatarData!.url ? (
                                <AvatarB
                                    size={40}
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
                                Não esqueça de salvar
                            </span>
                        </div>
                    </div>
                    <MenuBar editor={editor} />

                    <EditorContent
                        editor={editor}
                        ref={editorRef as React.RefObject<HTMLDivElement>}
                        className="flex-1 overflow-y-auto mt-4 min-h-dvh"
                    />
                    <LinkMenu editor={editor} appendTo={menuContainerRef} />
                    {/* <TextMenu editor={editor} /> */}
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
            {loading && (
                <div
                    className={`
                    absolute top-0 left-0 w-full h-full 
                    bg-black bg-opacity-50 backdrop-blur-lg
                    z-[999] 
                    flex justify-center items-center
                `}
                >
                    <Loading />
                </div>
            )}
        </>
    );
};

export default BlockEditor;
