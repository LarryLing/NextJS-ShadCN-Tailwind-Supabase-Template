"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React, { useActionState } from 'react'
import { updateEmail } from '@/lib/actions'
import { UserProfile } from '@/lib/types'

type UpdateEmailCardProps = {
    userProfile: UserProfile
}

export default function UpdateEmailCard({ userProfile }: UpdateEmailCardProps) {
    const [state, action, pending] = useActionState(updateEmail, undefined)

    return (
        <Card>
            <form action={action}>
                <CardHeader>
                    <CardTitle>Edit Email</CardTitle>
                    <CardDescription>
                        For security reasons, a confirmation message will be sent to both your old and new
                        emails. Please confirm your changes in both emails.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="text" placeholder={userProfile.email} />
                        {state?.errors.email && <p className="text-sm text-destructive">{state.errors.email}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={pending}>Update Email</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
