"use client";

import { memo, useState, useEffect } from "react";

import { createClient } from "@/utils/supabase/client";
import PubModal from "./Modal";

export type EditorInfoProps = {
    characters: number;
    words: number;
    room: string | any;
    editor?: any;
    setLoading: any;
};



export const EditorInfo = memo(
    ({ characters, words, room, editor, setLoading }: EditorInfoProps) => {
        const [postData, setPostData] = useState<any[]>([]);

        const supabase = createClient();

        useEffect(() => {
            const fetchPublic = async () => {
                const { data, error } = await supabase
                    .from("posts")
                    .select()
                    .eq("room", room)
                    .single();

                if (error) {
                    console.log("Error fetching post: ", error);
                    throw error;
                }

                if (data && data.length > 0) {
                    setPostData(data);
                }
            };

            fetchPublic();
        }, [room, supabase]);

    
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
                
                <PubModal room={room} postData={postData} setPostData={setPostData} editor={editor} setLoading={setLoading} />
            </div>
        );
    },
);

EditorInfo.displayName = "EditorInfo";
