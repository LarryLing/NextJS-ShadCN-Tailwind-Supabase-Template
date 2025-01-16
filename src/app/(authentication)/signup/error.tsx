"use client"

import ErrorCard from "@/components/blocks/error-card/error-card"

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error
	reset: () => void
}) {
	return (
		<div className="flex justify-center items-center h-screen w-screen">
			<ErrorCard
				error={error}
				reset={reset}
			/>
		</div>
	)
}
