import NavigationBar from "@/components/blocks/navigation-bar/navigation-bar"
import { createClient } from "@/lib/supabase/server"

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const supabase = await createClient()
	const { data: userData } = await supabase.auth.getUser()

	return (
		<section>
			<NavigationBar user={userData.user} />
			<div className="size-full flex justify-center items-center mt-6">
				{children}
			</div>
		</section>
	)
}
