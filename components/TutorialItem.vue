<template>
    <div>
        <div class="mb-3">
            <small><n-link :to="'/tutorials'" class="text-light">← zurück zu den Tutorials</n-link></small>
        </div>

        <p v-if="$fetchState.pending" class="text-light text-center py-4 h3">Fetching tutorial...</p>
        <div v-else-if="$fetchState.error" class="alert alert-danger" role="alert">
            <h2>Error</h2>
            <p class="mb-0">Error fetching tutorial <code>{{ $fetchState.error.message }}</code></p>
        </div>
        <div v-else>
            <div class="card p-5 text-muted">
                <div>
                    <div v-if="$auth.loggedIn && tutorial.User.id == $auth.user.id">
                        <div v-if="!editable" class="d-flex">
                            <h1 class="mb-0">
                                {{ tutorial.title }}
                                <small v-if="tutorial.status < 50" class="badge badge-info">{{ tutorial.statusName }}</small>
                            </h1>
                            <font-awesome-icon icon="pen" :style="{ color: '#c3c3c3', cursor: 'pointer' }" class="fa-xs align-self-center ml-2" @click="editable = true" />
                        </div>
                        <div v-else @keyup.escape="editable = false">
                            <b-input-group>
                                <b-form-input v-model="tutorial.title" size="lg" @keyup.enter="updateTutorial" autofocus></b-form-input>
                                <b-input-group-append>
                                    <b-button size="lg" text="↲" variant="primary" @click="updateTutorial">↲</b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </div>
                    </div>
                    <h1 v-else class="mb-0">
                        {{ tutorial.title }}
                        <small v-if="tutorial.status < 50" class="badge badge-info">{{ tutorial.statusName }}</small>
                    </h1>
                    <div class="text-muted">
                        <small>
                            erstellt von <span class="text-dark">{{ tutorial.User.username }}</span>
                            {{ $moment(tutorial.createdAt).fromNow() }}
                        </small>
                    </div>
                    <div class="mb-3">
                        <span v-for="tool in tutorial.Tools" class="h3">
                            <n-link :to="`/tool/${tool.slug}`" class="badge badge-primary mr-1">{{ tool.title }}</n-link>
                        </span>
                    </div>
                </div>
                <div v-if="tutorial.link" class="text-muted text-center mt-5">
                    <a class="btn btn-lg btn-outline-secondary" target="_blank" :href="tutorial.link">zum Tutorial ↗</a>
                </div>

                <div v-if="tutorial.description">
                    <div v-if="!editable" class="border mt-5 p-3">
                        <p v-html="$md.render(tutorial.description)" class="lead mb-0"></p>
                    </div>
                    <div v-else @keyup.ctrl.enter="updateTutorial" class="mt-5">
                        <textarea-autosize
                            class="form-control"
                            v-model="tutorial.description"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tutorial: {
                title: 'Tutorial',
                description: 'Beschreibung'
            },
            editable: false
        };
    },
    async fetch() {
        const id  = this.$route.params.id;
        const url = `${process.env.API_URL}/tutorial/${id}`;
        const { data } = await this.$axios.get(url);
        this.tutorial = data;
    },
    methods: {
        async updateTutorial() {
            const title = this.tutorial.title;
            const description = this.tutorial.description;
            const url = `${process.env.API_URL}/tutorial/edit/${this.tutorial.id}`;
            try {
                const { status, data } = await this.$axios.patch(url, {
                    title: title,
                    description: description
                })
            } catch(e) {
                console.error('Error', e);
            }
            this.editable = false;
        }
    },
    head () {
        return {
            title: `${this.tutorial.title} auf dialogikTV`,
            meta: [
                { hid: 'og:title', name: 'og:title', content: `${this.tutorial.title} auf dialogikTV` },
                { hid: 'og:description', name: 'og:description', content: this.tutorial.description },
            ]
        }
    },
}
</script>

<style scoped>
.tool-list {
    list-style-type: none;
}
</style>
