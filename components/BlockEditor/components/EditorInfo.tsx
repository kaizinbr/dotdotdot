"use client";

import { WebSocketStatus } from "@hocuspocus/provider";
import { memo, useState, useEffect } from "react";
import { EditorUser } from "../types";
import { cn } from "../../../lib/utils";
import { getConnectionText } from "../../../lib/utils/getConnectionText";
import { useDisclosure } from "@mantine/hooks";
import { Settings } from "lucide-react";
import { Modal, Button } from "@mantine/core";
import Tooltip from "../../ui/Tooltip";
import { Icon } from "../../ui/Icon";
import classes from "@/styles/EditorInfo.module.css";

import { createClient } from "@/utils/supabase/client";
import PubModal from "./Modal";

export type EditorInfoProps = {
    characters: number;
    words: number;
    collabState: WebSocketStatus;
    users: EditorUser[];
    room: string | any;
    editor?: any;
};



export const EditorInfo = memo(
    ({ characters, collabState, users, words, room, editor }: EditorInfoProps) => {
        const [opened, { open, close }] = useDisclosure(false);
        const [postData, setPostData] = useState<any[]>([]);
        const [title, setTitle] = useState<string | null>(null);
        const [image, setImage] = useState<string | null>(null);

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
                <div className="flex flex-col justify-center  mr-2 text-right ">
                    <div className="text-xs font-semibold text-neutral-300">
                        {words} {words === 1 ? "palavra" : "palavras"}
                    </div>
                    <div className="text-xs font-semibold text-neutral-300">
                        {characters}{" "}
                        {characters === 1 ? "caractere" : "caracteres"}
                    </div>
                </div>
                {/* <div className="flex items-center gap-2 mr-2">
                    <div className="flex items-center gap-1">
                        <Tooltip>
                                <Settings size={16} className="gap-1 min-w-[2rem] h-8 p-2 w-auto rounded hover:bg-woodsmoke-600 transition-all duration-150 bg-transparent" />
                        </Tooltip>
                        {/* <Icon name="Settings" /> 
                    </div>
                </div> */}
                
                <PubModal room={room} postData={postData} setPostData={setPostData} editor={editor} />
            </div>
        );
    },
);

EditorInfo.displayName = "EditorInfo";
