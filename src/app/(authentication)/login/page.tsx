import { LoginForm } from "@/app/(authentication)/login/(ui-blocks)/login-form"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function LoginPage() {
	const supabase = await createClient()

	const { data } = await supabase.auth.getUser()
	if (data.user) {
		redirect("/")
	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<LoginForm />
		</div>
	)
}
