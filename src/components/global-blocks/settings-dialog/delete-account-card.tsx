"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function DeleteAccountCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Delete Account
                </CardTitle>
                <CardDescription>
                    Once you delete your account, there is no going back. Please be certain.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="destructive">Delete My Account</Button>
            </CardContent>
        </Card>
    )
}
