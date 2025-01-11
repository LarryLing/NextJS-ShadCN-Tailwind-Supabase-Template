import { z } from "zod"

export const SignupFormSchema = z
    .object({
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
            path: ["confirmPassword"], // path of error
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
        email?: string[],
        password?: string[],
    }
} | undefined;