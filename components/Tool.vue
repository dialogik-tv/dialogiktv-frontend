<template>
    <div class="mt-5 pt-5">
        <h1>Tool {{ tool.title }}</h1>
        <div class="my-3">
            <n-link :to="'/app/tools'">← zurück zu den Tools</n-link>
        </div>
        <p v-if="$fetchState.pending">Fetching posts...</p>
        <p v-else-if="$fetchState.error">Error while fetching tools: {{ $fetchState.error.message }}</p>
        <div v-else>
            <div class="card p-5">
                <p class="lead">{{ tool.description }}</p>
                <a target="_blank" v-bind:href="tool.link">Download</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tool: {}
        };
    },
    async fetch() {
        const slug = this.$route.params.slug;
        console.log(slug);
        const { data } = await this.$axios.get(`https://dialogiktv-api.herokuapp.com/api/tool/${slug}`);
        console.log(data);
        this.tool = data;
    },
    head () {
        return {
            title: this.tool.title
        }
    }
}
</script>
