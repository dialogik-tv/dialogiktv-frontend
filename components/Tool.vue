<template>
    <div>
        <div class="mb-3">
            <small><n-link :to="'/tools'" class="text-light">← zurück zu den Tools</n-link></small>
        </div>

        <p v-if="$fetchState.pending" class="text-light text-center py-4 h3">Fetching tool...</p>
        <div v-else-if="$fetchState.error" class="alert alert-danger" role="alert">
            <h2>Error</h2>
            <p class="mb-0">Error fetching tool <code>{{ $fetchState.error.message }}</code></p>
        </div>
        <div v-else>
            <div class="card p-3 p-md-5 text-muted">
                    <div class="row">

                        <!-- Main container -->
                        <div class="col-lg">
                            <!-- Title -->
                            <div v-if="$auth.loggedIn && $auth.user.id == tool.User.id">
                                <div v-if="!editable" class="d-flex">
                                    <h1 class="mb-0">{{ tool.title }}</h1>
                                    <font-awesome-icon icon="pen" :style="{ color: '#c3c3c3', cursor: 'pointer' }" class="fa-xs align-self-center ml-2" @click="editable = true" />
                                </div>
                                <div v-else @keyup.escape="editable = false">
                                    <b-input-group>
                                        <b-form-input v-model="tool.title" size="lg" @keyup.enter="updateTool" autofocus></b-form-input>
                                        <b-input-group-append>
                                            <b-button size="lg" text="↲" variant="primary" @click="updateTool">↲</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </div>
                            </div>
                            <h1 v-else class="mb-0">{{ tool.title }}</h1>

                            <!-- Value chain -->
                            <div class="row my-3">
                                <div class="col-md-8">
                                    <svg id="value-chain" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544.31 143.97">
                                        <g v-for="category in categories" :key="category.id" :class="{ active: category.selected }" :style="{ opacity: category.relevance }">
                                            <polygon :points="category.polygon.points" />
                                            <g v-if="category.texts.length > 1 || category.id == '2dfef5a3-e1ac-4783-ae6e-8a8d93a655a0'">
                                                <text v-if="category.id == '2dfef5a3-e1ac-4783-ae6e-8a8d93a655a0'" :x="category.texts[0].x + 58" :y="category.texts[0].y - 16">{{ category.relevance }}</text>
                                                <text v-else-if="category.id == '084381fc-caaa-41cf-8eb1-0d237c3194f7'" :x="category.texts[0].x + 64" :y="category.texts[0].y - 10">{{ category.relevance }}</text>
                                                <text v-else :x="category.texts[0].x + 48" :y="category.texts[0].y - 10">{{ category.relevance }}</text>
                                            </g>
                                            <g v-else>
                                                <text x="485" :y="category.texts[0].y + 1">{{ category.relevance }}</text>
                                            </g>
                                            <text v-for="text in category.texts" :key="text.content" :x="text.x" :y="text.y">{{ text.content }}</text>
                                        </g>
                                    </svg>
                                </div>
                            </div>

                            <!-- Meta information -->
                            <div class="text-muted">
                                <small>
                                    erstellt von <span class="text-dark">{{ tool.User.username }}</span>
                                    {{ $moment(tool.createdAt).fromNow() }}
                                </small>
                            </div>

                            <!-- Tags -->
                            <div class="mb-3">
                                <span v-for="tag in tool.Tags" :key="tag.name">
                                    <n-link :to="`/tools/%7B%22term%22%3A%22%22%2C%22category%22%3A%5B%5D%2C%22tag%22%3A%5B%22${tag.name}%22%5D%2C%22sortBy%22%3A%22createdAt%22%2C%22revertedSort%22%3Atrue%7D`" class="badge badge-secondary mr-1">{{ tag.name }}</n-link>
                                </span>
                                <span v-if="$auth.loggedIn">
                                    <input id="tag-input" list="tagInputList" v-model="tagInput" class="form-control form-control-sm w-auto d-inline" @keyup.enter="addTag" autofocus autocomplete="off" />
                                    <b-form-datalist id="tagInputList" :options="tags"></b-form-datalist>
                                </span>
                            </div>

                            <!-- Description -->
                            <div v-if="!editable">
                                <p v-if="tool.description" v-html="$md.render(tool.description)" class="mb-0"></p>
                            </div>
                            <div v-else>
                                <textarea-autosize @keyup.ctrl.enter="updateTool"
                                    class="form-control"
                                    v-model="tool.description"
                                />

                                <h4 class="mt-5">Link</h4>
                                <b-form-input v-model="tool.link" @keyup.enter="updateTool" placeholder="Link"></b-form-input>

                                <h4 class="mt-5">Anbieter</h4>
                                <b-form-input v-model="tool.vendor" @keyup.enter="updateTool" placeholder="Anbietername"></b-form-input>
                                <b-form-input v-model="tool.vendorLink" @keyup.enter="updateTool" placeholder="Link zum Anbieter"></b-form-input>

                                <h4 class="mt-5">Dokumentation</h4>
                                <b-form-input v-model="tool.docLink" @keyup.enter="updateTool" placeholder="Link zur Dokumentation"></b-form-input>

                                <CategorySelector @update-category-relevance:tool="onEvent" @update-category:tool="onEvent" v-if="$auth.user.isAdmin" :tool="tool" />
                            </div>
                        </div>

                        <!-- Sidebar -->
                        <div class="col-lg-3 mt-5 mt-lg-0">
                            <!-- Download -->
                            <a class="btn btn-sm btn-block btn-primary text-light font-weight-bold" target="_blank" :href="tool.link"><font-awesome-icon icon="external-link-alt" class="mr-1" /> zur Webseite</a>

                            <!-- Vendor information -->
                            <div v-if="tool.vendor" class="mt-2">
                                <div class="text-muted"><small>Anbieter</small></div>
                                <div v-if="tool.vendorLink"><a class="btn btn-sm btn-block btn-outline-secondary" target="_blank" :href="tool.vendorLink">{{ tool.vendor }} ↗</a></div>
                            </div>

                            <!-- Tutorials -->
                            <div class="text-muted mt-5 d-flex justify-content-between">
                                <h4>Tutorials</h4>
                                <n-link v-if="$auth.loggedIn" :to="`/tutorial/new/${tool.id}`"><font-awesome-icon icon="plus-circle" class="fa-sm text-muted" /></n-link>
                            </div>
                            <div v-if="tool.Tutorials.length > 0" class="list-group list-group-flush">
                                <n-link v-for="tutorial in tool.Tutorials" :key="tutorial.id" class="list-group-item list-group-item-action" :to="`/tutorial/${tutorial.id}`">{{ tutorial.title }}</n-link>
                            </div>
                            <div v-else class="text-muted">
                                <small>
                                    Keine vorhanden.
                                    <n-link v-if="$auth.loggedIn" :to="`/tutorial/new/${tool.id}`">Hinzufügen</n-link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <SimilarTools :tool-id="tool.id" />
            </div>
        </div>
    </div>
