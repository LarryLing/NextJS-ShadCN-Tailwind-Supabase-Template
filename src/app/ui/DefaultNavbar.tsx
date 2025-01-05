"use client"

import React, { useRef } from "react";
import Link from "next/link";
import { Primary, Secondary } from "../components/buttons";
import { MenuIcon } from "../components/icons";
import assert from "assert";

export default function DefaultNavbar() {
    const listRef = useRef<HTMLUListElement | null>(null);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        assert(listRef.current !== null)
        
        if (e.currentTarget.name === "open") {
            listRef.current.classList.remove("top-[76px]")
            listRef.current.classList.remove("opacity-100")
            listRef.current.classList.add("top-[-160px]")
            e.currentTarget.name = "close"
        } else if (e.currentTarget.name === "close") {
            listRef.current.classList.remove("top-[-160px]")
            listRef.current.classList.add("top-[76px]")
            listRef.current.classList.add("opacity-100")
            e.currentTarget.name = "open"
        }
    }

    return (
        <nav aria-label="Navigation" className="md:flex items-start justify-between gap-4 w-full px-4 py-4 md:py-0 text-base text-nowrap font-bold">
            <div className="flex items-center justify-between mx-4 md:my-4 min-h-11">
                <Link href="/" className="text-xl flex gap-2 items-center">
                    <img className="h-8 inline" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
                    <span>Website Name</span>
                </Link>
                <button name="close" onClick={ e => handleClick(e) } className="block md:hidden">
                    <MenuIcon className="size-6 text-black"/>
                </button>
            </div>
            <ul ref={ listRef } className="w-full md:w-auto z-[-1] md:z-auto left-0 md:flex absolute md:static items-center font-normal top-[-160px] px-4 md:px-0 opacity-0 md:opacity-100 transition-all duration-200 ease-in">
                <li className="mx-4 my-4">
                    <Link href="/" className="hover:text-indigo-700 transition-all duration-300">Item 1</Link>
                </li>
                <li className="mx-4 mb-4 md:my-4">
                    <Link href="/" className="hover:text-indigo-700 transition-all duration-300">Item 2</Link>
                </li>
                <li className="mx-4 mb-4 md:my-4">
                    <Link href="/" className="hover:text-indigo-700 transition-all duration-300">Item 3</Link>
                </li>
                <li className="mx-4 mb-4 md:my-4">
                    <Link href="/" className="hover:text-indigo-700 transition-all duration-300">Item 4</Link>
                </li>
                <li className="flex gap-4 mx-4 mb-4 md:my-4">
                    <Link href="/">
                        <Secondary width={ 20 }>
                            Login
                        </Secondary>
                    </Link>
                    <Link href="/">
                        <Primary width={ 20 }>
                            Sign Up
                        </Primary>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
