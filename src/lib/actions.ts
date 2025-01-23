"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"
import {
	FormState,
	LoginFormSchema,
	EmailFormSchema,
	SignupFormSchema,
    ChangePasswordFormScheme,
    EditProfileFormSchema,
} from "@/lib/definitions"
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

	const { data: emailExists, error: emailExistsError } = await supabase
		.from("profiles")
		.select("email")
		.eq("email", validatedFields.data.email)

	if (emailExistsError) throw emailExistsError

	if (emailExists) {
		return {
			errors: {
				email: ["This email is already associated with an account"],
			},
		}
    }

	const { error: signupError } = await supabase.auth.signUp({
		email: validatedFields.data.email,
        password: validatedFields.data.password,
        options: {
            data: {
                display_name: validatedFields.data.displayName
            }
        }
	})

	if (signupError) throw signupError

	revalidatePath("/", "layout")
	redirect("/")
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

	const { error: signinError } = await supabase.auth.signInWithPassword(
		validatedFields.data,
	)

	if (signinError?.code === "invalid_credentials") {
		return {
			errors: {
				email: ["Incorrect email or password"],
			},
		}
	} else if (signinError?.status && signinError.status >= 500) {
		throw signinError
	}

	revalidatePath("/", "layout")
	redirect("/")
}

export async function loginWithGoogle() {
	const supabase = await createClient()

	const { data: oauthData, error: oauthError } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	})

	if (oauthError) {
		throw oauthError
	}

	redirect(oauthData.url)
}

export async function loginWithDiscord() {
	const supabase = await createClient()
	const origin = (await headers()).get("origin")

	const { data: oauthData, error: oauthError } = await supabase.auth.signInWithOAuth({
		provider: "discord",
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	})

	if (oauthError) {
		throw oauthError
	}

	redirect(oauthData.url)
}

export async function loginWithGithub() {
	const supabase = await createClient()
	const origin = (await headers()).get("origin")

	const { data: oauthData, error: oauthError } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	})

	if (oauthError) throw oauthError

	redirect(oauthData.url)
}

export async function signout() {
	const supabase = await createClient()

	const { error: singoutError } = await supabase.auth.signOut()

	if (singoutError) throw singoutError

	revalidatePath("/")
	redirect("/")
}

export async function sendPasswordReset() {
    const supabase = await createClient()
    const { data: userData, error: userError} = await supabase.auth.getUser()

    if (userError) throw userError

    if (!userData.user.email) return

	const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        userData.user.email, {
            redirectTo: "http://localhost:3000/login/reset-password",
        }
	)

	if (resetError) throw resetError
}

export async function resetPassword(formState: FormState, formData: FormData) {
	const supabase = await createClient()
    const { data: userData, error: userError} = await supabase.auth.getUser()

    if (userError) throw userError

    const userid = userData.user.id

    const validatedFields = ChangePasswordFormScheme.safeParse({
        password: formData.get("password"),
		newPassword: formData.get("newPassword"),
		confirmPassword: formData.get("confirmPassword"),
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
    }

    const { data: passwordData, error: passwordError } = await supabase.rpc("changepassword", {
        "current": validatedFields.data.password,
        "new": validatedFields.data.newPassword,
        "userid": userid,
    })

	if (passwordError) throw passwordError

    if (!(passwordData as boolean)) {
        return {
            errors: {
                password: ["Incorrect password"],
            }
        }
    }

    const { error: signoutError } = await supabase.auth.signOut()

    if (signoutError) throw signoutError

	revalidatePath("/")
	redirect("/login")
}

export async function updateEmail(formState: FormState, formData: FormData) {
    const supabase = await createClient()

	const validatedFields = EmailFormSchema.safeParse({
		email: formData.get("email"),
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
    }

    const { data: emailExists, error: emailExistsError } = await supabase
		.from("profiles")
		.select("email")
		.eq("email", validatedFields.data.email)

	if (emailExistsError) throw emailExistsError

	if (emailExists) {
		return {
			errors: {
				email: ["This email is already associated with an account"],
			},
		}
    }

    const { error: updateError } = await supabase.auth.updateUser({
        email: validatedFields.data.email,
        data: {
            email: validatedFields.data.email,
        }
    })

    if (updateError) throw updateError

	revalidatePath("/")
	redirect("/")
}

export async function updateUserProfile(formState: FormState, formData: FormData) {
    const supabase = await createClient()

    const validatedFields = EditProfileFormSchema.safeParse({
        picture: formData.get("picture"),
        displayName: formData.get("displayName"),
        bio: formData.get("bio"),
        role: formData.get("role"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError) throw userError

    const userid = userData.user.id

    const { data: avatarData, error: avatarError } = await supabase
        .from("profiles")
        .select("picture")
        .eq("id", userid)
        .single()

    if (avatarError) throw avatarError

    let avatarUrl = avatarData.picture

    if (validatedFields.data.picture.size !== 0) {
        const type = validatedFields.data.picture.name.split(".")[1]
        const { data: uploadData, error: uploadError } = await supabase.storage.from("avatars").upload(`avatar_${userid}.${type}`, validatedFields.data.picture, {
            upsert: true,
        })

        if (uploadError) throw uploadError

        avatarUrl = uploadData.path
    }

    const { error: profileError } = await supabase
        .from("profiles")
        .update({
            picture: avatarUrl,
            display_name: validatedFields.data.displayName,
            bio: validatedFields.data.bio,
            role: validatedFields.data.role,
        })
        .eq("id", userid)

	if (profileError) throw profileError

	revalidatePath("/")
	redirect("/")
}
