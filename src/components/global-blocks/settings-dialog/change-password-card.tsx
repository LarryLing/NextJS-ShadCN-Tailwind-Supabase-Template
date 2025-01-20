"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resetPassword } from '@/lib/actions'
import React, { useActionState } from 'react'

export default function ChangePasswordCard() {
    const [state, action, pending] = useActionState(resetPassword, undefined)

    return (
        <form action={action}>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                        After saving, you'll be logged out.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="password">Current Password</Label>
                        <Input id="password" name="password" type="password" />
                        {state?.errors.password && <p className="text-sm text-destructive">{state.errors.password}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" name="newPassword" type="password" />
                        {state?.errors.newPassword && <p className="text-sm text-destructive">{state.errors.newPassword}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" name="confirmPassword" type="password" />
                        {state?.errors.confirmPassword && <p className="text-sm text-destructive">{state.errors.confirmPassword}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={pending}>Update Password</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
