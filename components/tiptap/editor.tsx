"use client";

import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import SelectHeading from "./heading";

// import { RiBold, RiItalic, RiStrikethrough, RiCodeBlock } from "@remixicon/react";
import { Code, Bold, Italic, Strikethrough } from "lucide-react"

const MenuBtn = ({
    icon,
    onClick,
    isActive,
    disabled,
}: {
    icon: React.ReactNode;
    onClick: () => void;
    isActive: boolean;
    disabled: boolean;
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                p-1 rounded-lg  text-neutral-100
                ${isActive ? "bg-neutral-700" : "bg-transparent"}
                transition-all duration-200
            `}
        >
            {icon}
        </button>
    );
};

const MenuBar = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    return (
        <div className="control-group">
            <div
                className={`
                    button-group
                    bg-neutral-900 gap-1
                    flex flex-wrap p-2
                `}
            >
                <MenuBtn
                    icon={<Bold />}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                />
                <MenuBtn
                    icon={<Italic />}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                />
                <MenuBtn
                    icon={<Strikethrough />}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive("strike")}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                />
                <MenuBtn
                    icon={<Code />}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    isActive={editor.isActive("code")}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                />
                {/* <button
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                >
                    Clear marks
                </button>
                <button
                    onClick={() => editor.chain().focus().clearNodes().run()}
                >
                    Clear nodes
                </button> */}


                <SelectHeading editor={editor} />

                <button
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={editor.isActive("bulletList") ? "is-active" : ""}
                >
                    Bullet list
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive("orderedList") ? "is-active" : ""
                    }
                >
                    Ordered list
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                    className={editor.isActive("codeBlock") ? "is-active" : ""}
                >
                    Code block
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    className={editor.isActive("blockquote") ? "is-active" : ""}
                >
                    Blockquote
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    Horizontal rule
                </button>
                <button
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                >
                    Hard break
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    Undo
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                >
                    Redo
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setColor("#958DF1").run()
                    }
                    className={
                        editor.isActive("textStyle", { color: "#958DF1" })
                            ? "is-active"
                            : ""
                    }
                >
                    Purple
                </button>
            </div>
        </div>
    );
};

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

const EditorComponent = () => {
    return (
        <EditorProvider
            slotBefore={<MenuBar />}
            extensions={extensions}
            content={content}
        ></EditorProvider>
    );
};

EditorComponent.displayName = "EditorComponent";

export default EditorComponent;
