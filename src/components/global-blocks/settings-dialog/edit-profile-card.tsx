"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { ChangeEvent, ReactElement, useActionState, useState } from 'react'
import { updateUserProfile } from '@/lib/actions'
import { Textarea } from "@/components/ui/textarea"
import { UserProfile } from '@/lib/types'

type EditProfileCardProps = {
    userProfile: UserProfile;
}

export default function EditProfileCard({ userProfile }: EditProfileCardProps) {
    const [state, action, pending] = useActionState(updateUserProfile, undefined)
    const [previewAvatar, setPreviewAvatar] = useState<string | undefined>(userProfile.picture)
    const [imageTooLarge, setImageTooLarge] = useState(false)
    const MAX_FILE_SIZE = 6000000

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setImageTooLarge(file.size > MAX_FILE_SIZE)
        setPreviewAvatar(URL.createObjectURL(file))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Edit Profile
                </CardTitle>
                <CardDescription>
                    Change your profile details here.
                </CardDescription>
            </CardHeader>
            <form action={action}>
                <CardContent className="space-y-2">
                    <div className="flex justify-center items-center gap-4">
                        <Avatar className="size-[100px]">
                            <AvatarImage src={previewAvatar} />
                            <AvatarFallback>
                                {userProfile.display_name
                                    .substring(0, 2)
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <Label htmlFor="picture">Upload Image</Label>
                            <Input id="picture" name="picture" type="file" accept="image/*" onChange={(e) => handleChange(e)} className="justify-center items-center" />
                            {imageTooLarge && <p className="text-sm text-destructive">Max file size is 6MB</p>}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" name="displayName" type="text" defaultValue={userProfile.display_name} />
                        {state?.errors.displayName && <p className="text-sm text-destructive">{state.errors.displayName}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="role">Role</Label>
                        <Select name="role" defaultValue={userProfile.role}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent className="z-[9999]">
                                <SelectItem id="role" value="student">Student</SelectItem>
                                <SelectItem id="role" value="educator">Educator</SelectItem>
                                <SelectItem id="role" value="design">Design</SelectItem>
                                <SelectItem id="role" value="product management">Product Management</SelectItem>
                                <SelectItem id="role" value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {state?.errors.role && <p className="text-sm text-destructive">{state.errors.role}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            placeholder="Tell us a little bit about yourself"
                            defaultValue={userProfile.bio}
                            id="bio"
                            name="bio"
                            className="resize-none h-[100px]"
                        />
                        {state?.errors.bio && <p className="text-sm text-destructive">{state.errors.bio}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={pending || imageTooLarge}>Update Profile</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
