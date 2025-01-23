import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/global-blocks/theme-provider"
import { createClient } from "@/lib/supabase/server"
import NavigationBar from "@/components/global-blocks/navigation-bar/navigation-bar"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "NextJS Template",
	description: "A NextJS Template",
}

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
    const supabase = await createClient()
    const userResponse = await supabase.auth.getUser()
    const user = userResponse.data.user

	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
                >
                    <NavigationBar user={user} />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
