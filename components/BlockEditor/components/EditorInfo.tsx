"use client";

import { memo, useState, useEffect } from "react";

import { createClient } from "@/utils/supabase/client";
import Publish from "./Modal";

export type EditorInfoProps = {
    characters: number;
    words: number;
    editor?: any;
    setLoading: any;
};

export const EditorInfo = memo(
    ({ characters, words, editor, setLoading }: EditorInfoProps) => {
        const [postData, setPostData] = useState<any[]>([]);
        

        return (
            <div className="flex items-center">
                <div className="flex flex-col justify-center  mr-2 text-right text-xs font-semibold text-neutral-300">
                    <div className="">
                        {words} {words === 1 ? "palavra" : "palavras"}
                    </div>
                    <div className="">
                        {characters}{" "}
                        {characters === 1 ? "caractere" : "caracteres"}
                    </div>
                </div>

                <Publish
                    postData={postData}
                    setPostData={setPostData}
                    editor={editor}
                    setLoading={setLoading}
                />
            </div>
        );
    },
);

EditorInfo.displayName = "EditorInfo";
