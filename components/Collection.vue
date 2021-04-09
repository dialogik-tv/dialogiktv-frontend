<template>
    <div>
        <div class="mb-3">
            <small><n-link :to="'/collections'" class="text-light">← zurück zu den Sammlungen</n-link></small>
        </div>

        <p v-if="$fetchState.pending" class="text-light text-center py-4 h3">Fetching collection...</p>
        <div v-else-if="$fetchState.error" class="alert alert-danger" role="alert">
            <h2>Error</h2>
            <p class="mb-0">Error fetching collection <code>{{ $fetchState.error.message }}</code></p>
        </div>
        <div v-else>
            <div class="card p-5 text-muted">
                <div>
                    <div v-if="$auth.loggedIn && collection.User.id == $auth.user.id">
                        <div v-if="!editable" class="d-flex">
                            <h1 class="mb-0">{{ collection.title }}</h1>
                            <font-awesome-icon icon="pen" :style="{ color: '#c3c3c3', cursor: 'pointer' }" class="fa-xs align-self-center ml-2" @click="editable = true" />
                        </div>
                        <div v-else @keyup.escape="editable = false">
                            <b-input-group>
                                <b-form-input v-model="collection.title" size="lg" @keyup.enter="updateCollection" autofocus></b-form-input>
                                <b-input-group-append>
                                    <b-button size="lg" text="↲" variant="primary" @click="updateCollection">↲</b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </div>
                    </div>
                    <h1 v-else class="mb-0">{{ collection.title }}</h1>
                    <div class="text-muted">
                        <small>
                            erstellt von <span class="text-dark">{{ collection.User.username }}</span>
                            {{ $moment(collection.createdAt).fromNow() }}
                        </small>
                    </div>
                    <div v-if="collection.description" class="my-4">
                        <p v-if="!editable" v-html="$md.render(collection.description)" class="lead mb-0"></p>
                        <textarea-autosize v-else
                            @keyup.ctrl.enter="updateCollection"
                            class="form-control"
                            v-model="collection.description"
                        />
                    </div>

                    <div v-if="$auth.loggedIn && $auth.user.id === this.collection.UserId">
                        <div v-if="manageable" class="bg-primary text-light d-flex justify-content-between mb-1 p-3">
                            <div>
                                <small>Tools hinzufügen/entfernen</small>
                                <input v-model="filter.term" @keyup.esc="filter.term = null" type="text" class="form-control form-control-sm d-inline w-auto" placeholder="Suche" />
                            </div>
                            <font-awesome-icon icon="times-circle" :style="{ cursor: 'pointer' }" class="fa-xs align-self-center ml-2" @click="manageable = false" />
                        </div>
                        <button v-else @click="manageable = true" class="btn btn-sm btn-primary">Tools hinzufügen/entfernen <font-awesome-icon icon="cog" :style="{ cursor: 'pointer' }" class="fa-xs align-self-center ml-2" /></button>

                        <div v-if="manageable" class="row">
                            <div class="col-md-6">
                                <ul class="list-group">
                                    <li v-for="tool in filteredTools" :key="tool.id" class="list-group-item text-dark d-flex justify-content-between p-0">
                                        <small class="p-1">
                                            {{ tool.title }}
                                        </small>
                                        <div class="tool-toogle-button-holder">
                                            <button v-if="!tool.added" @click="addToolToCollection(tool)" class="btn btn-sm btn-danger">+</button>
                                            <button v-else @click="removeToolFromCollection(tool)" class="btn btn-sm btn-success">-</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="my-3">
                        <div>
                            <div v-for="tool in this.collection.Tools" :key="tool.id" class="list-group">
                                <div class="list-group-item mb-3">
                                    <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
                                    <div>
                                        <div class="d-flex justify-content-between">
                                            <n-link :to="`/tool/${tool.slug}`"><h5 class="card-title">{{ tool.title }}</h5></n-link>
                                            <button v-if="$auth.loggedIn && $auth.user.id === collectionOwnerId" @click="removeToolFromCollection(tool)" class="btn btn-sm btn-success">aus Sammlung entfernen</button>
                                        </div>
                                        
                                        <div v-if="tool.description" v-html="$md.render(tool.description)" class="collection-description card-text text-muted"></div>
                                    </div>
                                    <ul class="pl-0">
                                        <li class="d-inline" v-for="tag in tool.Tags" :key="tag.name">
                                            <n-link :to="`/tag/${tag.name}`" class="badge badge-secondary mr-1">{{ tag.name }}</n-link>
                                        </li>
                                    </ul>
                                    <!-- <div class="card-body">
                                        <n-link :to="`/tool/${tool.slug}`">ansehen</n-link>
                                    </div> -->
                                </div>
                            </div>
                        </div>
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
            collection: {
                title: 'Sammlung',
                description: 'Beschreibung'
            },
            editable: false,
            manageable: false,
            tools: [],
            filter: {
                term: null
            },
        };
    },
    mounted() {
        this.fetchTools();
    },
    async fetch() {
        const id  = this.$route.params.id;
        const url = `${process.env.API_URL}/collection/${id}`;
        const { data } = await this.$axios.get(url);
        const names = [];
        for(const [key, value] of Object.entries(data.Tools)) {
            names.push(value.title);
        }

        for(const [key, value] of Object.entries(this.tools)) {
            if(names.indexOf(value.title) !== -1) {
                value.added = true;
            }
        }
        this.collection = data;
    },
    methods: {
        async fetchTools() {
            const url = `${process.env.API_URL}/tools`;
            const { data } = await this.$axios.get(url);
            for(const [key, value] of Object.entries(data)) {
                value.added = false;
            }
            this.tools = data;
        },
        async addToolToCollection(tool) {
            const url = `${process.env.API_URL}/collection/add`;
            try {
                const { status, data } = await this.$axios.post(url, {
                    tool: tool.id,
                    collection: this.collection.id
                });
                if(status == 200) {
                    this.collection.Tools.unshift(tool);
                    tool.added = true;
                }
            } catch (e) {
                const text = 'Error adding tool to tutorial';
                alert(text);
                console.error(text, e);
            }
        },
        async removeToolFromCollection(tool) {
            const url = `${process.env.API_URL}/collection/remove`;
            try {
                const { status, data } = await this.$axios.post(url, {
                    tool: tool.id,
                    collection: this.collection.id
                });
                if(status == 200) {
                    for(const [key, value] of Object.entries(this.collection.Tools)) {
                        if(value.title == tool.title) {
                            this.collection.Tools.splice(key, 1);
                        }
                    }
                    tool.added = false;
                }
            } catch (e) {
                const text = 'Error removing tool from tutorial';
                alert(text);
                console.log(error, e);
            }
        },
        async updateCollection() {
            const title = this.collection.title;
            const description = this.collection.description;
            const url = `${process.env.API_URL}/collection/edit/${this.collection.id}`;
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
    computed: {
        collectionOwnerId() {
            return this.collection.UserId;
        },
        filteredTools() {
            return this.tools.filter(tool => {
                if(this.filter.term == null || this.filter.term == '') {
                    return;
                }

                // Check if term is in title
                let inTitle = tool.title.toLowerCase().indexOf(this.filter.term.toLowerCase()) > -1;

                // Check if term is in vendor name
                let inVendor = false;
                if(tool.vendor != null) {
                    inVendor = tool.vendor.toLowerCase().indexOf(this.filter.term.toLowerCase()) > -1;
                }

                // Check if term is in tags
                let inTags = false;
                for (var i = 0; i < tool.Tags.length; i++) {
                    if (tool.Tags[i].name.toLowerCase().indexOf(this.filter.term.toLowerCase()) > -1) {
                        inTags = true;
                        break;
                    }
                }

                return inTitle || inVendor || inTags;
            })
        }
    },
    head () {
        return {
            title: `${this.collection.title} auf dialogikTV`,
            meta: [
                { hid: 'og:title', name: 'og:title', content: `${this.collection.title} auf dialogikTV` },
                { hid: 'og:description', name: 'og:description', content: this.collection.description },
            ]
        }
    }
}
</script>

<style scoped>
.tool-toogle-button-holder > button {
    width: 30px;
}

.collection-description {
    font-size: .8em;
}
</style>
