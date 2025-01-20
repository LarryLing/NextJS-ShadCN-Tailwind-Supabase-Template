"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { UserMetadata } from '@supabase/supabase-js'
import EditProfileCard from './edit-profile-card'
import UpdateEmailCard from './update-email-card'
import ChangePasswordCard from './change-password-card'
import DeleteAccountCard from './delete-account-card'

type SettingsDialogProps = {
    userMetadata: UserMetadata
}

export default function SettingsDialog({ userMetadata }: SettingsDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="block px-3"
                >
                    <Settings className="inline h-[1.2rem] w-[1.2rem] mr-2"/>
                    <span>Settings</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="z-[9900] h-[600px] overflow-auto flex flex-col justify-start">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="profile">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="danger">Danger Zone</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <EditProfileCard userMetadata={userMetadata} />
                    </TabsContent>
                    <TabsContent value="security">
                        <UpdateEmailCard />
                        <ChangePasswordCard />
                    </TabsContent>
                    <TabsContent value="danger">
                        <DeleteAccountCard />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
