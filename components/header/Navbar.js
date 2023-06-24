import React, {useState} from 'react';
import Link from "next/link";
import {navLinks} from "../../constants";
import MenuHeader from "./MenuHeader";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
    const [active, setActive] = useState("");

    return (
        <header>
            <nav className="sm:px-16 px-6 w-full flex items-center lg:py-12 top-0 z-20 xs:py-5 bg-red-300">
                <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                    <Link href="/"
                          className="flex items-center gap-2"
                          onClick={() => {
                              setActive("");
                              window.scrollTo(0, 0);
                          }}
                    >
                        <img alt="logo" className="w-12 h-12 object-contain"/>
                    </Link>
                    <ul className="list-none hidden lg:flex flex-row gap-10">
                        {navLinks.map((link) => (
                            <li
                                key={link.id}
                                className={`${active === link.title ? "text-white" : "text-gray-400"} text-[18px] font-medium cursor-pointer`}
                                onClick={() => {
                                    setActive(link.title);
                                }}
                            >
                                <a href={`#${link.id}`}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="lg:hidden flex justify-end items-center">
                        <MenuHeader />
                    </div>
                    <ProfileMenu />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
