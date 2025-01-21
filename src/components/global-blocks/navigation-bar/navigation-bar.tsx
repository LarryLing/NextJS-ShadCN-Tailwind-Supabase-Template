"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "../../ui/navigation-menu"
import { Button } from "../../ui/button"
import { LogIn, MenuIcon, PlusIcon, Settings, XIcon } from "lucide-react"
import { Separator } from "../../ui/separator"
import { signout } from "@/lib/actions"
import { UserResponse } from "@supabase/supabase-js"
import AvatarPopover from "./avatar-popover"
import ThemeDropdown from "./theme-dropdown"
import UserWidget from "./user-widget"
import SettingsDialog from "../settings-dialog/settings-dialog"
import { useProfile } from "@/hooks/use-profile"

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
	},
]

const UserSidebarItems = [
	{
		name: "Settings",
		href: "/settings",
	},
	{
		name: "Notifications",
		href: "/notifications",
	},
]

type NavigationBarProps = {
	userResponse: UserResponse
}

export default function NavigationBar({ userResponse }: NavigationBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
    const [isAvatarPopoverOpen, setIsAvatarPopoverOpen] = useState(false)
    const { userProfile } = useProfile(userResponse.data.user)

    function openSettingsDialog() {
        if (isMenuOpen) setIsMenuOpen(false)
        if (isAvatarPopoverOpen) setIsAvatarPopoverOpen(false)
        setIsSettingsDialogOpen(true)
    }

	return (
		<NavigationMenu className="z-[9998] sticky text-nowrap max-w-none w-full">
			<div className="z-[9000] w-full h-[80px] pl-6 pr-4 md:pr-6 flex justify-between items-center border-b-[1px] border-border">
				<div className="flex justify-start items-center">
					<Link
						href="/"
						className="flex item-center font-bold text-2xl gap-2"
					>
						<div className="flex shrink-0 items-center">
							<img
								className="h-8 w-auto"
								src="https://tailwindui.com/plus/img/logos/mark.svg?color=black"
								alt="Your Company"
							/>
						</div>
						<span className="hidden lg:inline">Website Name</span>
					</Link>
					<NavigationMenuList className="md:flex hidden ml-4 gap-4">
						{NavbarItems.map((item) => {
							return (
								<NavigationMenuItem key={item.name}>
									<Link
										href={item.href}
										legacyBehavior
										passHref
									>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											{item.name}
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							)
						})}
					</NavigationMenuList>
				</div>
				<div className="flex justify-center items-center gap-4">
					{userProfile ? (
						<>
							<Link href="#">
								<Button
									variant="default"
									className="font-bold"
								>
									<PlusIcon />
									Action Button
								</Button>
							</Link>
							<div className="hidden md:flex justify-center items-center gap-4">
								<AvatarPopover
                                    userProfile={userProfile}
                                    openSettingsDialog={openSettingsDialog}
								/>
							</div>
						</>
					) : (
						<>
							<Link href="/login">
								<Button variant="link">Login</Button>
							</Link>
							<Link href="/signup">
								<Button variant="default">Sign Up</Button>
							</Link>
						</>
					)}
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsMenuOpen(true)}
						className="md:hidden"
					>
						<MenuIcon />
					</Button>
				</div>
			</div>
			<div
				className={`md:hidden z-[9999] fixed ${isMenuOpen ? "right-0" : "-right-full"} top-0 w-[320px] h-full bg-background overflow-y-auto border-l-[1px] border-border transition-all duration-200`}
			>
				<div className="flex justify-between items-center h-[80px] w-full pl-6 pr-4 py-4">
					<div className="flex shrink-0 items-center">
						<img
							className="h-8 w-auto"
							src="https://tailwindui.com/plus/img/logos/mark.svg?color=black"
							alt="Your Company"
						/>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsMenuOpen(false)}
					>
						<XIcon />
					</Button>
				</div>
				<NavigationMenuList className="flex-col justify-center items-start gap-2 w-full px-3 pb-4">
					{NavbarItems.map((item) => {
						return (
							<NavigationMenuItem key={item.name}>
								<Link
									href={item.href}
									legacyBehavior
									passHref
								>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{item.name}
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						)
					})}
				</NavigationMenuList>
				{userProfile && (
					<>
						<div className="px-2 pb-4">
							<Separator className="w-full" />
						</div>
                        <UserWidget picture={userProfile.picture} display_name={userProfile.display_name} email={userProfile.email} className="px-6 pb-4"/>
                        <div className="space-y-2 px-3 pb-4">
                            <ThemeDropdown />
                            <Button
                                variant="ghost"
                                className="block px-3"
                                onClick={() => openSettingsDialog()}
                            >
                                <Settings className="inline h-[1.2rem] w-[1.2rem] mr-2"/>
                                <span>Settings</span>
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={signout}
                                className="block px-3"
                            >
                                <LogIn className="inline h-[1.2rem] w-[1.2rem] mr-2"/>
                                <span>Sign Out</span>
                            </Button>
                        </div>
					</>
				)}
            </div>
            {userProfile && <SettingsDialog userProfile={userProfile} isSettingsDialogOpen={isSettingsDialogOpen} setIsSettingsDialogOpen={setIsSettingsDialogOpen} />}
		</NavigationMenu>
	)
}
