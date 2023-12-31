// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/i18n',
        '@nuxt/content',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: '@use "~/assets/_colors.sass" as *'
                }
            }
        }
    },
    runtimeConfig: {
        public: {
            API: 'https://ima.api.kaiser.fyi'
        }
    },
    i18n: {
        baseUrl: 'https://meistersingerakademie.com',
        locales: [
            {
                code: 'en',
                iso: 'en-US'
            },
            {
                code: 'de',
                iso: 'de-DE'
            }
        ],
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
        },
        defaultLocale: 'de'
    },
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },
    typescript: {
        typeCheck: true
    }
})