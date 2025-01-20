"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React from 'react'
import { UserMetadata } from '@supabase/supabase-js'
import EditProfileCard from './edit-profile-card'
import UpdateEmailCard from './update-email-card'
import ChangePasswordCard from './change-password-card'
import DeleteAccountCard from './delete-account-card'

type SettingsDialogProps = {
    userMetadata: UserMetadata;
    isSettingsDialogOpen: boolean;
    setIsSettingsDialogOpen: (arg0: boolean) => void;
}

export default function SettingsDialog({ userMetadata, isSettingsDialogOpen, setIsSettingsDialogOpen }: SettingsDialogProps) {
    return (
        <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
            <DialogContent className="z-[9999] h-[600px] overflow-auto flex flex-col justify-start">
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
