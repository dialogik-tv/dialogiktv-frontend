<template>
    <div>
        <div>
            <h2 v-if="$fetchState.pending" class="text-muted mt-5">Fetching similar tools...</h2>
            <div v-else-if="$fetchState.error" class="alert alert-danger" role="alert">
                <h2 class="mt-5">Error</h2>
                <p class="mb-0">Error fetching similar tools <code>{{ $fetchState.error.message }}</code></p>
            </div>
            <div v-else>
                <div v-if="similarTools.length > 0">
                    <h2 class="mt-5">Ähnliche Tools</h2>
                    <b-row>
                        <b-col cols="4" v-for="tool in similarTools" :key="tool.tool.id" class="mb-2">
                            <b-card text-variant="dark" class="similar-tools-card p-1" body-class="p-3" footer-tag="footer" footer-class="text-right border-0 pt-0 pb-1">
                                <b-card-title class="h5"><n-link :to="`/tool/${tool.tool.slug}`">{{ tool.tool.title }}</n-link></b-card-title>
                                <b-card-text class="similar-tools-card-text" v-if="tool.tool.description && tool.tool.description.length > 0">
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

                <h2 class="mt-5">Weitere Tools</h2>
                <b-row>
                    <b-col cols="4" v-for="tool in otherTools" :key="tool.tool.id" class="mb-2">
                        <b-card text-variant="dark" class="similar-tools-card p-1" body-class="p-3" footer-tag="footer" footer-class="text-right border-0 pt-0 pb-1">
                            <b-card-title class="h5"><n-link :to="`/tool/${tool.tool.slug}`">{{ tool.tool.title }}</n-link></b-card-title>
                            <b-card-text class="similar-tools-card-text" v-if="tool.tool.description && tool.tool.description.length > 0">
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            tools: []
        }
    },
    props: {
        toolId: {
            type: String,
            required: true
        }
    },
    computed: {
        similarTools() {
            return this.tools.similarTools.filter(function(tool) {
                return (tool.similarity > 0);
            }).slice(0,6);
        },
        otherTools() {
            return _.shuffle(this.tools.similarTools.filter(function(tool) {
                return (tool.similarity < 1);
            })).slice(0,6);
        }
    },
    async fetch() {
        try {
            const url = `${process.env.API_URL}/tool/similar/${this.toolId}`;
            const { data } = await this.$axios.get(url);
            this.tools = data;
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