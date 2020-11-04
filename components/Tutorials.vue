<template>
    <div>
        <div class="d-flex justify-content-between">
            <h1 class="display-1">Tutorials</h1>
            <!-- <div v-if="$auth.loggedIn">
                <n-link :to="'/tutorial/new'" class="btn btn-primary text-light">
                    <font-awesome-icon icon="plus-circle" class="text-light mr-1" /> Tutorial hinzufügen
                </n-link>
            </div> -->
        </div>

        <div class="row mb-3">
            <div class="col-md-8">
                <p class="lead">Hier findet ihr Tutorials, die euch erklären, wie bestimmte Anwendungen oder Prozesse im Bereich des Streamings und des Inhalteerzeugens funktionieren.</p>
            </div>
        </div>

        <p v-if="$fetchState.pending" class="text-light text-center py-5 h3">Fetching tutorials...</p>
        <div v-else-if="$fetchState.error" class="alert alert-danger" role="alert">
            <h2>Error</h2>
            <p class="mb-0">Error fetching tutorials <code>{{ $fetchState.error.message }}</code></p>
        </div>
        <div v-else>
            <div class="text-right">
                <button @click="$fetch" class="btn btn-sm btn-secondary"><font-awesome-icon icon="sync-alt" class="text-light" /></button>
            </div>
            <ul class="list-group text-muted">
                <li v-for="tutorial in tutorials" :key="tutorial.id" class="list-group-item d-flex justify-content-between py-3">
                    <div>
                        <n-link :to="`/tutorial/${tutorial.id}`">
                            {{ tutorial.title }}
                        </n-link>
                        <div class="mt-1">
                            <span v-for="tool in tutorial.Tools" class="mr-1 h5">
                                <n-link :to="`/tool/${tool.slug}`" class="badge badge-primary">{{ tool.title }}</n-link>
                            </span>
                        </div>
                    </div>
                    <div>
                        <span class="text-muted"><small><font-awesome-icon icon="eye" class="mr-1" /> {{ tutorial.views }}</small></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tutorials: []
        }
    },
    async fetch() {
        let url = `${process.env.API_URL}/tutorials`;
        const { data } = await this.$axios.get(url);
        this.tutorials = data;
    },
    head () {
        return {
            title: 'Tutorials für Streamer und Inhaltserzeuger'
        }
    }
}
</script>

<style scoped>
.fetching {
    animation: 0.5s appear;
    margin: auto;
}

@keyframes appear {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
