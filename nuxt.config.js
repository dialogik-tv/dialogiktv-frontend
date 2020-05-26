require("dotenv").config();

module.exports = {
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            },
            { name: 'msapplication-TileColor', content: '#ffffff' },
            { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
            { name: 'theme-color', content: '#ffffff' }
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
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        '@nuxtjs/moment',
        '@nuxtjs/fontawesome'
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
        '@nuxtjs/auth'
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
    axios: {
        https: true
    },
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
            solid: ['faSearch', 'faSyncAlt'],
            // regular: [],
            // brands: []
        }
    }
}
