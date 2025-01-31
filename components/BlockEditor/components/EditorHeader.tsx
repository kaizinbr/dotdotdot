import { EditorInfo } from "./EditorInfo";
import { Toolbar } from "../../ui/Toolbar";
import Icon from "@/components/core/Icon";
import { useRouter } from "next/navigation";

export type EditorHeaderProps = {
    characters: number;
    words: number;
    editor?: any;
    setLoading: any;
};

export const EditorHeader = ({
    characters,
    words,
    editor,
    setLoading,
}: EditorHeaderProps) => {
    const router = useRouter();
    return (
        <div className={`
            h-[64px] fixed left-0 right-0 top-0 z-[199] flex flex-row items-center justify-between flex-none py-2 pl-6 pr-4  
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
                editor={editor}
                setLoading={setLoading}
            />
        </div>
    );
};
