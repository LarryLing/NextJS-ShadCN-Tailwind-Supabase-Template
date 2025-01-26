"use client"

import React, { ChangeEvent, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { UserProfile } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

type UploadAvatarCardProps = {
	userProfile: UserProfile
	setUserProfile: (arg0: UserProfile) => void
}

export default function UploadAvatarCard({
	userProfile,
	setUserProfile,
}: UploadAvatarCardProps) {
	const supabase = createClient()

	const [uploading, setUploading] = useState(false)
	const [avatarUrl, setAvatarUrl] = useState(userProfile.avatar)
	const [imageTooLarge, setImageTooLarge] = useState(false)
	const MAX_FILE_SIZE = 6000000

	async function uploadAvatar(e: ChangeEvent<HTMLInputElement>) {
		setUploading(true)

		if (!e.target.files || e.target.files?.length === 0) {
			setUploading(false)
			return
		}
		setImageTooLarge(e.target.files[0].size > MAX_FILE_SIZE)
		if (e.target.files[0].size > MAX_FILE_SIZE) {
			setUploading(false)
			return
		}

		const file = e.target.files[0]
		const fileExt = file.name.split(".").pop()
		const filePath = `${userProfile.id}/avatar_${Date.now()}.${fileExt}`

		const { error: uploadError } = await supabase.storage
			.from("avatars")
			.upload(filePath, file)

		if (uploadError) throw uploadError

		const { error: profileError } = await supabase
			.from("profiles")
			.update({
				avatar: filePath,
			})
			.eq("id", userProfile.id)

		if (profileError) throw profileError

		const { data: avatarData } = await supabase.storage
			.from("avatars")
			.getPublicUrl(filePath)

		setUserProfile({
			...userProfile,
			avatar: avatarData.publicUrl,
		})
		setAvatarUrl(avatarData.publicUrl)
		setUploading(false)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Upload Avatar</CardTitle>
				<CardDescription>Change your avatar here.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="flex justify-center items-center gap-4">
					<Avatar className="size-[100px]">
						<AvatarImage src={avatarUrl} />
						<AvatarFallback>
							{userProfile.display_name
								.substring(0, 2)
								.toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<Input
							id="avatar"
							name="avatar"
							type="file"
							accept="image/*"
							onChange={(e) => uploadAvatar(e)}
							disabled={uploading}
							className="justify-center items-center"
						/>
						{imageTooLarge && (
							<p className="text-sm text-destructive">
								Max file size is 6MB
							</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
