"use client"

import React from 'react'
import { User } from '@supabase/supabase-js'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Popover } from '@radix-ui/react-popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { signout } from '@/lib/actions'
import Link from 'next/link'
import UserWidget from './user-widget'

type AvatarPopoverProps = {
    user: User;
}

export default function AvatarPopover({ user }: AvatarPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger>
                <Avatar>
                    <AvatarImage src={ user.user_metadata.avatar_url }/>
                    <AvatarFallback>{ user.user_metadata.display_name.substring(0, 2).toUpperCase() }</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="z-[9999] hidden md:flex flex-col gap-4 w-[300px] mt-1 mr-2">
                <div>
                    <UserWidget userMetadata={ user.user_metadata }/>
                    <Link href="/account">
                        <Button variant="outline" className="w-full mt-2">
                            My Profile
                        </Button>    
                    </Link>
                </div>
                <Separator className="w-full"/>
                <div>
                    <h3 className="font-bold">Account</h3>
                    <div>
                        <Link href="/settings">
                            <Button variant="link" className="block px-0">
                                Settings
                            </Button>
                        </Link>
                        <Button variant="link" onClick={ signout } className="px-0">
                            Sign Out
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
