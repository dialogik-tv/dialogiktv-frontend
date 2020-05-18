<template>
    <div class="mt-5 pt-3">
        <h1>Tools</h1>
        <p class="lead mb-5">Hier findet ihr eine umfangreiche Sammlung von Tools, Apps und Scripten, die dir das Streamen und das Inhalteerzeugen erleichtern oder ein bisschen verschönern.</p>
        <p class="text-muted display-4" v-if="$fetchState.pending">Fetching posts...</p>
        <div v-else-if="$fetchState.error" class="alert alert-danger" role="alert">
            <h2>Error</h2>
            <p class="mb-0">Error fetching tools: {{ $fetchState.error.message }}</p>
        </div>
        <ul v-else class="list-group">
            <li class="list-group-item" v-for="tool of tools" :key="tool.slug">
                <n-link :to="`/app/tool/${tool.slug}`">{{ tool.title }} <small class="text-muted">von {{ tool.vendor }}</small></n-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tools: []
        };
    },
    async fetch() {
        console.log('API_BASE', process.env.API_BASE);
        const url = process.env.API_BASE + '/api/tools';
        const { data } = await this.$axios.get(url);
        this.tools = data;
    },
    head () {
        return {
            title: 'Tools, Apps und Scripte für Streamer und Inhaltserzeuger auf dialogikTV'
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
