import NavigationBar from "@/components/blocks/navigation-bar/navigation-bar"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
	const supabase = await createClient()
	const userResponse = await supabase.auth.getUser()

	return (
		<div className="">
			<NavigationBar userResponse={userResponse} />
		</div>
	)
}
