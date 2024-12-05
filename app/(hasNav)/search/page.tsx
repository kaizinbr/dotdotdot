import Results from "@/components/Search/Results";
import Search from "@/components/Search/SearchBar";
import {
    InvoicesTableSkeleton,
    InvoicesMobileSkeleton,
} from "@/components/Skeletons";
import { Suspense } from "react";

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    // const supabase = createClient();

    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;


    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center  mx-auto max-w-4xl  mt-10">
            <Search placeholder="Pesquisar..." />
            <Suspense
                key={query + currentPage}
                fallback={<InvoicesMobileSkeleton />}
            >
                <Results query={query} currentPage={currentPage} />
            </Suspense>
        </div>
    );
}

// import Pagination from '@/app/ui/invoices/pagination';
// import Search from '@/app/ui/search';
// import Table from '@/app/ui/invoices/table';
// import { CreateInvoice } from '@/app/ui/invoices/buttons';
// import { lusitana } from '@/app/ui/fonts';
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// import { Suspense } from 'react';

// export default async function Page() {
//   return (
//     <div className="w-full">
//       <div className="flex w-full items-center justify-between">
//         <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
//       </div>
//       <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
//         <Search placeholder="Search invoices..." />
//         <CreateInvoice />
//       </div>
//       {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
//         <Table query={query} currentPage={currentPage} />
//       </Suspense> */}
//       <div className="mt-5 flex w-full justify-center">
//         {/* <Pagination totalPages={totalPages} /> */}
//       </div>
//     </div>
//   );
// }