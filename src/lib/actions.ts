'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from './supabase/server'
import { FormState, LoginFormSchema, SignupFormSchema } from '@/lib/definitions'
import { headers } from 'next/headers'

export async function signup(formState: FormState, formData: FormData) {
    const supabase = await createClient()

    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { error } = await supabase.auth.signUp({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
    })

    if (error) {
        redirect("/login")
    }

    revalidatePath('/', 'layout')
    redirect('/account')
}

export async function login(formState: FormState, formData: FormData) {
    const supabase = await createClient()

     // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    })
 
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { error } = await supabase.auth.signInWithPassword(validatedFields.data)

    if (error) {
        redirect("/login")
    }

    revalidatePath('/', 'layout')
    redirect('/account')
}

export async function loginWithGoogle() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
    })

    if (error) {
        redirect("/error")
    }

    revalidatePath("/", "layout")
    redirect("/account")
}

export async function loginWithDiscord() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord'
    })

    if (error) {
        redirect("/error")
    }

    revalidatePath("/", "layout")
    redirect("/account")
}

export async function loginWithGithub() {
    const supabase = await createClient()
    const origin = (await headers()).get("origin")

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${ origin }/auth/callback`,
        }
    })

    if (error) {
        redirect("/error")
    } else {
        return redirect(data.url)
    }
}

export async function signout() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/account')
}