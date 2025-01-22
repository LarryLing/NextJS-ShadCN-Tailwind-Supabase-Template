"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadImage } from '@/lib/actions'
import { UserProfile } from '@/lib/types'
import React, { ChangeEvent, useActionState, useState } from 'react'

type UploadPictureCard = {
    userProfile: UserProfile
}

export default function UploadPictureCard({ userProfile }: UploadPictureCard) {
    const [state, action, pending] = useActionState(uploadImage, undefined)
    const [disabled, setDisabled] = useState(false)
    const MAX_FILE_SIZE = 6000000

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setDisabled(file.size > MAX_FILE_SIZE)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Profile Picture
                </CardTitle>
                <CardDescription>
                    Upload an image for your profile picture.
                </CardDescription>
            </CardHeader>
            <form action={action}>
                <CardContent>
                    <div className="flex justify-center items-center gap-4">
                        <Avatar className="w-[100px] h-[100px]">
                            <AvatarImage src={userProfile.picture} />
                            <AvatarFallback>
                                {userProfile.display_name
                                    .substring(0, 2)
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <Label htmlFor="picture">Profile Picture</Label>
                            <Input id="picture" name="picture" type="file" accept="image/*" onChange={(e) => handleChange(e)} className="justify-center items-center" />
                            {disabled && <p className="text-sm text-destructive">Max file size is 6MB</p>}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={pending || disabled}>Upload Photo</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
