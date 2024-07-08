import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/db/db";
import { compare } from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        let existingUser;

        try {
          existingUser = await db.user.findFirst({
            where: {
              username: credentials.username,
            },
          });
        } catch (err) {
          console.log(err);
          return true;
        }

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          id: parseInt(user.id),
        };
      }
      return token;
    },
    async session({ session, token }) {
      const output = {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          id: parseInt(token.id),
        },
      };
      return output;
    },
  },
  pages: {
    signIn: "/user",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
