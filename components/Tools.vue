<template>
    <div>
        <div class="row">
            <div class="col-lg-10 offset-lg-1">

                <h1 class="display-1">Tools</h1>

                <!-- Description bar -->
                <div class="row mb-2">
                    <div class="col-md-8">
                        <p class="lead">Hier findet ihr eine umfangreiche Sammlung von Tools, Apps und Scripten, die euch das Streamen und Inhalteerzeugen vereinfachen und angenehmer machen.</p>
                    </div>
                </div>

                <!-- Teaser cols -->
                <div v-if="$route.fullPath == '/tools'" class="mb-5">
                    <b-card-group deck>
                        <!-- <b-card bg-variant="dark" text-variant="white" title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top> -->
                        <b-card bg-variant="dark" text-variant="white" title="Schlagwortsuche">
                            <b-card-text>
                                Jeder Nutzer kann Tags hinzufügen. Dadurch entsteht eine nutzerbasierte Systematisierung der Tools.
                            </b-card-text>
                            <template v-slot:footer>
                                <!-- <small class="text-muted">Last updated 3 mins ago</small> -->
                                <n-link :to="'/tools/tags'" class="card-link btn btn-primary">zur Schlagwortsuche</n-link>
                            </template>
                        </b-card>
                        <b-card bg-variant="dark" text-variant="white" title="Wertschöpfungskette">
                            <b-card-text>
                                Du willst das ganze professionell angehen? Dann ist die Betrachtung entlang der Wertschöpfungskette der Inhaltserzeugung einen Blick wert.
                            </b-card-text>
                            <template v-slot:footer>
                                <n-link :to="'/tools/value-chain'" class="card-link btn btn-primary">zur Wertschöpfungskette</n-link>
                            </template>
                        </b-card>
                        <b-card v-if="!$auth.loggedIn" bg-variant="primary" text-variant="white" title="Mitmachen!">
                            <b-card-text>
                                Du kannst dieses Projekt aktiv unterstützen. Registriere dich und komm' in unseren Discord um dich mit anderen Mithelfern zu vernetzen.
                            </b-card-text>
                            <template v-slot:footer>
                                <n-link :to="'/register'" class="card-link btn btn-light text-primary">Registrieren</n-link>
                                <a href="http://discord.dialogik.tv" target="_blank" class="card-link btn btn-light text-primary">zum Discord</a>
                            </template>
                        </b-card>
                        <b-card v-else bg-variant="primary" text-variant="white" title="Mitmachen!">
                            <b-card-text>
                                Du kannst dieses Projekt aktiv unterstützen. Erstelle Tools, Tutorials und Sammlungen und komm' in unseren Discord und vernetz' dich mit anderen Mithelfern.
                            </b-card-text>
                            <template v-slot:footer>
                                <n-link :to="'/tool/new'" class="card-link btn btn-light text-primary">
                                    <font-awesome-icon icon="plus-circle" class="text-primary mr-1" /> Tool hinzufügen
                                </n-link>
                                <a href="http://discord.dialogik.tv" target="_blank" class="card-link btn btn-light text-primary">zum Discord</a>
                            </template>
                        </b-card>
                    </b-card-group>
                </div>

                <!-- Value Chain -->
                <div v-if="$route.name == 'tools-value-chain-category'" class="mb-4 p-2 bg-dark rounded">
                    <div class="p-md-3">
                        <ValueChain :selected="$route.params.category" />
                    </div>
                </div>

                <!-- Search and filter bar -->
                <div class="mb-2 d-flex justify-content-between">
                    <div class="w-50">
                        <input type="text" v-model="filter.term" class="form-control form-control-sm d-inline w-auto" placeholder="Suche" />
                        <font-awesome-icon icon="search" class="filtersubmit text-muted d-none d-lg-inline" />
                        <div v-if="$route.params.tag" class="d-inline">
                            <n-link :to="`/tools`" class="badge badge-light text-muted">
                                {{ $route.params.tag }} <font-awesome-icon icon="times-circle" class="text-muted" />
                            </n-link>
                        </div>
                    </div>
                    <div>
                        <div class="d-inline-block">
                            <b-dropdown right size="sm" :text="filter.labels[filter.sortBy].label" class="m-md-2">
                                <b-dropdown-item @click="filter.sortBy='views'">Views</b-dropdown-item>
                                <b-dropdown-item @click="filter.sortBy='title'">Name</b-dropdown-item>
                                <b-dropdown-item @click="filter.sortBy='createdAt'">Alter</b-dropdown-item>
                                <b-dropdown-item v-if="$route.name == 'tools-value-chain-category' && $route.fullPath != '/tools/value-chain'" @click="filter.sortBy='categoryRelevance'">Relevanz</b-dropdown-item>
                            </b-dropdown>
                        </div>
                        <div class="d-inline-block">
                            <b-dropdown right size="sm" class="m-md-2">
                                <template v-slot:button-content>
                                    <font-awesome-icon :icon="getSortDirectionFaIcon" />
                                </template>
                                <b-dropdown-item @click="filter.revertedSort=false"><font-awesome-icon icon="sort-amount-down-alt" /> aufsteigend</b-dropdown-item>
                                <b-dropdown-item @click="filter.revertedSort=true"><font-awesome-icon icon="sort-amount-down" /> absteigend</b-dropdown-item>
                            </b-dropdown>
                        </div>
                        <button @click="$fetch" class="btn btn-sm btn-secondary"><font-awesome-icon icon="sync-alt" class="text-light" /></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <!-- Sidebar -->
            <div class="col-lg-1">
                <!-- ... -->
            </div>
            <div class="col-lg-10">
                <p v-if="$fetchState.pending" class="text-light text-center py-5 h3">Fetching tools...</p>
                <div v-else-if="$fetchState.error" class="alert alert-danger" role="alert">
                    <h2>Error</h2>
                    <p class="mb-0">Error fetching tools <code>{{ $fetchState.error.message }}</code></p>
                </div>
                <p v-else-if="tools.length < 1" class="text-light text-center py-5 h3">No entries.</p>
                <div v-else>
                    <ul class="list-group text-muted">
                        <li v-for="tool in sortedTools" :key="tool.slug" class="list-group-item py-3">
                            <div class="row">
                                <div class="col-md">
                                    <n-link :to="`/tool/${tool.slug}`">
                                        {{ tool.title }}
                                        <small v-if="tool.vendor" class="text-muted">von {{ tool.vendor }}</small>
                                    </n-link>
                                    <div>
                                        <span v-for="tag in tool.Tags">
                                            <n-link :to="`/tools/tag/${tag.name}`" class="badge badge-secondary mr-1">{{ tag.name }}</n-link>
                                        </span>
                                    </div>
                                </div>
                                <div v-if="$route.name == 'tools-value-chain-category' && $route.fullPath != '/tools/value-chain'" class="col-md-2 text-right text-primary font-weight-bold">
                                    {{ Math.round(tool.ToolCategory.relevance * 100) }} <span class="text-muted font-weight-normal">/ 100</span>
                                </div>
                                <div class="col-md-1 text-right">
                                    <span class="text-muted"><small>{{ tool.views }} <font-awesome-icon icon="eye" class="ml-1" /></small></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ValueChain from '~/components/ValueChain.vue';

