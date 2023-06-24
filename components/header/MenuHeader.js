import React, { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import {close, menu} from "../../assets";
import Image from "next/image";
import {navLinks} from "../../constants";
import Link from "next/link";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

        animate(
            "ul",
            {
                clipPath: isOpen
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)"
            },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5
            }
        );

        animate(
            "li",
            isOpen
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0
            }
        );
    }, [isOpen]);

    return scope;
}

export default function MenuHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);


    return (
        <div ref={scope}>
            <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                    <Image src={isOpen ? close : menu} alt="menu"
                           height={25} width={28}
                           className="w-[28px] h-[25px] object-contain cursor-pointer"
                    />
                </div>
            </motion.button>
            <ul
                style={{
                    pointerEvents: isOpen ? "auto" : "none",
                    clipPath: "inset(10% 50% 90% 50% round 10px)"
                }}
                className={`${!isOpen ? "hidden" : "flex"} p-6 bg-gray-dark absolute top-20 flex-col right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
            >
                {navLinks.map((link) => (
                    <li key={link.id}
                        className={`${active === link.title ? "text-white" : "text-gray-400"} text-[16px] font-medium cursor-pointer mt-2`}
                        onClick={() => {
                            setActive(link.title);
                            setToggle(!toggle);
                        }}>
                        <Link href={`#${link.id}`}>{link.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
