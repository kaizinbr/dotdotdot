export interface TiptapProps {
    avatarData?: { url: string; username: string, full_name: string };
}

export type EditorUser = {
    clientId: string;
    name: string;
    color: string;
    initials?: string;
};
