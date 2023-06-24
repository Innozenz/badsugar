import React, {useEffect} from 'react';
import {useSession, signIn} from "next-auth/react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import Layout from "../../components/Layout";
import Link from "next/link";
import {getError} from "../../utils/error";
import {useRouter} from "next/router";


const Login = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const {redirect} = router.query;

    useEffect(() => {
        if (session?.user) {
            router.push(redirect || "/");
        }
    }, [router, session, redirect]);

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();

    const submitHandler = async ({email, password}) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password
            });
            if (result.error) {
                toast.error(result.error);
            }
        } catch (err) {
            toast.error(getError(err));
        }
    }

    return (
        <div className="dark:bg-corp-dark">
            <Layout title="Login">
                <form className="flex flex-col min-h-screen justify-center mx-auto max-w-screen-sm"
                      onSubmit={handleSubmit(submitHandler)}>
                    <div className="card dark:bg-gray-900">
                        <h1 className="mb-8 text-xl dark:text-white">Connexion</h1>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                   htmlFor="email">Email</label>
                            <input type="email"
                                   {...register("email", {
                                       required: "Please enter email", pattern: {
                                           value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                           message: "Please enter valid email",
                                       }
                                   })}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   id="email" autoFocus placeholder="email@email.com"/>
                            {errors.email && (<div className="text-red-500">{errors.email.message}</div>)}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Mot de
                                passe</label>
                            <input type="password"
                                   {...register("password", {
                                       required: "Please enter password",
                                       minLength: {value: 6, message: "Password is more than 5 chars"}
                                   })}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   id="password" autoFocus placeholder="******"/>
                            {errors.password && (
                                <div className="text-red-500">{errors.password.message}</div>
                            )}
                        </div>
                        <div className="mb-4">
                            <button
                                className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center rounded">Login
                            </button>
                        </div>
                        <div className="mb-4 dark:text-white">
                            Pas de compte?
                            <Link className="hover:underline dark:text-white"
                                  href={`/register?redirect='/'`}> S&apos;enregistrer</Link>
                        </div>
                    </div>
                </form>
            </Layout>
        </div>
    );
};

export default Login;
