import NavigationBar from "@/components/blocks/navigation-bar/navigation-bar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const supabase = await createClient()
	const { data: userData } = await supabase.auth.getUser()

	if (!userData.user) redirect("/login")

	return <section>{children}</section>
}
