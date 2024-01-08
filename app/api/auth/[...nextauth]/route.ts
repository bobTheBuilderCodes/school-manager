import { api } from "@/services/endpoints";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions : AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
       
      },

      async authorize(credentials: any, req) {
        const {username, password} = credentials
        const res = await fetch(api.login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password
          }),
        });

        const user = await res.json();

        if (user) {
          
            return user;
            
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.VERCEL ,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      if (token) {
        session.user.rollId = token.rollId;
        session.user.loggedInUser = token.loggedInUser;
        session.user.userRole = token.userRole;
        session.user.accessToken = token.accessToken
        session.user.userId = token.userId
        // session.user.class = token.cla
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };