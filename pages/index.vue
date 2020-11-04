<template>
    <div>
        <div id="landing" class="container">
            <div>
                <LogoDark />
                <h2 class="font-weight-light mt-5 mx-5 px-5">
                    <n-link :to="'/tools'" class="text-light">Tools, Apps, Scripte</n-link> und
                    <n-link :to="'/tutorials'" class="text-light">Tutorials</n-link>
                    für Streamer und Inhaltserzeuger
                </h2>
                <div class="mt-5">
                    <a target="_blank" href="https://twitter.com/dialogikTV"><font-awesome-icon :icon="['fab', 'twitter']" class="fa-3x text-light mx-2" /></a>
                    <a target="_blank" href="https://www.twitch.tv/dialogikTV"><font-awesome-icon :icon="['fab', 'twitch']" class="fa-3x text-light mx-2" /></a>
                    <a target="_blank" href="https://www.youtube.com/channel/UC3_VXw2npQMGZwfqMXuHRdA"><font-awesome-icon :icon="['fab', 'youtube']" class="fa-3x text-light mx-2" /></a>
                    <a target="_blank" href="https://discord.com/invite/EB6BQPf"><font-awesome-icon :icon="['fab', 'discord']" class="fa-3x text-light mx-2" /></a>
                </div>
            </div>
        </div>
        <div class="container-fluid jumbotron text-dark">
            <span class="display-2">
                ...
            </span>
        </div>
    </div>
</template>

<script>
import LogoDark from '~/components/LogoDark.vue';

export default {
    layout: 'landing',
    components: {
        LogoDark
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
    /* Subtract navbar (47px) from first container */
    min-height: calc(100vh - 47px);
}

#landing a {
    text-decoration: underline;
}

.links {
    padding-top: 15px;
}
</style>
