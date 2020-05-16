<template>
    <div class="mt-5 pt-5">
        <h1>Tools</h1>
        <p v-if="$fetchState.pending">Fetching posts...</p>
        <p v-else-if="$fetchState.error">Error while fetching tools: {{ $fetchState.error.message }}</p>
        <ul v-else class="list-group">
            <li class="list-group-item" v-for="tool of tools" :key="tool.slug">
                <n-link :to="`/app/tool/${tool.slug}`">{{ tool.title }}</n-link>
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
        const { data } = await this.$axios.get('https://dialogiktv-api.herokuapp.com/api/tools');
        this.tools = data;
    },
    head () {
        return {
            title: 'Tools, Apps und Scripte für Streamer und Inhaltserzeuger'
        }
    }
}
</script>