export default {
    components: {
        ValueChain
    },
    data() {
        return {
            tools: [],
            filter: {
                term: '',
                sortBy: 'createdAt',
                revertedSort: true,
                labels: {
                    'views': {
                        'label': 'Views',
                        'asc': 'aufsteigend',
                        'desc': 'absteigend'
                    },
                    'title': {
                        'label': 'Name',
                        'asc': 'A🠚Z',
                        'desc': 'Z🠚A'
                    },
                    'createdAt': {
                        'label': 'Alter',
                        'asc': 'alt🠚neu',
                        'desc': 'neu🠚alt'
                    },
                    'categoryRelevance': {
                        'label': 'Relevanz',
                        'asc': 'gering🠚hoch',
                        'desc': 'hoch🠚gering'
                    }
                },
            }
        }
    },
    created() {
        if(this.$route.name == 'tools-value-chain-category' && this.$route.fullPath != '/tools/value-chain') {
            this.filter.sortBy = 'categoryRelevance';
        }

        if(typeof this.$route.params.search != 'undefined') {
            console.log(this.$route.params.search);
        }
    },
    computed: {
        filteredTools() {
            return this.tools.filter(tool => {
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
        },
        sortedTools() {
            // Make values static so we can use them later in the sort function
            const reverted = this.filter.revertedSort;
            const sortBy   = this.filter.sortBy;

            // Define our labels
            const labels = this.filter.labels;

            // Our increments for up and down
            let up   = +1;
            let down = -1;
            if(reverted) {
                up   = -1;
                down = +1;
            }

            // Get verbalized direction to sort
            const direction = (reverted ? labels[sortBy].desc : labels[sortBy].asc);

            // Sort based on sortBy and revertedSort parameters
            return this.filteredTools.sort(function compare(a, b) {
                if(sortBy != 'categoryRelevance') {
                    if(a[sortBy] < b[sortBy]) {
                        return down;
                    }
                    if(a[sortBy] > b[sortBy]) {
                        return up;
                    }
                } else {
                    if(a.ToolCategory.relevance < b.ToolCategory.relevance) {
                        return down;
                    }
                    if(a.ToolCategory.relevance > b.ToolCategory.relevance) {
                        return up;
                    }
                }
                return 0;
            });
        },
        getSortDirectionFaIcon() {
            const revertedSort = this.filter.revertedSort;
            let icon = 'sort-amount-down-alt';
            if(revertedSort) {
                icon = 'sort-amount-down';
            }
            return icon;
        }
    },
    methods: {
    },
    watch: {
        // filter: (newFilter, oldFilter) => {
        //     console.log('newFilter', newFilter);
        //     console.log('oldFilter', oldFilter);
        // }
    },
    async fetch() {
        const tag      = this.$route.params.tag;
        const category = this.$route.params.category;
        let url = `${process.env.API_URL}`;

        // Tag search
        if(typeof tag !== 'undefined') {
            url = `${url}/tag/${tag}`;
            const { data } = await this.$axios.get(url);
            this.tools = data.Tools;
        }

        // Category search
        else if(typeof category !== 'undefined') {
            url = `${url}/category/${category}`;
            const { data } = await this.$axios.get(url);
            this.tools = data.Tools;

        // Global search
        } else {
            url = `${url}/tools`;
            const { data } = await this.$axios.get(url);
            this.tools = data;
        }
    },
    head () {
        return {
            title: 'Tools, Apps und Scripte für Streamer und Inhaltserzeuger'
        }
    }
}
</script>

<style scoped>
.filtersubmit {
    position: relative;
    z-index: 1;
    left: -30px;
    top: 1px;
    cursor: pointer;
}

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
