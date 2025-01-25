import ResetPasswordForm from "@/app/(authentication)/login/reset-password/(ui-blocks)/reset-password-form"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import React from "react"

export default async function ResetPasswordPage() {
	const supabase = await createClient()

	const { data } = await supabase.auth.getUser()
	if (!data.user) {
		redirect("/")
	}

	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<ResetPasswordForm />
		</div>
	)
}
