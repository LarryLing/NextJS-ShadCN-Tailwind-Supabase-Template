"use client"

import React, { useRef, useState } from "react";
import Link from "next/link";
import {Button } from "../components/buttons";
import { CrossIcon, MenuIcon } from "../components/icons";
import assert from "assert";

export default function DefaultNavbar() {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const listRef = useRef<HTMLUListElement | null>(null);

    const navbarItems = [
        {
            title: "Item 1",
            to: "/"
        },
        {
            title: "Item 2",
            to: "/"
        },
        {
            title: "Item 3",
            to: "/"
        },
        {
            title: "Item 4",
            to: "/"
        },
    ]

    function handleClick() {
        assert(listRef.current !== null)
        
        if (isMenuOpen) {
            listRef.current.classList.replace("top-[76px]", "top-[-160px]")
        } else {
            listRef.current.classList.replace("top-[-160px]", "top-[76px]")
        }

        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav aria-label="Navigation" className="sticky top-0 z-[9999] flex justify-between items-center gap-4 w-full h-20 px-4 text-base text-nowrap font-bold border-b-2 border-tertiary">
            <div className="bg-inherit z-[9998] flex-1 flex justify-start items-center ml-4 h-full">
                <Link href="/" className="text-xl flex gap-2 items-center">
                    <img className="h-8 inline" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
                    <span>Website Name</span>
                </Link>
            </div>
            <ul ref={ listRef } className="bg-inherit absolute md:static left-0 top-[-160px] md:flex justify-between items-center w-full md:w-auto px-4 md:px-0 transition-opacity-position duration-300 ease-in">
                {
                    navbarItems.map(value => {
                        return (
                            <li key={ value.title } className="mx-4 mb-4 md:mb-0">
                                <Link href={ value.to } className="hover:text-indigo-700 transition-all duration-300">{ value.title }</Link>
                            </li>
                        )
                    })
                }
                <Link href="/" className="block md:hidden mx-4 mb-4">
                    <Button type="tertiary" size="sm">
                        Login
                    </Button>
                </Link>
            </ul>
            <div className="bg-inherit z-[9998] flex-1 flex justify-end items-center gap-4 mr-4 h-full">
                <Link href="/" className="hidden md:block">
                    <Button type="tertiary" size="sm">
                        Login
                    </Button>
                </Link>
                <Link href="/">
                    <Button type="primary" size="sm">
                        Sign Up
                    </Button>
                </Link>
                <button onClick={ () => handleClick() } className="block md:hidden">
                    { isMenuOpen ? <CrossIcon className="size-6 text-black"/> : <MenuIcon className="size-6 text-black"/> }
                </button>
            </div>
        </nav>
    );
}
