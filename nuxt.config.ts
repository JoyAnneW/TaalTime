// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'
  ],
  auth: {
    globalAppMiddleware: true,
    baseURL: process.env.NUXT_PUBLIC_API_URL,
    provider: {
      type: 'authjs',
      endpoints: {
      },
      pages: {
        // login: '/signin'
      },
      token: {
        signInResponseTokenPointer: '/accessToken'
      },
      sessionDataType: {}
    },
    enableSessionRefreshPeriodically: 5000,
    enableSessionRefreshOnWindowFocus: true,
    globalMiddlewareOptions: {
      allow404WithoutAuth: true, // Defines if the 404 page will be accessible while unauthenticated
      addDefaultCallbackUrl: '/' // Where authenticated user will be redirected to by default
    }
  }
})
