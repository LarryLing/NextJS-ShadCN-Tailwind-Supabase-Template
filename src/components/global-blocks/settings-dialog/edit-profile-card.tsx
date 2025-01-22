"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useActionState } from 'react'
import { updateUserProfile } from '@/lib/actions'
import { Textarea } from "@/components/ui/textarea"
import { UserProfile } from '@/lib/types'

type EditProfileCardProps = {
    userProfile: UserProfile
}

export default function EditProfileCard({ userProfile }: EditProfileCardProps) {
    const [state, action, pending] = useActionState(updateUserProfile, undefined)

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
                    <Button type="submit" disabled={pending}>Update Profile</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
