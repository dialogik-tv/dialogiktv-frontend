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
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
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
