import { getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { userService } from './services/userService';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  site: process.env.NEXTAUTH_URL,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account && account.type === 'credentials') {
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        return userService.authenticate(username, password);
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
