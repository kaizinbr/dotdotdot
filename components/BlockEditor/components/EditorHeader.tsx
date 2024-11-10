import { Icon } from "../../ui/Icon";
import { EditorInfo } from "./EditorInfo";
import { EditorUser } from "../types";
import { WebSocketStatus } from "@hocuspocus/provider";
import { Toolbar } from "../../ui/Toolbar";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export type EditorHeaderProps = {
    isSidebarOpen?: boolean;
    toggleSidebar?: () => void;
    characters: number;
    words: number;
    collabState: WebSocketStatus;
    users: EditorUser[];
    room: string | any;
    editor?: any;
};

export const EditorHeader = ({
    characters,
    collabState,
    users,
    words,
    isSidebarOpen,
    toggleSidebar,
    room,
    editor,
}: EditorHeaderProps) => {
    const router = useRouter();
    return (
        <div className="h-[72px] fixed left-0 right-0 top-0 z-[1000] flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3  bg-woodsmoke-600/90 backdrop-blur-xl border-b border-woodsmoke-700/90  ">
            <div className="flex flex-row gap-x-1.5 items-center">
                <Toolbar.Button
                    tooltip={"Voltar"}
                    onClick={() => router.back()}
                    className={"px-0 text-woodsmoke-200"}
                >
                    <ChevronLeft size={24}  />
                </Toolbar.Button>
                <div className="flex items-center gap-x-1.5  text-woodsmoke-200">
                    <Toolbar.Button
                        tooltip={
                            isSidebarOpen ? "Close sidebar" : "Open sidebar"
                        }
                        onClick={toggleSidebar}
                        active={isSidebarOpen}
                        className={isSidebarOpen ? "bg-transparent" : ""}
                    >
                        <Icon
                            name={
                                isSidebarOpen ? "PanelLeftClose" : "PanelLeft"
                            }
                        />
                    </Toolbar.Button>
                </div>
            </div>
            <EditorInfo
                characters={characters}
                words={words}
                collabState={collabState}
                users={users}
                room={room}
                editor={editor}
            />
        </div>
    );
};
