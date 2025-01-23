import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserProfile } from '@/lib/types'
import { createClient } from "@/lib/supabase/server"

type AvatarComponentProps = {
    userProfile: UserProfile | null;
}

export default async function AvatarComponent({ userProfile }: AvatarComponentProps) {
    const supabase = await createClient()



    return (

    )
}
