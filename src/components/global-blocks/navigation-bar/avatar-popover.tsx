"use client"

import React from "react"
import { UserMetadata } from "@supabase/supabase-js"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { signout } from "@/lib/actions"
import Link from "next/link"
import UserWidget from "./user-widget"
import { useTheme } from "next-themes"
import { LogOut, Settings } from "lucide-react"
import ThemeDropdown from "./theme-dropdown"
import SettingsDialog from "./settings-dialog"

type AvatarPopoverProps = {
	userMetadata: UserMetadata,
}

export default function AvatarPopover({ userMetadata }: AvatarPopoverProps) {
    const { setTheme } = useTheme()

	return (
		<Popover>
			<PopoverTrigger>
				<Avatar>
					<AvatarImage src={userMetadata.profile_picture} />
					<AvatarFallback>
						{userMetadata.display_name
							.substring(0, 2)
							.toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent className="z-[9998] hidden md:block mt-1 mr-2 p-0">
                <UserWidget userMetadata={userMetadata} className="px-6 py-4"/>
				<div className="px-3 pb-4">
                    <ThemeDropdown />
                    <SettingsDialog />
                </div>
                <div className="px-2 pb-4">
                    <Separator className="w-full" />
                </div>
				<div className="px-3 pb-4">
                    <Button
                        variant="ghost"
                        onClick={signout}
                        className="flex items-center px-3"
                    >
                        <LogOut className="inline h-[1.2rem] w-[1.2rem]"/>
                        <span>Sign Out</span>
                    </Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
