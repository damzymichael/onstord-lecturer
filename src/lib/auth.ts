import {NextAuthOptions, User} from 'next-auth';
import prisma from './prisma';
// import {PrismaAdapter} from '@auth/prisma-adapter';
// import {PrismaClient, Prisma} from '@prisma/client';
// import {Adapter} from 'next-auth/adapters';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const user = await prisma.lecturer.findUnique({
            where: {email: credentials?.email},
            select: {id: true, email: true, name: true, password: true}
          });
          if (!user) return null;
          const passwordCorrect = await bcrypt.compare(
            credentials?.password!,
            user.password as string
          );
          if (!passwordCorrect) return null;
          const {password, ...rest} = user;
          return rest;
        } catch (error: any) {
          console.log(error);
          throw new Error(error);
        }
      }
    })
  ],
  callbacks: {
    async signIn({user, account}) {
      try {
        if (account?.provider === 'credentials') return true;

        if (account?.provider === 'google') {
          const userExists = await prisma.lecturer.findUnique({
            where: {email: user.email as string}
          });

          if (!userExists) {
            await prisma.lecturer.create({
              data: {
                email: user.email as string,
                name: user.name,
                image: user.image || null
              }
            });
          }
          return true;
        }
        return false
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({token, account}) {
      if (account?.provider === 'google') {
        const userExists = await prisma.lecturer.findUnique({
          where: {email: token.email as string}
        });
        token.id = userExists?.id.toString();
      }
      return token;
    },
    async session({session, token}) {
      session.user.id = (token.id as string) ?? token.sub;
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/'
  },
  secret: process.env.NEXT_AUTH_SECRET as string
};
