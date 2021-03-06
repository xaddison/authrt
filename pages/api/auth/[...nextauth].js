import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

// import Adapters from 'next-auth/adapters'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Providers.Auth0({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      domain: process.env.AUTH0_DOMAIN,
      protection: 'pkce'
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET
    }),
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        if (credentials.password === 'password') {
          return {
            id: 1,
            name: 'Fill Murray',
            email: 'bill@fillmurray.com',
            image: 'https://www.fillmurray.com/64/64'
          }
        }
        return null
      }
    })
  ],
  jwt: {
    encryption: true,
    secret: process.env.SECRET
  },
  debug: false,
  theme: 'auto'

  // Default Database Adapter (TypeORM)
  // database: process.env.DATABASE_URL

  // Prisma Database Adapter
  // To configure this app to use the schema in `prisma/schema.prisma` run:
  // npx prisma generate
  // npx prisma migrate dev --preview-feature
  // adapter: Adapters.Prisma.Adapter({ prisma })
})
