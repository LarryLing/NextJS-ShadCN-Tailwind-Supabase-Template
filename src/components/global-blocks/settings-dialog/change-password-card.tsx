"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function ChangePasswordCard() {
    return (
        <Card className="mt-4">
            <form action="">
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                        Change your password here. After saving, you'll be logged out.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="current">Current Password</Label>
                        <Input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="new">New Password</Label>
                        <Input id="new" type="password" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="confirm">Confirm Password</Label>
                        <Input id="confirm" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Save Password</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
