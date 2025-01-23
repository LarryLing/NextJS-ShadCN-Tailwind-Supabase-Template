"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React from 'react'
import EditProfileCard from './edit-profile-card'
import UpdateEmailCard from './update-email-card'
import ChangePasswordCard from './change-password-card'
import DeleteAccountCard from './delete-account-card'
import { UserProfile } from '@/lib/types'
import UploadAvatarCard from './upload-avatar-card'

type SettingsDialogProps = {
    userProfile: UserProfile;
    setUserProfile: (arg0: UserProfile) => void;
    isSettingsDialogOpen: boolean;
    setIsSettingsDialogOpen: (arg0: boolean) => void;
}

export default function SettingsDialog({ userProfile, setUserProfile, isSettingsDialogOpen, setIsSettingsDialogOpen }: SettingsDialogProps) {
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
                    <TabsContent value="profile" className="space-y-4">
                        <UploadAvatarCard userProfile={userProfile} setUserProfile={setUserProfile} />
                        <EditProfileCard userProfile={userProfile} />
                    </TabsContent>
                    <TabsContent value="security" className="space-y-4">
                        <UpdateEmailCard userProfile={userProfile} />
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
