"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"
import {
	FormState,
	LoginFormSchema,
	EmailFormSchema,
	SignupFormSchema,
	ResetPasswordFormSchema,
	EditProfileFormSchema,
	ResetForgottenPasswordFormSchema,
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

	const { data: signupData, error: signupError } = await supabase.auth.signUp(
		{
			email: validatedFields.data.email,
			password: validatedFields.data.password,
			options: {
				data: {
					display_name: validatedFields.data.displayName,
				},
			},
		},
	)

	if (signupError) throw signupError

	if (
		signupData.user &&
		signupData.user.identities &&
		signupData.user.identities.length === 0
	) {
		const { error: resendError } = await supabase.auth.resend({
			type: "signup",
			email: validatedFields.data.email,
		})

		if (resendError) throw resendError

		return {
			errors: {
				email: ["This email is already associated with an account"],
			},
		}
	}

	revalidatePath("/", "layout")
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

export async function loginWithDiscord() {
	const supabase = await createClient()
	const origin = (await headers()).get("origin")

	const { data: oauthData, error: oauthError } =
		await supabase.auth.signInWithOAuth({
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

	const { data: oauthData, error: oauthError } =
		await supabase.auth.signInWithOAuth({
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

export async function sendPasswordReset(
	formState: FormState,
	formData: FormData,
) {
	const supabase = await createClient()

	const validatedFields = EmailFormSchema.safeParse({
		email: formData.get("email"),
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	const { error: resetError } = await supabase.auth.resetPasswordForEmail(
		validatedFields.data.email,
		{
			redirectTo: "http://localhost:3000/login/reset-password",
		},
	)

	if (resetError) throw resetError
}

export async function resetPassword(formState: FormState, formData: FormData) {
	const supabase = await createClient()
	const { data: userData, error: userError } = await supabase.auth.getUser()

	if (userError) throw userError

	const userid = userData.user.id

	const validatedFields = ResetPasswordFormSchema.safeParse({
		password: formData.get("password"),
		newPassword: formData.get("newPassword"),
		confirmPassword: formData.get("confirmPassword"),
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	const { data: passwordData, error: passwordError } = await supabase.rpc(
		"handle_password_change",
		{
			current: validatedFields.data.password,
			new: validatedFields.data.newPassword,
			userid: userid,
		},
	)

	if (passwordError) throw passwordError

	if (!(passwordData as boolean)) {
		return {
			errors: {
				password: ["Incorrect password"],
			},
		}
	}

	const { error: signoutError } = await supabase.auth.signOut()

	if (signoutError) throw signoutError

	revalidatePath("/")
	redirect("/login")
}

export async function resetForgottenPassword(
	formState: FormState,
	formData: FormData,
) {
	const supabase = await createClient()

	const validatedFields = ResetForgottenPasswordFormSchema.safeParse({
		newPassword: formData.get("newPassword"),
		confirmPassword: formData.get("confirmPassword"),
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	const { error: updateError } = await supabase.auth.updateUser({
		password: validatedFields.data.newPassword,
	})

	if (updateError) throw updateError

	revalidatePath("/")
	redirect("/")
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

	const { data: emailExistsData, error: emailExistsError } = await supabase
		.from("profiles")
		.select("email")
		.eq("email", validatedFields.data.email)

	if (emailExistsError) throw emailExistsError

	if (emailExistsData.length > 0) {
		return {
			errors: {
				email: ["This email is already associated with an account"],
			},
		}
	}

	const { data: updateData, error: updateError } =
		await supabase.auth.updateUser({
			email: validatedFields.data.email,
			data: {
				email: validatedFields.data.email,
			},
		})

	if (updateError) throw updateError

	const { error: profileError } = await supabase
		.from("profiles")
		.update({
			email: validatedFields.data.email,
		})
		.eq("id", updateData.user.id)

	if (profileError) throw profileError

	revalidatePath("/")
	redirect("/")
}

export async function updateUserProfile(
	formState: FormState,
	formData: FormData,
) {
	const supabase = await createClient()

	const validatedFields = EditProfileFormSchema.safeParse({
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

	const { error: profileError } = await supabase
		.from("profiles")
		.update({
			display_name: validatedFields.data.displayName,
			bio: validatedFields.data.bio,
			role: validatedFields.data.role,
		})
		.eq("id", userid)

	if (profileError) throw profileError

	revalidatePath("/")
	redirect("/")
}

export async function deleteAccount() {
	const supabase = await createClient()

	const { data: userData, error: userError } = await supabase.auth.getUser()

	if (userError) throw userError

	const userId = userData.user.id

	const { data: folderData, error: folderError } = await supabase.storage
		.from("avatars")
		.list(`${userId}`)

	if (folderError) throw folderError

	if (folderData.length > 0) {
		const files = folderData.map((file) => `${userId}/${file.name}`)
		const { error: removeError } = await supabase.storage
			.from("avatars")
			.remove(files)

		if (removeError) throw removeError
	}

	const { error: deleteError } = await supabase.rpc("handle_delete_user")

	if (deleteError) throw deleteError

	const { error: signoutError } = await supabase.auth.signOut()

	if (signoutError) throw signoutError

	revalidatePath("/")
	redirect("/")
}
