"use client"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPassword } from "@/lib/actions"
import { useActionState } from "react"

export default function ResetPasswordForm() {
	const [state, action, pending] = useActionState(resetPassword, undefined)

	return (
		<Card className="w-[384px]">
			<CardHeader>
				<CardTitle className="text-2xl">Reset Password</CardTitle>
				<CardDescription>Enter your new password</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					action={action}
					className="text-sm flex flex-col gap-6"
				>
					<div className="flex flex-col gap-2">
						<Label htmlFor="password">New Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
						/>
						{state?.errors?.password && (
							<p className="text-sm text-destructive">
								{state.errors.password}
							</p>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="confirmPassword">
							Confirm New Password
						</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
						/>
						{state?.errors?.confirmPassword && (
							<p className="text-sm text-destructive">
								{state.errors.confirmPassword}
							</p>
						)}
					</div>
					<Button
						type="submit"
						className="w-full"
						disabled={pending}
					>
						Submit
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
