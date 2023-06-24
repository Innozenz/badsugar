import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {motion, stagger, useAnimate} from "framer-motion";
import Image from "next/image";
import {close, menu} from "../../assets";
import {profileLinks} from "../../constants";

const staggerMenuItems = stagger(0.1, {startDelay: 0.15});

function useMenuAnimation(isOpen) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(".arrow", {rotate: isOpen ? 180 : 0}, {duration: 0.2});

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
                ? {opacity: 1, scale: 1, filter: "blur(0px)"}
                : {opacity: 0, scale: 0.3, filter: "blur(20px)"},
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0
            }
        );
    }, [isOpen]);

    return scope;
}

const ProfileMenu = () => {
    const {data: session, status} = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);

    const logoutClickHandler = () => {
        signOut({callbackUrl: '/user/login'});
    };

    return (
        <div className="z-20">
            {status === "loading" ? ("Loading") :
                // @ts-ignore
                session?.user?.isAdmin ?
                    (
                        <div ref={scope}>
                            <motion.button
                                whileTap={{scale: 0.97}}
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <div className="arrow" style={{transformOrigin: "50% 55%"}}>
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
                                {profileLinks.map((link) => (
                                    <li key={link.id}
                                        className={`${active === link.title ? "text-white" : "text-gray-400"} text-[16px] font-medium cursor-pointer mt-2`}
                                        onClick={() => {
                                            setActive(link.title);
                                            setToggle(!toggle);
                                            if (link.handler) {
                                            link.handler(); // Appeler la fonction si elle est définie
                                        }
                                        }}>
                                        <Link href={`${link.id}`}>{link.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : session?.user ?
                        (
                            <div ref={scope}>
                                <motion.button
                                    whileTap={{scale: 0.97}}
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <div className="arrow" style={{transformOrigin: "50% 55%"}}>
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
                                    <li
                                        className={"text-gray-400 hover:text-white text-[16px] font-medium cursor-pointer mt-2"}
                                        onClick={() => {
                                            setToggle(!toggle);
                                            logoutClickHandler();
                                        }}>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        ) :
                        (
                            <Link href="/user/login" className="text-gray-800 md:text-base xs:text-sm">Login</Link>
                        )}
            <div ref={scope} className="hidden">
                <motion.button>
                    <div className="arrow"></div>
                </motion.button>
                <ul>
                    <li></li>
                </ul>
            </div>
        </div>
    );
};

ProfileMenu.auth = {adminOnly: true};
export default ProfileMenu;
