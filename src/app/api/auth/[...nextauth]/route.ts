// import NextAuth from "next-auth/next"
// import { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { cookies } from "next/headers"

// const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60, // 4 hours
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Senha", type: "password" },
//       },
//       async authorize(credentials) {
//         const cookesStore = cookies()

//         const response = await fetch(`${process.env.API_URL}/login`, {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify({
//             email: credentials?.email,
//             password: credentials?.password,
//           }),
//         })

//         const user = await response.json()

//         if (user && response.ok) {
//           cookesStore.set(`token`, user.access_token)
//           return user
//         }

//         return null
//       },
//     }),
//   ],
//   callbacks: {
//     jwt: ({ token, user }) => {
//       if (user) {
//         return {
//           ...token,
//           sub: user.id,
//           email: user.email,
//           name: user.name,
//         }
//       }

//       return token
//     },
//     session: async ({ session, token }) => {
//       return {
//         ...session,
//         user: {
//           name: token.name,
//           email: token.email,
//         },
//       }
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }

import { Session } from "inspector"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        const response = await fetch(`${process.env.API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        })

        const user = await response.json()

        if (user && response.ok) {
          return user
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        ...token,
      }
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
