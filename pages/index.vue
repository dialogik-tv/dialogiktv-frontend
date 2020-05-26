<template>
    <div>
        <div id="landing" class="container">
            <div>
                <Logo />
                <h2 class="text-muted font-weight-light mt-5 mx-5 px-5">
                    Tools, Apps, Scripte und Tutorials für Streamer und Inhaltserzeuger
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

.links {
    padding-top: 15px;
}
</style>