</template>

<script>
import CategorySelector from '~/components/CategorySelector.vue';
import ValueChainData from '~/components/ValueChainData.vue';
import SimilarTools from '~/components/SimilarTools.vue';

export default {
    components: {
        CategorySelector,
        ValueChainData,
        SimilarTools
    },
    data() {
        return {
            tool: {
                title: 'Tool',
                description: 'Beschreibung'
            },
            tags: [],
            categories: [],
            editable: false,
            tagInput: null
        };
    },
    created() {
        this.categories = ValueChainData.data().categories;
    },
    async mounted() {
        // Fetch tags for auto completion
        const url = `${process.env.API_URL}/tags`;
        const { data } = await this.$axios.get(url);
        for(const item of data) {
            this.tags.push(item.name);
        }
        this.tags.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
    },
    async fetch() {
        try {
            // Fetch tool information
            const slug = this.$route.params.slug;
            const url = `${process.env.API_URL}/tool/${slug}`;
            const { data } = await this.$axios.get(url);
            this.tool = data;

            // Determine selected value chain phases
            for(const [key, category] of Object.entries(this.categories)) {
                let found = data.Categories.find(function(dataCategory, index) {
                    if(category.id == dataCategory.id) { return true; }
                });
                if(typeof found != 'undefined' && found != null) {
                    category.selected  = true;
                    category.relevance = Math.round(found.ToolCategory.relevance * 100);
                }
                found = null;
            }
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        async addTag() {
            const tag = this.tagInput;
            const url = `${process.env.API_URL}/tag/create`;
            try {
                const check = this.tool.Tags.filter(obj => Object.keys(obj).some(key => obj[key].includes(tag)));
                if(check.length < 1) {
                    const { data } = await this.$axios.post(url, {
                        tool: this.tool.id,
                        tag: tag
                    });
                    this.tool.Tags.push( {name: tag} );
                }
                this.tagInput = null;
            } catch (e) {
                const text = 'Error adding tag';
                alert(text);
                console.log(text, e);
            }
        },
        async updateTool() {
            const url = `${process.env.API_URL}/tool/edit/${this.tool.id}`;
            try {
                const { status, data } = await this.$axios.patch(url, {
                    title: this.tool.title,
                    description: this.tool.description,
                    link: this.tool.link,
                    vendor: this.tool.vendor,
                    vendorLink: this.tool.vendorLink,
                    docLink: this.tool.docLink
                })
            } catch(e) {
                console.error('Error', e);
            }
            this.editable = false;
        },
        onEvent(e) {
            let found = this.categories.find(function(category, index) {
                if(category.id == e.category) { return true; }
            });
            if(typeof e.relevance != 'undefined') {
                found.relevance = e.relevance * 100;
            } else {
                if(e.action == 'add') {
                    found.selected = true;
                } else {
                    found.selected = false;
                    found.relevance = null;
                }
            }
        }
    },
    head () {
        return {
            title: `${this.tool.title} auf dialogikTV`,
            meta: [
                { hid: 'og:title', vmid: 'og:title', name: 'og:title', content: `${this.tool.title} auf dialogikTV` },
                { hid: 'og:description', vmid: 'og:description', name: 'og:description', content: this.tool.description },
                // Twitter meta settings
                { hid: 'twitter:card', vmid: 'twitter:card', name: 'twitter:card', content: 'summary' },
                { hid: 'twitter:site', vmid: 'twitter:site', name: 'twitter:site', content: '@dialogikTV' },
                { hid: 'twitter:domain', vmid: 'twitter:domain', property: 'twitter:domain', content: 'dialogik.tv' },
                { hid: 'twitter:url', vmid: 'twitter:url', property: 'twitter:url', content: `https://dialogik.tv/tool/${this.tool.slug}` },
                { hid: 'twitter:title', vmid: 'twitter:title', name: 'twitter:title', content: `${this.tool.title} auf dialogikTV` },
                { hid: 'twitter:description', vmid: 'twitter:description', name: 'twitter:description', content: this.tool.description },
            ]
        }
    },
}
</script>

<style scoped>
.add-tag-input-button {
    cursor: pointer;
}

#tag-input {
    font-size: .7em !important;
}

#value-chain {
    max-height: 140px;
}

#value-chain polygon {
    fill: #aaa;
}

#value-chain g.active > polygon {
    fill: #00acee;
}

#value-chain g.active text {
    fill: #fff;
}

#value-chain text {
    fill: #666;
    font-size: .75rem;
}

#value-chain > g > g > text {
    font-size: 1.15rem;
    font-weight: 600;
}
</style>
