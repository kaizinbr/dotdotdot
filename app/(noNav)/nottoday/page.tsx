import Link from "next/link";
export default async function Index() {

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div
                className={`
                    h-lvh w-full flex justify-center items-center
                    flex-col
                    px-10
                `}
            >
                <span className="text-center mb-6">
                    Opa! Parece que você não pode acessar essa página... <br />
                    Hm... Tudo bem, você pode continuar agora!
                </span>
                <Link
                    href="/compose"
                    className="flex flex-row items-center gap-2 w-fit bg-sandybrown-400 transition hover:bg-sandybrown-500 rounded-xl border-2 border-b-defaultB border-fantasy-950 px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                >
                    <span className="text-lg">Criar novo post</span>
                </Link>
                <Link
                    href="/"
                    className="flex flex-row items-center gap-2 w-fit bg-sandybrown-400 transition hover:bg-sandybrown-500 rounded-xl border-2 border-b-defaultB border-fantasy-950 px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                >
                    <span className="text-lg">Voltar ao ínicio</span>
                </Link>
            </div>
        </div>
    );
}
