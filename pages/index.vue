<template>
    <div>
        <b-container id="landing">
            <b-row>
                <b-col cols="12" lg="6" class="teaser-text">
                    <n-link :to="'/tools'" class="text-light">
                        Wir schaffen Durchblick im App-Dschungel für Streamer und Inhaltserzeuger →
                    </n-link>
                </b-col>
                <b-col cols="12" lg="6" class="mt-5 mt-md-0 p-0">
                    <n-link :to="'/tools'"><img class="img-fluid teaser-picture" src="/tools-musik-dmca.gif" alt="Screenshot von der Tools-Übersicht" /></n-link>
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid class="bg-light text-dark">
            <b-container>
                <b-row>
                    <b-col cols="12" md="6" class="teaser-text">
                        <n-link :to="'/tools/value-chain'" class="text-dark">
                            Für die Profis: wir haben die Tools mal auf die Wertschöpfungskette der Inhaltserzeugung gelegt →
                            <!-- <button class="btn btn-light btn-lg"></button> -->
                        </n-link>
                    </b-col>
                    <b-col cols="12" md="6" class="mt-5 mt-md-0 p-0">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe
                                class="embed-responsive-item"
                                src="https://player.twitch.tv/?video=791753769&parent=dialogik.tv&autoplay=false"
                                frameborder="0"
                                scrolling="no"
                                height="720"
                                width="1280"
                                allowfullscreen="true">
                            </iframe>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </b-container>
        <b-container>
            <div>
                <h2 class="display-2">Tutorials</h2>
                <n-link :to="'/tutorials'" class="text-light teaser-text">helfen euch, die hier zu findenden Apps, Tools und Scripte erfolgreich einsetzen zu können →</n-link>
            </div>
        </b-container>
        <b-container fluid class="bg-light text-dark">
            <b-container>
                <div>
                    <h2 class="display-2">Sammlungen</h2>
                    <n-link :to="'/collections'" class="text-dark teaser-text">sind thematische Zusammenstellungen von ausgewählten Apps, Tools und Scripten →</n-link>
                </div>
            </b-container>
        </b-container>
        <b-container>
            <div class="text-center">
                <div class="teaser-text">Folge uns und vernetze dich!</div>
                <div class="mt-5">
                    <a target="_blank" href="https://twitter.com/dialogikTV"><font-awesome-icon :icon="['fab', 'twitter']" class="fa-3x text-light mx-2" /></a>
                    <a target="_blank" href="https://www.twitch.tv/dialogikTV"><font-awesome-icon :icon="['fab', 'twitch']" class="fa-3x text-light mx-2" /></a>
                    <a target="_blank" href="https://www.youtube.com/channel/UC3_VXw2npQMGZwfqMXuHRdA"><font-awesome-icon :icon="['fab', 'youtube']" class="fa-3x text-light mx-2" /></a>
                    <a target="_blank" href="https://discord.com/invite/EB6BQPf"><font-awesome-icon :icon="['fab', 'discord']" class="fa-3x text-light mx-2" /></a>
                </div>
            </div>
        </b-container>
        <b-container fluid class="bg-light text-dark">
            <b-container>
                <b-col cols="8" class="text-center">
                    <h2 class="display-2">Mach mit!</h2>
                    <p class="teaser-text-small">
                        <n-link :to="'/register'">Registrier' dich doch gleich</n-link> und fülle unsere Datenbank
                        mit deinen Lieblingstools. Fragen, Kritik, Anmerkungen kannst du gerne per
                        <span class="text-nowrap"><a target="_blank" href="https://twitter.com/dialogikTV"><font-awesome-icon :icon="['fab', 'twitter']" /> Twitter</a></span>,
                        <span class="text-nowrap"><a target="_blank" href="https://www.twitch.tv/dialogikTV"><font-awesome-icon :icon="['fab', 'twitch']" /> Twitch</a></span> oder im
                        <span class="text-nowrap"><a target="_blank" href="https://discord.com/invite/EB6BQPf"><font-awesome-icon :icon="['fab', 'discord']" /> Discord</a></span>
                        an uns richten.
                    </p>
                    <p class="teaser-text-small mb-0">Als Developer kannst du einen Blick in unseren <a target="_blank" href="https://www.github.com/dialogik-tv">Quellcode auf <span class="text-nowrap"><font-awesome-icon :icon="['fab', 'discord']" /> github</span></a> werfen, Bugs finden, Issues melden, Pull Requests einreichen oder einfach nur im Code stöbern.</p>
                </b-col>
            </b-container>
        </b-container>
    </div>
</template>

<script>
export default {
    layout: 'landing'
}
</script>

<style scoped>
.container, .container-fluid {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container a {
    text-decoration: none;
}

#landing {
    /* Subtract navbar (47px) from first container */
    min-height: calc(100vh - 56px);
}

.teaser-text {
    font-size: 3.3rem;
    font-weight: 300;
    line-height: 1.2;
}

.teaser-text-small {
    font-size: 1.5rem;
    font-weight: 300;
}

/* SM and smaller */
@media(max-width: 575.98px) {
    .teaser-text {
        font-size: 2rem;
        /* font-weight: 300; */
        /* line-height: 1.2; */
    }
}

</style>
