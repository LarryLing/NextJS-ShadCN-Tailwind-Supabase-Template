"use client"

import { Button } from "@/components/ui/button"

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error
	reset: () => void
}) {
	return (
		<>
			<p>Sorry, something went wrong</p>
			{error.message && <p>{error.message}</p>}
			<Button
				variant="default"
				onClick={reset}
			>
				Try again
			</Button>
		</>
	)
}
