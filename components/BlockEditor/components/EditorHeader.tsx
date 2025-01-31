import { EditorInfo } from "./EditorInfo";
import { EditorUser } from "../types";
import { WebSocketStatus } from "@hocuspocus/provider";
import { Toolbar } from "../../ui/Toolbar";
import Icon from "@/components/core/Icon";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export type EditorHeaderProps = {
    characters: number;
    words: number;
    room: string | any;
    editor?: any;
    setLoading: any;
};

export const EditorHeader = ({
    characters,
    words,
    room,
    editor,
    setLoading,
}: EditorHeaderProps) => {
    const router = useRouter();
    return (
        <div className={`
            h-[64px] fixed left-0 right-0 top-0 z-[500] flex flex-row items-center justify-between flex-none py-2 pl-6 pr-4  
            backdrop-blur-xl border-b
            bg-woodsmoke-900/70 border-woodsmoke-900/70 
        `}>
            <div className="flex flex-row gap-x-1.5 items-center">
                <Toolbar.Button
                    tooltip={"Voltar"}
                    onClick={() => router.back()}
                    className={"px-0 text-woodsmoke-200"}
                >
                    <Icon type="left" className="w-4" />
                </Toolbar.Button>
            </div>
            <EditorInfo
                characters={characters}
                words={words}
                room={room}
                editor={editor}
                setLoading={setLoading}
            />
        </div>
    );
};
