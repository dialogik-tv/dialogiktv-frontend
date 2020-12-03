require("dotenv").config();

const ssl = require('redirect-ssl')

module.exports = {
    ssr: false,
    /*
     ** Headers of the page
     */
    head: {
        htmlAttrs: {
            lang: 'de',
        },
        title: 'dialogikTV',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: 'Tools und Tutorials für Streamer und Inhaltserzeuger'
            },
            { name: 'msapplication-TileColor', content: '#ffffff' },
            { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
            { name: 'theme-color', content: '#ffffff' },
            { hid: 'og:url', property: 'og:url', content: 'https://dialogik.tv' },
            { hid: 'og:title', property: 'og:title', content: 'dialogikTV' },
            { hid: 'og:image', property: 'og:image', content: '/favicon-96x96.png' },
            { hid: 'og:type', property: 'og:type', content: 'website' },
            {
                hid: 'og:description',
                property: 'og:description',
                content: 'Tools und Tutorials für Streamer und Inhaltserzeuger'
            },
            { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
            { hid: 'twitter:site', name: 'twitter:site', content: '@dialogikTV' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
            { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
            { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
            { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
            { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
            { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
            { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#00acee' },
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/textarea-autosize.js',
        '@/plugins/lodash.js',
        '@/plugins/vuelidate.js'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        '@nuxtjs/moment',
        '@nuxtjs/fontawesome',
        ['@nuxtjs/google-analytics', {
            id: 'UA-166264943-2'
        }]
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        // Doc: https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv',
        // Doc: https://auth.nuxtjs.org
        '@nuxtjs/auth',
        '@nuxtjs/markdownit'
    ],
    module: {
        rules: [
            {
               test: /\.s[ac]ss$/i,
               use: ['style-loader','css-loader','sass-loader',],
             },
        ],
    },
    bootstrapVue: {
        bootstrapCSS: false,
        bootstrapVueCSS: false
    },
    css: ['@/assets/scss/custom.scss'],
    /*
     ** dotenv
     */
    env: {
        TZ: process.env.TZ,
        API_URL: process.env.API_URL
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Authentication configuration
     */
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/login', method: 'post', propertyName: 'token' },
                    logout: false,
                    user: { url: '/user/me', method: 'get', propertyName: false }
                }
            }
        }
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    },
    /*
     ** Moment.js configuration
     */
    moment: {
        locales: ['de'],
        defaultLocale: 'de',
        timezone: {
            startYear: 2015,
            endYear: 2030
        },
        defaultTimezone: 'Europe/Berlin'
    },
    /*
     ** Fontawesome configuration
     */
    fontawesome: {
        icons: {
            solid: [
                'faSearch', 'faSyncAlt', 'faTimesCircle', 'faPlusCircle',
                'faEye', 'faDownload', 'faPen', 'faCog', 'faSortAmountDown',
                'faSortAmountDownAlt', 'faCaretRight', 'faCaretDown'
            ],
            // regular: [
            //     'faAdjust'
            // ],
            brands: [
                'faTwitch', 'faYoutube', 'faDiscord', 'faTwitter', 'faGithub'
            ]
        }
    },
    /*
     ** Markdown configuration
     ** https://github.com/markdown-it/markdown-it#init-with-presets-and-options
     ** and https://markdown-it.github.io/markdown-it/#MarkdownIt.new
     */
    markdownit: {
        injected: true,
        // preset: 'default',
        linkify: true,
        // breaks: true,
        // use: [
        //     'markdown-it-div',
        //     'markdown-it-attrs'
        // ]
    },
    /*
     ** Force SSL configuration
    */
    serverMiddleware: [
        ssl.create({
            enabled: process.env.NODE_ENV === 'production'
        })
    ],
    telemetry: false
}
