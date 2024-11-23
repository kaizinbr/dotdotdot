import fetchResults from "@/lib/utils/fetchSearch";
import DisplayUserInList from "@/components/DisplayUserInList";

export default async function Results({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const invoices = await fetchResults(query, currentPage);
    console.log(invoices);


    return (
        <div className="flex flex-col w-full px-4">
            <div className="flex flex-col w-full gap-3 p-6 bg-woodsmoke-700 rounded-3xl">
                <h1 className="font-bold text-2xl mb-2 ">Pessoas</h1>

                {invoices.map((invoice) => (
                    <DisplayUserInList data={invoice} key={invoice.id} />
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
