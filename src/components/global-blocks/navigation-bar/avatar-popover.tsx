"use client"

import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { signout } from "@/lib/actions"
import UserWidget from "./user-widget"
import { LogOut, Settings } from "lucide-react"
import ThemeDropdown from "./theme-dropdown"
import { UserProfile } from "@/lib/types"

type AvatarPopoverProps = {
    userProfile: UserProfile,
    openSettingsDialog: () => void;
}

export default function AvatarPopover({ userProfile, openSettingsDialog }: AvatarPopoverProps) {
    return (
		<Popover>
			<PopoverTrigger>
				<Avatar>
					<AvatarImage src={userProfile?.picture} />
					<AvatarFallback>
						{userProfile?.display_name
							.substring(0, 2)
							.toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent className="z-[9999] hidden md:block mt-1 mr-2 p-0" hideWhenDetached>
                <UserWidget picture={userProfile.picture} display_name={userProfile.display_name} email={userProfile.email} className="px-6 py-4"/>
				<div className="px-3 pb-4 space-y-2">
                    <ThemeDropdown />
                    <Button
                        variant="ghost"
                        className="block px-3"
                        onClick={() => openSettingsDialog()}
                    >
                        <Settings className="inline h-[1.2rem] w-[1.2rem] mr-2"/>
                        <span>Settings</span>
                    </Button>
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
