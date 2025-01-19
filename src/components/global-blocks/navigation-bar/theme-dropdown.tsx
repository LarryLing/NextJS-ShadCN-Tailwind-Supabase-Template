"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import React from "react"

export default function ThemeDropdown() {
    const { setTheme } = useTheme()

	return (
		<DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="block px-3">
                    <Sun className="inline h-[1.2rem] w-[1.2rem] dark:hidden mr-2"/>
                    <Moon className="dark:inline h-[1.2rem] w-[1.2rem] hidden mr-2"/>
                    <span>Set Theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left" align="center" sideOffset={24} className="z-[9999] p-2">
                <DropdownMenuItem onClick={ () => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={ () => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={ () => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
	)
}
