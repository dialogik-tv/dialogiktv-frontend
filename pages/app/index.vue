<template>
    <div>
        <navbar />
        <div class="container">
            <div>
                <logo />
                <h1 class="title">
                    dialogikTV
                </h1>
                <h2 class="subtitle">
                    The dialogikTV Frontend Nuxt.js application
                </h2>
                <div class="links">
                    <a href="https://nuxtjs.org/" target="_blank" class="button--green">
                        Documentation
                    </a>
                    <a
                        href="https://github.com/nuxt/nuxt.js"
                        target="_blank"
                        class="button--grey"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </div>
        <div class="container-fluid jumbotron">
            <span class="display-2">What is up?</span>
        </div>
    </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Logo from '~/components/Logo.vue';

export default {
    components: {
        Navbar,
        Logo
    }
}
</script>

<style>
.container, .container-fluid {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
