
export function debounce(callback: Function, delay: number) {
    let timeoutId: any;
    // console.log(timeoutId);

    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(callback, delay);
        // console.log(timeoutId);
    };
}

const updatePost = async (editor: any, room: any, supabase: any, isPublic: boolean) => {
    const content = editor.getJSON();
    const raw = editor.getText({ blockSeparator: '\n\n' })
    const extractImageFromEditor =
        content.content.find((item: any) => item.type === "imageBlock") || null;

    const image = extractImageFromEditor ? extractImageFromEditor.attrs.src : null;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const exists = await supabase.from("posts").select("*").eq("room", room);

    const userProfile = await supabase.from("profiles").select("*").eq("id", user.id);

    if (exists.data?.length === 0) {
        const { data, error } = await supabase.from("posts").insert([
            {
                room,
                content,
                author_id: user.id,
                username: userProfile.data[0].username,
                raw,
                public: isPublic,   
            },
        ]);

        if (error) {
            console.log("Error inserting post: ", error);
            throw error;
        }

        console.log("Inserted post!");
    } else {
        console.log("Updating post");
        const { data, error } = await supabase
            .from("posts")
            .update({
                content,
                updated_at: new Date(),
                image, 
                username: userProfile.data[0].username,
                raw,
                isPublic,
            })
            .eq("room", room);

        if (error) {
            console.log("Error updating post: ", error);
            throw error;
        }
        console.log("Updated post!");
    }
};

const debouncedUpdatePost = debounce(updatePost, 1000);


export default async function updateOnDB(editor: any, room: any, supabase: any, isPublic: boolean) {
    try {
        if (editor) {
            const debounced = debounce(
                () => updatePost(editor, room, supabase, isPublic),
                500,
            );
            debounced();
        }
    } catch (error) {
        console.log("Error updating DB: ", error);
    }

    if (!editor) {
        return null;
    }

    console.log(editor.getJSON());
    return null;
}
