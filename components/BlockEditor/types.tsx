import { TiptapCollabProvider } from "@hocuspocus/provider";
import type { Doc as YDoc } from "yjs";

export interface TiptapProps {
    hasCollab: boolean;
    ydoc: YDoc;
    provider?: TiptapCollabProvider | null | undefined;
    room?: string;
    initialContent?: any;
    authorId?: string;
    loggedId?: string;
    avatarData?: { url: string; username: string, full_name: string };
}

export type EditorUser = {
    clientId: string;
    name: string;
    color: string;
    initials?: string;
};
