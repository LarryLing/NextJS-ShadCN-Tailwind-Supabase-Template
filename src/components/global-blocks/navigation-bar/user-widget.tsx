import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react"

type UserWidgetProps = {
    picture: string | undefined;
    display_name: string;
    email: string;
    className?: string
}

export default function UserWidget({ picture, display_name, email, className}: UserWidgetProps) {
	return (
		<div className={`flex justify-start items-center ${className}`}>
			<Avatar>
				<AvatarImage src={picture} />
				<AvatarFallback>
					{display_name?.substring(0, 2).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className="ml-2">
				<h3 className="font-bold">{display_name}</h3>
				<p className="text-sm w-[190px] overflow-hidden whitespace-nowrap text-ellipsis">{email}</p>
			</div>
		</div>
	)
}
