// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/i18n',
        '@nuxt/content',
        '@nuxtjs/sitemap',
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
            // Overridable at runtime with NUXT_PUBLIC_API (Nitro reads
            // runtimeConfig from env on boot), so repointing the API needs a
            // restart rather than a rebuild.
            API: 'https://api.meistersingerakademie.com'
        }
    },
    i18n: {
        baseUrl: 'https://meistersingerakademie.com',
        locales: [
            { code: 'en', iso: 'en-US' },
            { code: 'de', iso: 'de-DE' },
            { code: 'fr', iso: 'fr-FR' },
            { code: 'es', iso: 'es-ES' },
            { code: 'it', iso: 'it-IT' },
            { code: 'ja', iso: 'ja-JP' },
            { code: 'ko', iso: 'ko-KR' },
            { code: 'zh', iso: 'zh-CN' },
        ],
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
        },
        defaultLocale: 'de',
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