"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function SettingsDialog() {
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
            <DialogContent className="min-h-[600px] flex flex-col justify-start">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="account">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="danger">Danger Zone</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Account
                                </CardTitle>
                                <CardDescription>
                                    Manage your account settings here.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="min-[300px]">

                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Security
                                </CardTitle>
                                <CardDescription>
                                    Change your account credentials and security options.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-md font-bold mb-2">Change Password</div>
                                <div className="space-y-1">
                                    <Label htmlFor="current">Current password</Label>
                                    <Input id="current" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">New password</Label>
                                    <Input id="new" type="password" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="danger">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Danger Zone
                                </CardTitle>
                                <CardDescription>
                                    Be careful here...
                                </CardDescription>
                            </CardHeader>
                            <CardContent>

                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
