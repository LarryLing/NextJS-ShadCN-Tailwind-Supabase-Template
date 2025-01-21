import { createClient } from "@/lib/supabase/client"
import { UserProfile } from "@/lib/types"
import { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export function useProfile(user: User | null) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>()

    useEffect(() => {
        async function getProfile() {
            if (!user) return

            const supabase = await createClient()

            const { data: profileData, error: profileError } = await supabase
                .from("profiles")
                .select("display_name, email, role, bio, picture")
                .eq("id", user.id)
                .single()

            if (profileError) {
                throw new Error(profileError.message)
            }

            setUserProfile(profileData as UserProfile)
        }

        getProfile()
    }, [])

    return { userProfile }
}
