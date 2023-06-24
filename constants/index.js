import {signOut} from "next-auth/react";

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "contact",
        title: "Contact",
    }
];

export const logoutClickHandler = () => {
    signOut({callbackUrl: '/'});
};

export const profileLinks = [
    {
        id: "admin/dashboard",
        title: "Dashboard",
    },
    {
        id: "/user/login",
        title: "Logout",
        handler: logoutClickHandler
    },
];

