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
import { login, loginWithDiscord, loginWithGithub } from "@/lib/actions"
import { Separator } from "@/components/ui/separator"
import { DiscordIcon, GithubIcon } from "@/components/icons/icon"
import Link from "next/link"

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [state, action, pending] = useActionState(login, undefined)

	return (
		<Card className="w-[384px]">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={action} className="flex flex-col gap-6">
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
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link
								href="/login/forgot-password"
								className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
							>
								Forgot your password?
							</Link>
						</div>
						<Input id="password" name="password" type="password" />
						{state?.errors?.password && (
							<p className="text-sm text-destructive">
								{state.errors.password}
							</p>
						)}
					</div>
					<div>
						<Button
							type="submit"
							disabled={pending}
							className="w-full"
						>
							Login
						</Button>
						<div className="mt-2 text-center text-sm">
							Don&apos;t have an account?{" "}
							<Link
								href="/signup"
								className="hover:underline underline-offset-4"
							>
								Sign up
							</Link>
						</div>
					</div>
				</form>
			</CardContent>
			<div className="flex justify-center items-center text-sm p-6 pt-0">
				<Separator className="w-24" />
				<span className="mx-2">Or continue with</span>
				<Separator className="w-24" />
			</div>
			<CardFooter className="flex flex-col gap-6">
				<div className="w-full flex gap-2">
					<Button
						onClick={loginWithDiscord}
						disabled={pending}
						className="flex-1 bg-discord hover:bg-discord/90 text-background"
					>
						<DiscordIcon className="size-6" />
					</Button>
					<Button
						onClick={loginWithGithub}
						disabled={pending}
						className="flex-1 bg-github hover:bg-github/90 text-background"
					>
						<GithubIcon className="size-6" />
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}
