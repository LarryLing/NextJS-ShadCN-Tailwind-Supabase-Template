import { UserProfile } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react"

type UserWidgetProps = {
	userProfile: UserProfile
	className?: string
}

export default function UserWidget({
	userProfile,
	className,
}: UserWidgetProps) {
	return (
		<div className={`flex justify-start items-center ${className}`}>
			<Avatar>
				<AvatarImage src={userProfile.avatar} />
				<AvatarFallback>
					{userProfile.display_name.substring(0, 2).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className="ml-2">
				<h3 className="font-bold">{userProfile.display_name}</h3>
				<p className="text-sm w-[190px] overflow-hidden whitespace-nowrap text-ellipsis">
					{userProfile.email}
				</p>
			</div>
		</div>
	)
}
