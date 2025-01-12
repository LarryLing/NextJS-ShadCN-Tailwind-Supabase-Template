import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserMetadata } from '@supabase/supabase-js';
import React from 'react'

type UserWidgetProps = {
    userMetadata: UserMetadata;
}

export default function UserWidget({ userMetadata }: UserWidgetProps) {
    return (
        <div className="flex justify-start items-center">
            <Avatar>
                <AvatarImage src={ userMetadata.avatar_url }/>
                <AvatarFallback>{ userMetadata.display_name.substring(0, 2).toUpperCase() }</AvatarFallback>
            </Avatar>
            <div className="ml-2">
                <h3 className="font-bold">{ userMetadata.display_name }</h3>
                <p className="text-sm">{ userMetadata.email }</p>
            </div>
        </div>
    )
}
