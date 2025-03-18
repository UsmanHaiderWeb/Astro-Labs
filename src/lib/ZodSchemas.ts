import { z } from "zod";

export const SignupSchema = z.object({
    username: z.string().min(1, "Username is required."),
    email: z.string().email(),
    password: z.string().min(6, "Password must be atleast 6 characters."),
})

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be atleast 6 characters."),
})