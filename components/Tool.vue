<template>
    <div class="mt-5 pt-3">
        <div class="my-3">
            <n-link :to="'/app/tools'">← zurück zu den Tools</n-link>
        </div>

        <p v-if="$fetchState.pending" class="text-muted">Fetching tool...</p>
        <div v-else-if="$fetchState.error" class="alert alert-danger" role="alert">
            <h2>Error</h2>
            <p class="mb-0">Error fetching tool <code>{{ $fetchState.error.message }}</code></p>
        </div>
        <div v-else>
            <div class="card p-5">
                <div class="row">
                    <div class="col-lg pr-5">
                        <h1 class="mb-0">{{ tool.title }}</h1>
                        <div class="text-muted">
                            <small>
                                erstellt von <span class="text-dark">{{ tool.User.username }}</span>
                                {{ $moment(tool.createdAt).fromNow() }}
                            </small>
                        </div>
                        <div class="mb-3">
                            <span class="badge badge-secondary">Videoproduktion</span>
                            <span class="badge badge-secondary">Broadcasting</span>
                        </div>

                        <p class="lead">{{ tool.description }}</p>
                    </div>
                    <div class="col-lg-3 text-muted">
                        <div v-if="tool.vendor" class="mb-4">
                            <div class="text-muted border-bottom mb-2"><small>Anbieter</small></div>
                            <div><a class="btn btn-sm btn-outline-secondary" target="_blank" v-bind:href="tool.vendorLink">{{ tool.vendor }} ↗</a></div>
                        </div>
                        <div>
                            <div class="text-muted border-bottom mb-2"><small>zum Download</small></div>
                            <a class="btn btn-danger" target="_blank" v-bind:href="tool.link">zum Download ↗</a>
                        </div>
                    </div>
                </div>

            </div>
            <div class="reaction-buttons-holder">
                <button class="btn btn-sm btn-light">😃 <small>6</small></button>
                <button class="btn btn-sm btn-light">🤮 <small>3</small></button>
                <button class="btn btn-sm btn-light">👍 <small>2</small></button>
                <button class="btn btn-sm btn-light">⁉️ <small>1</small></button>
                <button class="btn btn-sm btn-light">❤️ <small>1</small></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tool: {
                title: 'Tool'
            }
        };
    },
    async fetch() {
        const slug = this.$route.params.slug;
        const { data } = await this.$axios.get(`https://dialogiktv-api.herokuapp.com/api/tool/${slug}`);
        this.tool = data;
    },
    head () {
        return {
            title: `${this.tool.title} auf dialogikTV`
        }
    }
}
</script>
