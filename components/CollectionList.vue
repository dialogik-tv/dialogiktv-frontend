<template>
    <div>
        <div v-if="$auth.loggedIn">
            <div class="row">
                <div class="col-lg-8">
                    <h1 class="display-1">Sammlungen</h1>
                    <p class="lead">Hier findet ihr Sammlungen ausgewählter <n-link :to="'/tools'">Tools, Apps und Scripte</n-link>.</p>
                </div>
                <div class="col-md my-5 my-lg-0 text-right">
                    <n-link :to="'/collection/new'" class="btn btn-primary text-light">
                        <font-awesome-icon icon="plus-circle" class="text-light mr-1" /> Sammlung hinzufügen
                    </n-link>
                </div>
            </div>
        </div>
        <div v-else>
            <h1 class="display-1">Sammlungen</h1>
            <p class="lead">Hier findet ihr Sammlungen ausgewählter <n-link :to="'/tools'">Tools, Apps und Scripte</n-link>.</p>
        </div>

        <p v-if="$fetchState.pending" class="text-light text-center py-5 h3">Fetching collections...</p>
        <div v-else-if="$fetchState.error" class="alert alert-danger" role="alert">
            <h2>Error</h2>
            <p class="mb-0">Error fetching collections <code>{{ $fetchState.error.message }}</code></p>
        </div>
        <div v-else>
            <div class="text-right">
                <button @click="$fetch" class="btn btn-sm btn-secondary"><font-awesome-icon icon="sync-alt" class="text-light" /></button>
            </div>
            <ul class="list-group text-muted">
                <li v-for="collection in collections" :key="collection.id" class="list-group-item d-flex justify-content-between py-3">
                    <div>
                        <n-link :to="`/collection/${collection.id}`">
                            {{ collection.title }}
                        </n-link>
                        <div class="mt-1">
                            <span v-for="tool in collection.Tools" class="mr-1 h5">
                                <n-link :to="`/tool/${tool.slug}`" class="badge badge-primary">{{ tool.title }}</n-link>
                            </span>
                        </div>
                    </div>
                    <div>
                        <span class="text-muted"><small><font-awesome-icon icon="eye" class="mr-1" /> {{ collection.views }}</small></span>
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
            collections: []
        }
    },
    async fetch() {
        let url = `${process.env.API_URL}/collections`;
        const { data } = await this.$axios.get(url);
        this.collections = data;
    },
    head () {
        return {
            title: 'Sammlungen von Tools, Apps und Scripten für Streamer und Inhaltserzeuger'
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
