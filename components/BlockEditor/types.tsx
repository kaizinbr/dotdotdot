export interface TiptapProps {
    hasCollab: boolean;
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
