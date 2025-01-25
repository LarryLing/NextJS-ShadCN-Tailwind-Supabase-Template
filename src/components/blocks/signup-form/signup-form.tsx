"use client"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"
import { loginWithDiscord, loginWithGithub, signup } from "@/lib/actions"
import { Separator } from "@/components/ui/separator"
import { DiscordIcon, GithubIcon } from "@/components/icons/icon"
import Link from "next/link"

export function SignupForm() {
	const [state, action, pending] = useActionState(signup, undefined)

	return (
		<Card className="w-[384px]">
			<CardHeader>
				<CardTitle className="text-2xl">Sign Up</CardTitle>
				<CardDescription>
					Create an account with your email
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={action} className="flex flex-col gap-6">
					<div className="grid gap-2">
						<Label htmlFor="displayName">Display Name</Label>
						<Input
							id="displayName"
							name="displayName"
							type="text"
						/>
						{state?.errors?.displayName && (
							<p className="text-sm text-destructive">
								{state.errors.displayName}
							</p>
						)}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" name="email" type="text" />
						{state?.errors?.email && (
							<p className="text-sm text-destructive">
								{state.errors.email}
							</p>
						)}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" name="password" type="password" />
						{state?.errors?.password && (
							<div className="text-sm text-destructive">
								<p>Password must:</p>
								<ul>
									{state.errors.password.map((error) => (
										<li key={error}>- {error}</li>
									))}
								</ul>
							</div>
						)}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="confirmPassword">
							Confirm Password
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
					<div>
						<Button
							type="submit"
							disabled={pending}
							className="w-full"
						>
							Sign Up
						</Button>
						<div className="mt-2 text-center text-sm">
							Already have an account?{" "}
							<Link
								href="/login"
								className="hover:underline underline-offset-4"
							>
								Login
							</Link>
						</div>
					</div>
				</form>
			</CardContent>
			<div className="flex justify-center items-center text-sm p-6 pt-0">
				<Separator className="w-24" />
				<span className="mx-2">Or</span>
				<Separator className="w-24" />
			</div>
			<CardFooter className="flex flex-col gap-2">
				<Button
					onClick={loginWithDiscord}
					disabled={pending}
					className="w-full h-[50px] flex-1 bg-discord hover:bg-discord/90 text-background text-white"
				>
					<DiscordIcon />
					Continue with Discord
				</Button>
				<Button
					onClick={loginWithGithub}
					disabled={pending}
					className="w-full h-[50px] flex-1 bg-github hover:bg-github/90 text-background text-white"
				>
					<GithubIcon />
					Continue with Github
				</Button>
			</CardFooter>
		</Card>
	)
}
