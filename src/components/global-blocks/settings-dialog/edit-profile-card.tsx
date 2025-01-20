"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserMetadata } from '@supabase/supabase-js'
import { Pencil } from 'lucide-react'
import React from 'react'

type EditProfileCardProps = {
    userMetadata: UserMetadata
}

export default function EditProfileCard({ userMetadata }: EditProfileCardProps) {
    return (
        <Card>
            <form action="">
                <CardHeader>
                    <CardTitle>
                        Edit profile
                    </CardTitle>
                    <CardDescription>
                        Change your profile details here.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex justify-center">
                        <Avatar className="relative w-[100px] h-[100px] overflow-visible">
                            <AvatarImage src={userMetadata.profile_picture} />
                            <AvatarFallback>
                                {userMetadata.display_name
                                    .substring(0, 2)
                                    .toUpperCase()}
                            </AvatarFallback>
                            <Button type="button" size="icon" className="absolute bottom-1 right-1 size-6">
                                <Pencil />
                            </Button>
                        </Avatar>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="new">Display Name</Label>
                        <Input id="new" type="text" defaultValue={userMetadata.display_name} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="role">Role</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Student" />
                            </SelectTrigger>
                            <SelectContent className="z-[9999]">
                                <SelectItem id="role" value="student">Student</SelectItem>
                                <SelectItem id="role" value="educator">Educator</SelectItem>
                                <SelectItem id="role" value="design">Design</SelectItem>
                                <SelectItem id="role" value="product management">Product Management</SelectItem>
                                <SelectItem id="role" value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Update Profile</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
