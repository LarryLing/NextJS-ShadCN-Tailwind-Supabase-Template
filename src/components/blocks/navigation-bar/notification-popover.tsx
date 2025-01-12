"use client"

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Bell } from 'lucide-react'
import React from 'react'

export default function NotificationPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Bell />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="z-[9999] hidden md:block w-[300px] mt-1 mr-2">
                <h3 className="font-bold">Notifications</h3>
                <p className="italic text-center mt-2">No new notifications</p>
            </PopoverContent>
        </Popover>
    )
}
