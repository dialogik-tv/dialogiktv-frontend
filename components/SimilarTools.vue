<template>
    <div>
        <p v-if="$fetchState.pending" class="text-light text-center py-4 h3">Fetching similar tools...</p>
        <div v-else-if="$fetchState.error" class="alert alert-danger" role="alert">
            <h2>Error</h2>
            <p class="mb-0">Error fetching similar tools <code>{{ $fetchState.error.message }}</code></p>
        </div>
        <div v-else>
            <b-row>
                <b-col cols="4" v-for="tool in similarTools.similarTools.slice(0,6)" :key="tool.tool.id" class="mb-2">
                    <b-card text-variant="dark" class="similar-tools-card p-1" body-class="p-3" footer-tag="footer" footer-class="text-right border-0 pt-0 pb-1">
                        <b-card-title class="h5"><n-link :to="`/tool/${tool.tool.slug}`">{{ tool.tool.title }}</n-link></b-card-title>
                        <b-card-text class="similar-tools-card-text" v-if="tool.tool.description.length > 0">
                            <small v-if="tool.tool.description.length < 100">{{ tool.tool.description }}</small>
                            <small v-else>{{ tool.tool.description.slice(0, 100) }}...</small>
                        </b-card-text>
                        <template #footer>
                            <n-link class="link-arrow" :to="`/tool/${tool.tool.slug}`">→</n-link>
                        </template>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            similarTools: []
        }
    },
    props: {
        toolId: {
            type: String,
            required: true
        }
    },
    async fetch() {
        try {
            const url = `${process.env.API_URL}/tool/similar/${this.toolId}`;
            const { data } = await this.$axios.get(url);
            this.similarTools = data;
        } catch (e) {
            console.log(e);
        }
    },
}
</script>

<style scoped>
.similar-tools-card {
    height: 100%;
}

.similar-tools-card-text {
    line-height: initial;
}

.link-arrow {
    text-decoration: none;
}
</style>