import { BrillianceIcon } from "@/components/icons/icon"
import { Button } from "@/components/ui/button"
import { NavigationMenu } from "@/components/ui/navigation-menu"
import Link from "next/link"

export default async function AuthenticationLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<section>
			<NavigationMenu className="sticky text-nowrap max-w-none w-full h-[80px] pl-6 pr-4 md:pr-6 flex justify-between items-center border-b-[1px] border-border">
				<Link
					href="/"
					className="flex item-center font-bold text-2xl gap-3"
				>
					<BrillianceIcon />
					<span className="hidden sm:inline">NextJS Template</span>
				</Link>
				<Link href="/">
					<Button>Return home</Button>
				</Link>
			</NavigationMenu>
			<div className="flex justify-center items-center mt-6">
				{children}
			</div>
		</section>
	)
}
