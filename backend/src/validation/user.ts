import { z } from "zod";

export const InsertUserSchema = z.object({
    firstName: z.string().trim().refine(value=>value.length > 0,{
        message:" can't be whiteSpace or empty"
    }),
    middleName: z.string().trim().optional().refine(value=>value === undefined ||value.length>0,{
        message:" can't be whiteSpace"
    }),
    lastName: z.string().trim().refine(value=>value.length>0,{
        message:" can't be whiteSpace or empty"
    }),
    email: z.string().email().toLowerCase(),
    password: z.string().refine(value=>value.trim().length>0,{
        message:" can't be whiteSpace or empty"
    }),
});


export const LoginSchema  = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().refine(value=>value.trim().length>0,{
        message:" can't be whiteSpace or empty"
    })
});

export type UserCreationData = z.infer<typeof InsertUserSchema>

export type LoginData = Pick<UserCreationData, 'email' | 'password'>
