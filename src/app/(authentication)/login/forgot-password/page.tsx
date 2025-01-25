import ForgotPasswordForm from "@/app/(authentication)/login/forgot-password/(ui-blocks)/forgot-password-form"
import React from "react"

export default async function ForgotPasswordPage() {
	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<ForgotPasswordForm />
		</div>
	)
}
