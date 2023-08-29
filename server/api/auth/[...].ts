import GoogleProvider from 'next-auth/providers/google';
import { NuxtAuthHandler } from "#auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import  prisma  from '../../../lib/prisma'

export default NuxtAuthHandler({
    session: {
      strategy: 'jwt'
    },
    // secret needed to run nuxt-auth in production mode (used to encrypt data)
    secret: process.env.NUXT_SECRET,
    callbacks: {
      // This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
      jwt: async ({ token }) => {
        const db_user = await prisma.user.findFirst({
          where: {
            email: token?.email,
          },
        });
        console.log({db_user})
        if (db_user) {
          //find user in db and put id in the token from provider
          token.id = db_user.id;
        }
        return token;
      },
      session: ({ session, token, user }) => {
        // console.log({session, token, user})
        if (token) {
          // pass token info to session to access it in the client
          session.user.id = token.id;
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.image = token.picture;
        }
        console.log({session, user})

        return session;
      },
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
        GoogleProvider.default({
            clientId: process.env.GOOGLE_CLIENT_ID as String,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as String
        }),
    ]
})
