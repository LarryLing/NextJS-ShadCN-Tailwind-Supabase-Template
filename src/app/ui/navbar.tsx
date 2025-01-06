"use client"

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {Button } from "../components/buttons";
import { CrossIcon, MenuIcon } from "../components/icons";

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

export default function Navbar() {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent | TouchEvent) {
            if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
                mobileMenuRef.current.classList.replace("right-0", "-right-full")
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isMenuOpen])

    return (
        <header className="sticky top-0 w-full z-[9998] font-bold text-nowrap">
            <nav className="bg-background flex justify-between items-center gap-4 h-20 px-4 border-b-2 border-tertiary">
                <div className="bg-inherit flex justify-start items-center ml-4 overflow-visible">
                    <Link href="/" className="text-xl flex gap-2 items-center">
                        <img className="h-8 inline" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Logo"/>
                        <span>Website Name</span>
                    </Link>
                </div>
                <ul className="bg-inherit hidden md:flex justify-between items-center w-auto px-0">
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
                    <Link href="/" className="block md:hidden mx-4 mb-4">
                        <Button type="primary" size="sm">
                            Sign Up
                        </Button>
                    </Link>
                </ul>
                <div className="bg-inherit flex justify-end items-center gap-4 mr-4">
                    <Link href="/" className="hidden md:block">
                        <Button type="tertiary" size="sm">
                            Login
                        </Button>
                    </Link>
                    <Link href="/" className="hidden md:block">
                        <Button type="primary" size="sm">
                            Sign Up
                        </Button>
                    </Link>
                    <button onClick={ () => setIsMenuOpen(!isMenuOpen) } className="block md:hidden">
                        <MenuIcon className="size-6 text-text-color"/>
                    </button>
                </div>
            </nav>
            <div ref={ mobileMenuRef } aria-label="mobile-menu" className={ `bg-background fixed inset-y-0 ${ isMenuOpen ? "right-0" : "-right-full" } z-[9999] md:hidden border-l-2 border-tertiary w-[250px] px-8 overflow-y-auto transition-all duration-200 ease-in` }>
                <div className="flex justify-between items-center h-20">
                    <img className="h-8 inline" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Logo"/>
                    <button onClick={ () => setIsMenuOpen(!isMenuOpen) } className="block md:hidden">
                        <CrossIcon className="size-6 text-text-color"/>
                    </button>
                </div>
                <div className="divide-y divide-solid divide-tertiary">
                    <ul className="flex flex-col gap-4 py-4">
                        {
                            navbarItems.map(value => {
                                return (
                                    <Link key={ value.title } href="#"  className="py-2 pl-4 rounded-lg bg-inherit hover:bg-tertiary-lighter hover:text-indigo-700 transition-all duration-300">{ value.title }</Link>
                                )
                            })
                        }
                    </ul>
                    <div className="flex flex-col gap-4 py-4">
                        <Link href="/" className="w-fit">
                            <Button type="tertiary">
                                Login
                            </Button>
                        </Link>
                        <Link href="/" className="w-fit">
                            <Button type="primary">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
