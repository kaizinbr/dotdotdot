import "iframe-resizer/js/iframeResizer.contentWindow";

import PostPage from "@/components/BlockEditor/PostPage";

export default async function Document({
    params,
}: {
    params: Promise<{ status: string }>;
}) {
    // const status = (await params).status;

    return <PostPage />;
}
