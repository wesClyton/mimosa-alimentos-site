import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password"},
      },
      async authorize(credentials) {

        console.log("credentials: ", credentials);

        const response = await fetch('http://localhost:3000/login', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password
					})
				});

				const user = await response.json()

				if (user && response.ok) {
					return user
				}

				return null
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {

      const customUser = user as unknown as any;

      if(user) {
        return {
          ...token,
           sub: user.id,
           email: user.email,
           name: user.name,
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email
        }
      }
    }
  },
  pages: {
    signIn: "/auth/login"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
