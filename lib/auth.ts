import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import { isSamePass } from "./hash";
import CredentialsProvider, { CredentialsConfig } from 'next-auth/providers/credentials';
import { AuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string
    } & DefaultSession["user"]
  }
}

export const authOption: AuthOptions = {
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
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user && user.id) {
                token.id = user.id;
            } else {
                console.error('User or user.id is missing.');
            }
            return token;
        },
        async session({ session, user, token }) {
            session.user.id = `${token.id}`
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}

