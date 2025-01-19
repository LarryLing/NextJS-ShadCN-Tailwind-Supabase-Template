"use client"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { sendEmailReset } from "@/lib/actions"
import Link from "next/link"
import React, { useActionState } from "react"

export default function ForgotPasswordForm() {
	const [state, action, pending] = useActionState(sendEmailReset, undefined)

	return (
		<Card className="w-[384px]">
			<CardHeader>
				<CardTitle className="text-2xl">Recover your account</CardTitle>
				<CardDescription>
					Enter your email to receive a password reset link
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					action={action}
					className="text-sm flex flex-col gap-6"
				>
					<div className="flex flex-col gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="text"
						/>
						{state?.errors?.email && (
							<p className="text-sm text-destructive">
								{state.errors.email}
							</p>
						)}
					</div>
					<div className="flex justify-between">
						<Link
							href="/login"
							className="mr-2"
						>
							<Button
								variant="outline"
								disabled={pending}
							>
								Return to login
							</Button>
						</Link>
						<Button
							type="submit"
							disabled={pending}
						>
							Submit
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}
