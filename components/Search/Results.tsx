"use client";
import fetchResults from "@/lib/utils/fetchSearch";
import DisplayUserInList from "@/components/DisplayUserInList";
import { useState, useEffect } from "react";
import CardsContainer from "../posts/cardsContainer";

export default function Results({
    query,
    currentPage,
    type,
}: {
    query: string;
    currentPage: number;
    type: string;
}) {
    const [invoices, setInvoices] = useState<any>([]);

    useEffect(() => {
        // if (!query) {
        //     setInvoices([]);
        //     return;
        // }
        // // if (type == undefined) {
        //     fetchResults(query, currentPage).then((data) => {
        //         setInvoices(data);
        //     });
        //     return;
        // }
        fetchResults(query, currentPage, type).then((data) => {
            setInvoices(data);
        });
    }, [query, currentPage, type]);

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-3">

                {type === "users" && (
                    invoices.map((invoice: any) => (
                        <DisplayUserInList data={invoice} key={invoice.id} />
                    ))
                ) }

                {type === "posts" && (
                        <CardsContainer
                            posts={invoices}
                            postslength={invoices.length}
                        />
                ) }

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
