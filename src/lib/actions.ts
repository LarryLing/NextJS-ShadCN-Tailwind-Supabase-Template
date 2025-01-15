"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"
import { FormState, LoginFormSchema, SignupFormSchema } from "@/lib/definitions"
import { headers } from "next/headers"

export async function signup(formState: FormState, formData: FormData) {
	const supabase = await createClient()

	const validatedFields = SignupFormSchema.safeParse({
		displayName: formData.get("displayName"),
		email: formData.get("email"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirmPassword"),
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	const { error } = await supabase.auth.signUp({
		email: validatedFields.data.email,
		password: validatedFields.data.password,
		options: {
			data: {
				display_name: validatedFields.data.displayName,
				profile_picture: "",
			},
		},
	})

	if (error) {
		throw new Error(error.message)
		redirect("/signup")
	}

	revalidatePath("/", "layout")
	redirect("/account")
}

export async function login(formState: FormState, formData: FormData) {
	const supabase = await createClient()

	const validatedFields = LoginFormSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	const { error } = await supabase.auth.signInWithPassword(
		validatedFields.data,
	)

	if (error) {
		redirect("/login")
	}

	revalidatePath("/", "layout")
	redirect("/")
}

export async function loginWithGoogle() {
	const supabase = await createClient()

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	})

	if (error) {
		redirect("/error")
	} else {
		return redirect(data.url)
	}
}

export async function loginWithDiscord() {
	const supabase = await createClient()
	const origin = (await headers()).get("origin")

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "discord",
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	})

	if (error) {
		redirect("/error")
	} else {
		return redirect(data.url)
	}
}

export async function loginWithGithub() {
	const supabase = await createClient()
	const origin = (await headers()).get("origin")

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
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
		redirect("/error")
	}

	revalidatePath("/")
	redirect("/")
}
