import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null
        }

        // ⚠️ DEMO ONLY
        if (
          credentials.username === "admin" &&
          credentials.password === "123456"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
          }
        }

        return null
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
})

export { handler as GET, handler as POST }
