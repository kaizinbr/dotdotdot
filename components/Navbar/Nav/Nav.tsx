import { motion } from "framer-motion";
import { links, footerLinks } from "./data";
import { perspective, slideIn } from "./anim";
import Link from "next/link";
import { Pencil } from "lucide-react";

export default function Nav({
    setIsActive,
}: {
    setIsActive: (arg: boolean) => void;
}) {
    return (
        <div
            className={`flex flex-col justify-between pt-14 px-10 pb-10 h-full`}
        >
            <div className={`flex gap-3 flex-col`}>
                {/* <motion.div
                variants={slideIn}
                initial="initial"
                animate="enter"
                exit="exit"
                custom={0}
            >
                <Link
                    href="/"
                    className={`
                                font-bold mielle-title text-3xl mb-12
                            `}
                >
                    kaizin
                </Link>
            </motion.div> */}
                {links.map((link, i) => {
                    const { title, href } = link;
                    return (
                        <motion.div
                            key={`b_${i}`}
                            custom={i + 1}
                            variants={slideIn}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                        >
                            <Link
                                href={href}
                                className="text-5xl gelica-menu"
                                onClick={() => {
                                    setIsActive(false);
                                }}
                            >
                                {title}
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
            <motion.div className={`flex flex-col gap-3`}>
                <motion.a
                    href="/compose"
                    className="text-3xl gelica-menu text-center py-2 bg-sky-700 rounded-full text-stone-200 flex flex-col items-center"
                    onClick={() => {
                        setIsActive(false);
                    }}
                    variants={slideIn}
                    custom={1}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    Criar post
                </motion.a>

                <motion.a
                    href="/compose"
                    className="text-3xl gelica-menu py-2 border-2 border-sky-700 rounded-full text-stone-800 flex flex-col items-center"
                    onClick={() => {
                        setIsActive(false);
                    }}
                    variants={slideIn}
                    custom={2}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    Criar livro
                </motion.a>
                {/* {footerLinks.map((link, i) => {
                    const { title, href } = link;
                    return (
                        <motion.a
                            variants={slideIn}
                            custom={i}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            key={`f_${i}`}
                            className="w-1/2 mt-2"
                            href={href}
                            target="_blank"
                        >
                            {title}
                        </motion.a>
                    );
                })} */}
            </motion.div>
        </div>
    );
}
