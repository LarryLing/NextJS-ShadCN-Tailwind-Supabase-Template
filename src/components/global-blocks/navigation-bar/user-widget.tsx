import { UserProfile } from "@/lib/types";
import React, { ReactElement } from "react"

type UserWidgetProps = {
    userProfile: UserProfile;
    className?: string;
    children?: ReactElement | null;
}

export default function UserWidget({ userProfile, className, children }: UserWidgetProps) {
	return (
		<div className={`flex justify-start items-center ${className}`}>
            { children }
			<div className="ml-2">
				<h3 className="font-bold">{userProfile.display_name}</h3>
				<p className="text-sm w-[190px] overflow-hidden whitespace-nowrap text-ellipsis">{userProfile.email}</p>
			</div>
		</div>
	)
}
