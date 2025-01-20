import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserMetadata } from "@supabase/supabase-js"
import React from "react"

type UserWidgetProps = {
	userMetadata: UserMetadata
    className?: string
}

export default function UserWidget({ userMetadata, className}: UserWidgetProps) {
	return (
		<div className={`flex justify-start items-center ${className}`}>
			<Avatar>
				<AvatarImage src={userMetadata.profile_picture} />
				<AvatarFallback>
					{userMetadata.display_name.substring(0, 2).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className="ml-2">
				<h3 className="font-bold">{userMetadata.display_name}</h3>
				<p className="text-sm w-[190px] overflow-hidden whitespace-nowrap text-ellipsis">{userMetadata.email}</p>
			</div>
		</div>
	)
}
