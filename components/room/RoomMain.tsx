'use client'

import 'iframe-resizer/js/iframeResizer.contentWindow'

import { BlockEditor } from '@/components/BlockDisplay'
import { useEditor, EditorContent } from '@tiptap/react'
import ExtensionKit from '@/extensions/extension-kit-display'


export default function RoomMain({json}: { json: string}  ) {
    const editor = useEditor({
        extensions: [
            ...ExtensionKit(),
        ],
        content: json,
        editable: false,
    })


    return (
        <div className='displaying px-5'>
            <BlockEditor json={json} />
        </div>
    )
}
