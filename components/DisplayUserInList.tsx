import Avatar from "@/components/posts/AvatarDisplay";
import Link from "next/link";

export default function DisplayUserInList({
    data,
    className,
}: {
    data: any;
    className?: string;
}) {
    // console.log(data);
    return (
        <Link
            href={`/profile/${data.username}`}
            className={`flex flex-row w-full items-center bg-woodsmoke-800 rounded-3xl p-4 ${className}`}
        >
            <div className="size-12 rounded-full bg-woodsmoke-300 mr-3">
                <Avatar
                    size={50}
                    url={data.avatar_url}
                    username={`Foto de perfil de ${data.username}`}
                    intrisicSize={"size-12"}
                />
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h3 className="font-bold text-base">{data.full_name}</h3>
                    <div className="text-sm text-woodsmoke-300">
                        @{data.username}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="text-xs text-woodsmoke-300">
                        {/* Membro desde {getPastRelativeTime(data.created_at, today)} */}
                    </div>
                </div>
            </div>
        </Link>
    );
}
