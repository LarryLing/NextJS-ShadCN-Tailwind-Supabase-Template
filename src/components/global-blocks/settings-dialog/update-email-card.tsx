"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function UpdateEmailCard() {
    return (
        <Card>
            <form action="">
                <CardHeader>
                    <CardTitle>Email</CardTitle>
                    <CardDescription>
                        Update your email here.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="new">New Email</Label>
                        <Input id="new" type="email" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Update Email</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
