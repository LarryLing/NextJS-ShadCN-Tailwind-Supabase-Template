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
import Link from "next/link"
import React from "react"

export default function ErrorCard({
	error,
	reset,
}: {
	error: Error
	reset: () => void
}) {
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle className="text-2xl">Oops...</CardTitle>
				<CardDescription>{error.message}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>
					Looks like something went wrong on our end. We'll try to do
					better next time. Thank you for your patience!
				</p>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Link
					href="/"
					className="mr-2"
				>
					<Button variant="outline">Return home</Button>
				</Link>
				<Button
					variant="default"
					onClick={reset}
				>
					Try again
				</Button>
			</CardFooter>
		</Card>
	)
}
