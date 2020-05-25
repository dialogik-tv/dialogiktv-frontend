<template>
    <div>
        <div id="landing" class="container">
            <div>
                <logo />
                <h1 class="title">
                    dialogikTV
                </h1>
                <h2 class="subtitle mx-5 px-5">
                    Tools, Tutorials und News für Streamer und Inhaltserzeuger
                </h2>
            </div>
        </div>
        <div class="container-fluid jumbotron">
            <span class="display-2">What is up?</span>
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
    components: {
        Logo
    }
}
</script>

<style scoped>
.container, .container-fluid {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

#landing {
    /* Subtract navbar from first container */
    min-height: calc(100vh - 56px);
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
