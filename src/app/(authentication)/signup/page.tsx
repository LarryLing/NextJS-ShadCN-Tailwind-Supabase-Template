import { SignupForm } from "@/app/(authentication)/signup/(ui-blocks)/signup-form"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import React from "react"

export default async function SignupPage() {
	const supabase = await createClient()

	const { data } = await supabase.auth.getUser()
	if (data.user) {
		redirect("/")
	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<SignupForm />
		</div>
	)
}
