"use client"

import NavigationBar from "@/components/blocks/navigation-bar/navigation-bar"
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function HomePage() {
	const { setTheme } = useTheme()

	return (
		<div className="">
			<NavigationBar />
			<Button onClick={() => setTheme("light")}>Light</Button>
			<Button onClick={() => setTheme("dark")}>Dark</Button>
			<Button onClick={() => setTheme("system")}>System</Button>
		</div>
	)
}
