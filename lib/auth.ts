import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import { isSamePass } from "./hash";
import CredentialsProvider, { CredentialsConfig } from 'next-auth/providers/credentials';

interface SessionType{
    adapter?:object,
    providers?:any,
    session?:object,
    pages?:object,
    callbacks?:object,
    secret?:string
  }
export const authOption:SessionType = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'email', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials: any) {

                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });

                if (!existingUser) {
                    return null
                }

                const comparePass = await isSamePass(credentials.password, existingUser.password);

                if (!comparePass) {
                    return null;
                }

                return {
                    id: `${existingUser.id}`,
                    name: existingUser.name,
                    email: existingUser.email
                }
            },
        })
    ],
    callbacks:{

    },
    secret: process.env.NEXTAUTH_SECRET,

}

