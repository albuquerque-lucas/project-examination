import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider, { CredentialsConfig } from 'next-auth/providers/credentials';
import axios from '@/app/lib/axios/axios';

interface AuthOptions {
  providers: (ReturnType<typeof GoogleProvider> | CredentialsConfig<any>)[];
  secret: string,
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "laravel",
      credentials: {
        username: { label: "username", type: "text", placeholder: "your.username" },
        password: {  label: "password", type: "password", placeholder: "********"  },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        console.log('CREDENTIALS', credentials);
        const { username, password } = credentials;
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_LOGIN_ENDPOINT}`, { username, password });
          if (response.status === 200) {
            console.log('RESPONSE', response.data);
            return Promise.resolve(response.data);
          } else {
            console.log('RESPONSE', 'ERROR');
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET as string,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }