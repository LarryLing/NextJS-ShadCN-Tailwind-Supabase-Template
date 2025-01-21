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
		.maybeSingle()

	if (emailExistsError) {
		throw new Error(emailExistsError.message)
	}

	if (emailExists !== null) {
		return {
			errors: {
				email: ["Email is already in use"],
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

	if (signupError) {
		throw new Error(signupError.message)
    }

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

	const { error } = await supabase.auth.signInWithPassword(
		validatedFields.data,
	)

	if (error?.code === "invalid_credentials") {
		return {
			errors: {
				email: ["Incorrect email or password"],
			},
		}
	} else if (error?.status && error.status >= 500) {
		throw new Error(error.message)
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
		throw new Error(error.message)
	}

	redirect(data.url)
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
		throw new Error(error.message)
	}

	redirect(data.url)
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
		throw new Error(error.message)
	}

	redirect(data.url)
}

export async function signout() {
	const supabase = await createClient()

	const { error } = await supabase.auth.signOut()

	if (error) {
		throw new Error(error.message)
	}

	revalidatePath("/")
	redirect("/")
}

export async function sendPasswordReset() {
    const supabase = await createClient()
    const { data: userData, error: userError} = await supabase.auth.getUser()

    if (userError) {
        throw new Error(userError.message)
    }

    const userEmail = userData.user.email

    if (!userEmail) {
        return
    }

	const { error } = await supabase.auth.resetPasswordForEmail(
        userEmail, {
            redirectTo: "http://localhost:3000/login/reset-password",
        }
	)

	if (error) {
		throw new Error(error.message)
	}
}

export async function resetPassword(formState: FormState, formData: FormData) {
	const supabase = await createClient()
    const { data: userData, error: userError} = await supabase.auth.getUser()

    if (userError) {
        throw new Error(userError.message)
    }

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

	if (passwordError) {
		throw new Error(passwordError.message)
    }

    if (!(passwordData as boolean)) {
        return {
            errors: {
                password: ["Incorrect password"],
            }
        }
    }

    const { error: signoutError } = await supabase.auth.signOut()

    if (signoutError) {
		throw new Error(signoutError.message)
    }

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
		.maybeSingle()

	if (emailExistsError) {
		throw new Error(emailExistsError.message)
	}

	if (emailExists !== null) {
		return {
			errors: {
				email: ["Email is already in use"],
			},
		}
	}

	const { error: updateError } = await supabase.auth.updateUser({
        email: validatedFields.data.email,
        data: {
            email: validatedFields.data.email
        }
	})

	if (updateError) {
		throw new Error(updateError.message)
	}

	revalidatePath("/")
	redirect("/")
}

export async function updateUserProfile(formState: FormState, formData: FormData) {
    const supabase = await createClient()
    const { data: userData, error: userError} = await supabase.auth.getUser()

    if (userError) {
        throw new Error(userError.message)
    }

    const userid = userData.user.id

	const validatedFields = EditProfileFormSchema.safeParse({
        displayName: formData.get("displayName"),
        bio: formData.get("bio"),
        role: "other",
    })

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
    }

    const { error: profileError } = await supabase
        .from("profiles")
        .update({
            display_name: validatedFields.data.displayName,
            bio: validatedFields.data.bio,
            role: validatedFields.data.role,
        })
        .eq("id", userid)

	if (profileError) {
		throw new Error(profileError.message)
	}

	revalidatePath("/")
	redirect("/")
}
