import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userCode: { label: 'Investor Code or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.userCode || !credentials?.password) {
          return null;
        }

        const input = String(credentials.userCode).trim();
        const password = String(credentials.password);

        // Find user by userCode or email
        const user = await db.user.findFirst({
          where: {
            OR: [
              { userCode: input },
              { email: input.toLowerCase() },
            ],
          },
          include: {
            investorProfile: true,
          },
        });

        if (!user || user.status !== 'ACTIVE') {
          return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          userCode: user.userCode,
          role: user.role,
          investorProfileId: user.investorProfile?.id || null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userCode = (user as any).userCode;
        token.role = (user as any).role;
        token.investorProfileId = (user as any).investorProfileId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).userCode = token.userCode as string;
        (session.user as any).role = token.role as string;
        (session.user as any).investorProfileId = token.investorProfileId as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: '/en/investor/login',
    error: '/en/investor/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'icon_international_super_secret_jwt_key_2026',
});
