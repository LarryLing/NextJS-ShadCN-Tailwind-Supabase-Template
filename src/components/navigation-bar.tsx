"use client"

import React, { useState } from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button'
import { Bell, MenuIcon, PlusIcon, XIcon } from 'lucide-react'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { signout } from '@/lib/actions'

const NavbarItems = [
    {
        name: "Item 1",
        href: "#",
    },
    {
        name: "Item 2",
        href: "#",
    },
    {
        name: "Item 3",
        href: "#",
    },
    {
        name: "Item 4",
        href: "#",
    }
]

const SidebarUserItems = [
    {
        name: "Dashboard",
        href: "#",
        onClick: () => {},
    },
    {
        name: "Settings",
        href: "#",
        onClick: () => {},
    },
    {
        name: "Sign Out",
        href: "#",
        onClick: signout,
    }
]

export default function NavigationBar() {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    return (
        <NavigationMenu className="z-[9997] sticky text-nowrap max-w-none w-full">
            <div className="z-[9998] w-full h-[80px] pl-6 pr-4 md:pr-6 flex justify-between items-center border-b-[1px] border-border">
                <div className="flex justify-start items-center">
                    <Link href="/" className="flex item-center font-bold text-2xl gap-2">
                        <div className="flex shrink-0 items-center">
                            <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=black" alt="Your Company"/>
                        </div>
                        <span className="hidden lg:inline">Website Name</span>
                    </Link>
                    <NavigationMenuList className="md:flex hidden ml-4 gap-4">
                        {
                            NavbarItems.map(item => {
                                return (
                                    <NavigationMenuItem key={ item.name }>
                                        <Link href={ item.href } legacyBehavior passHref>
                                            <NavigationMenuLink className={ navigationMenuTriggerStyle() }>
                                                { item.name }
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                )
                            })
                        }
                    </NavigationMenuList>
                </div>
                {/* 
                    Display below if user has not logged in
                */}
                {/* <div className="flex justify-center items-center gap-4">
                    <Link href="/login">
                        <Button variant="link">
                            Login
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="default">
                            Sign Up
                        </Button>
                    </Link>
                </div> */}
                {/* 
                    Display below if user has logged in
                */}
                <div className="flex justify-center items-center gap-3 md:gap-4">
                    <Link href="#">
                        <Button variant="default" className="font-bold">
                            <PlusIcon />Action Button
                        </Button>
                    </Link>
                    <div className="hidden md:flex justify-center items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Bell />
                        </Button>
                        <Link href="/profile">
                            <Avatar>
                                <AvatarImage src="https://avatars.githubusercontent.com/u/111298312?v=4&size=64"/>
                                <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>
                        </Link>
                    </div>
                    <Button variant="ghost" size="icon" onClick={ () => setIsMenuOpen(true) } className="md:hidden">
                        <MenuIcon />
                    </Button>
                </div>
            </div>
            <div className={ `md:hidden z-[9999] fixed ${ isMenuOpen ? "right-0" : "-right-full" } top-0 w-[350px] h-full bg-background overflow-y-auto border-l-[1px] border-border transition-all duration-200` }>
                <div className="flex justify-between items-center h-[80px] w-full pl-6 pr-4 py-4">
                    <div className="flex shrink-0 items-center">
                        <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=black" alt="Your Company"/>
                    </div>
                    <Button variant="ghost" size="icon" onClick={ () => setIsMenuOpen(false) }>
                        <XIcon />
                    </Button>
                </div>
                <NavigationMenuList className="flex-col justify-center items-start gap-4 w-full px-3 pb-4">
                    {
                        NavbarItems.map(item => {
                            return (
                                <NavigationMenuItem key={ item.name }>
                                    <Link href={ item.href } legacyBehavior passHref>
                                        <NavigationMenuLink className={ navigationMenuTriggerStyle() }>
                                            { item.name }
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            )
                        })
                    }
                </NavigationMenuList>
                <Separator className="w-full"/>
                <div className="flex justify-between items-center pl-6 pr-4 py-4">
                    <div className="flex items-center">
                        <Avatar>
                            <AvatarImage src="https://avatars.githubusercontent.com/u/111298312?v=4&size=64"/>
                            <AvatarFallback>Avatar</AvatarFallback>
                        </Avatar>
                        <div className="ml-2">
                            <p className="font-bold">First Name</p>
                            <p className="text-sm">email@email.com</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Bell />
                    </Button>
                </div>
                <NavigationMenuList className="flex-col justify-center items-start gap-4 w-full px-3 pb-4">
                    {
                        SidebarUserItems.map(item => {
                            return (
                                <NavigationMenuItem key={ item.name }>
                                    <NavigationMenuLink onClick={ item.onClick } className={ `${ navigationMenuTriggerStyle() } font-normal` }>
                                        { item.name }
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )
                        })
                    }
                </NavigationMenuList>
            </div>
        </NavigationMenu>
    )
}
