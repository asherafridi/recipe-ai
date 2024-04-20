import { z } from 'zod';

export function UserRegisterSchema(data: object) {
    const schema = z.object({
        name: z.string().min(2).max(30),
        email: z.string().email(),
        password: z.string().min(8).max(30)
    });

    const { error } = schema.safeParse(data);
    if (error) {
        const msg = error.errors.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
        }, {});
        return msg;
    }
    return undefined;
}

export function UserLoginSchema(data: object) {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(30)
    });

    const { error } = schema.safeParse(data);
    if (error) {
        const msg = error.errors.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
        }, {});
        return msg;
    }
    return undefined;
}