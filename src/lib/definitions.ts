import { z } from "zod"

export const SignupFormSchema = z
    .object({
        displayName: z
            .string()
            .min(4, { message: "Name must be at least 4 characters long. "})
            .regex(/^[a-zA-Z0-9]/, { message: "Name must start with non-whitespace character" })
            .trim(),
        email: z
            .string()
            .email({ message: "Please enter a valid email." }),
        password: z
            .string()
            .min(8, { message: 'Be at least 8 characters long.' })
            .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
            .regex(/[0-9]/, { message: 'Contain at least one number.' })
            .regex(/[^a-zA-Z0-9]/, { message: 'Contain at least one special character.' })
            .trim(),
        confirmPassword: z
            .string()
            .trim(),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords don't match",
            path: ["confirmPassword"],
        }
    )
    .refine(
        (data) => /^[a-zA-Z0-9 ]*$/gi.test(data.displayName),
        {
            message: "Name cannot contain special characters",
            path: ["displayName"],
        }
    )

export const LoginFormSchema = z.object({
    email: z
        .string()
        .email({ message: "Please enter a valid email." }),
    password: z
        .string()
        .min(1, { message: "Please enter a password." })
        .trim(),
})

export type FormState = {
    errors?: {
        displayName?: string[],
        email?: string[],
        password?: string[],
    }
} | undefined;