import Image from "next/image";
// import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
// import InvoiceStatus from '@/app/ui/invoices/status';
// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import fetchResults from "@/lib/utils/fetchSearch";
import Avatar from "@/components/posts/AvatarDisplay";
import Link from "next/link";

export default async function Results({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const invoices = await fetchResults(query, currentPage);
    console.log(invoices);

    const avatar =
        "705a4782-48b8-4218-ad52-731889608187-0.6742304776462171.png";
    // const today = useToday();

    return (
        <div className="flex flex-col w-full px-4">
            <div className="flex flex-col w-full gap-3 p-6 bg-woodsmoke-700 rounded-3xl">
                <h1 className="font-bold text-2xl mb-2 ">Pessoas</h1>

                {invoices.map((invoice) => (
                    <Link href={`/profile/${invoice.username}`}
                        key={invoice.id}
                        className="flex flex-row w-full items-center bg-woodsmoke-800 rounded-3xl p-4"
                    >
                        <div className="size-12 rounded-full bg-woodsmoke-300 mr-3">
                            <Avatar
                                size={50}
                                url={invoice.avatar_url}
                                username={`Foto de perfil de ${invoice.username}`}
                                intrisicSize={"size-12"}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col">
                                <h3 className="font-bold text-base">
                                    {invoice.full_name}
                                </h3>
                                <div className="text-sm text-woodsmoke-300">
                                    @{invoice.username}
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="text-xs text-woodsmoke-300">
                                    {/* Membro desde {getPastRelativeTime(invoice.created_at, today)} */}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {invoices.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full ">
                        <h1 className="font-bold text-xl text-woodsmoke-300">
                            Nenhum resultado encontrado
                        </h1>
                    </div>
                )}

            </div>
        </div>
    );
}
