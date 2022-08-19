import { PrismaAdapter } from '@next-auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import { User } from '@prisma/client';
import prisma from '../../../lib/utils/prisma';
import NextAuth from 'next-auth';

export default NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: { strategy: 'jwt' as any },
  callbacks: {
    async session({ session, user }: { session: any; user: Partial<User> }) {
      if (user) {
        session.user = user;
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: Partial<User> }) {
      return token;
    },
  },
});
