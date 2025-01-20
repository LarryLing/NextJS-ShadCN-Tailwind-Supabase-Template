"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserMetadata } from '@supabase/supabase-js'
import React, { useActionState } from 'react'
import { updateUserProfile } from '@/lib/actions'
import { Textarea } from "@/components/ui/textarea"

type EditProfileCardProps = {
    userMetadata: UserMetadata
}

export default function EditProfileCard({ userMetadata }: EditProfileCardProps) {
    const [state, action, pending] = useActionState(updateUserProfile, undefined)

    return (
        <Card>
            <form action={action}>
                <CardHeader>
                    <CardTitle>
                        Edit Profile
                    </CardTitle>
                    <CardDescription>
                        Change your profile details here.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex justify-center items-center gap-4">
                        <Avatar className="w-[100px] h-[100px] overflow-visible">
                            <AvatarImage src={userMetadata.profile_picture} />
                            <AvatarFallback>
                                {userMetadata.display_name
                                    .substring(0, 2)
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <Label htmlFor="picture">Profile Picture</Label>
                            <Input id="picture" name="picture" type="file" accept="image/png, image/gif, image/jpeg" className="justify-center items-center "/>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" name="displayName" type="text" defaultValue={userMetadata.display_name} />
                        {state?.errors.displayName && <p className="text-sm text-destructive">{state.errors.displayName}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="role">Role</Label>
                        <Select>
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
                            defaultValue=""
                            id="bio"
                            name="bio"
                            className="resize-none h-[100px]"
                        />
                        {state?.errors.bio && <p className="text-sm text-destructive">{state.errors.bio}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={pending}>Update Profile</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
