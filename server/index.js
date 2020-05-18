const express = require('express')
const secure = require('express-force-https')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Force SSL/HTTPS
app.use(secure)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

console.log('srv-TZ', process.env.TZ);
console.log('srv-HOST', process.env.HOST);
console.log('srv-NODE_ENV', process.env.NODE_ENV);
console.log('srv-API_BASE', process.env.API_BASE);

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    await nuxt.ready()
    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}
start()
