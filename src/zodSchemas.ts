import {z} from "zod";

export const createUserSchema = z.object({
    username: z.string(),
    password: z.string(),
    firstname: z.string().optional(),
    lastname: z.string().optional()
});

export const todoSchema = z.object({
    title: z.string(),
    description: z.string(),
    done: z.boolean().optional(),
    userId: z.number()
});