<template>
    <div>
        <div class="row">
            <div class="col-lg-10 offset-lg-1">

                <div class="d-flex justify-content-between">
                    <h1 class="display-1">Tools</h1>
                    <div>
                        <n-link class="btn btn-outline-light" :to="'/tools/tags'">Schlagwortsuche</n-link>
                        <n-link :to="'/tool/new'" class="card-link btn btn-light text-primary">
                            <font-awesome-icon icon="plus-circle" class="text-primary mr-1" /> Tool hinzufügen
                        </n-link>
                    </div>
                </div>

                <!-- Description bar -->
                <div class="row mb-2">
                    <div class="col-md-8">
                        <p class="lead">Hier findet ihr eine umfangreiche Sammlung von Tools, Apps und Scripten, die euch das Streamen und Inhalteerzeugen vereinfachen und angenehmer machen.</p>
                    </div>
                </div>

                <!-- Value Chain -->
                <div class="accordion" role="tablist">
                    <b-card no-body class="bg-dark mb-3">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block v-b-toggle.accordion-content class="text-left" @click="'valueChainVisible = !valueChainVisible'">
                                <span v-if="!valueChainVisible"><font-awesome-icon icon="caret-right" class="text-light mr-2" /></span>
                                <span v-else><font-awesome-icon icon="caret-down" class="text-light mr-2" /></span>
                                Wertschöpfungskette
                            </b-button>
                        </b-card-header>
                        <b-collapse id="accordion-content" v-model="valueChainVisible" accordion="value-chain-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>
                                    <div class="p-md-3">
                                        <ValueChain
                                            :selected="filter.category"
                                            :filterString="encodeFilter"
                                            @pushCategoryToFilter="pushCategoryToFilter"
                                        />
                                    </div>
                                </b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </div>

                <!-- Search and filter bar -->
                <div class="mb-2 d-flex justify-content-between">
                    <div class="w-50">
                        <input type="text" v-model="filter.term" class="form-control form-control-sm d-inline w-auto" placeholder="Suche" />
                        <font-awesome-icon icon="times-circle" class="filter-term-cancel text-muted d-none d-lg-inline" @click="filter.term = ''" />
                        <div class="d-inline">
                            <span v-for="tag in filter.tag" :key="tag" class="badge badge-light text-muted tag-unselector mr-1" @click="removeTagFromFilter(tag)">
                                {{ tag }}
                                <font-awesome-icon icon="times-circle" class="text-muted" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <div class="d-inline-block">
                            <b-dropdown right size="sm" :text="filter.labels[filter.sortBy].label" class="m-md-2">
                                <b-dropdown-item @click="filter.sortBy='views'">Views</b-dropdown-item>
                                <b-dropdown-item @click="filter.sortBy='title'">Name</b-dropdown-item>
                                <b-dropdown-item @click="filter.sortBy='createdAt'">Alter</b-dropdown-item>
                                <b-dropdown-item v-if="filter.category.length > 0" @click="filter.sortBy='categoryRelevance'">Relevanz</b-dropdown-item>
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
                                        <span v-for="tag in tool.Tags" :key="tag.id">
                                            <span class="badge badge-secondary mr-1 tag-selector" @click="addTagToFilter(tag.name)">{{ tag.name }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div v-if="filter.category.length > 0" class="col-md-4 text-md-right text-primary font-weight-bold">
                                    <div v-for="category in tool.Categories" :key="category.id">
                                        <span v-if="filter.category.indexOf(category.id) > -1">
                                            <small v-if="filter.category.length > 1" class="text-muted">
                                                {{ category.name }}
                                            </small>
                                            {{ Math.round(category.ToolCategory.relevance * 100) }}
                                            <span class="text-muted font-weight-normal">/ 100</span>
                                        </span>
                                    </div>
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
            awaitingSearch: false,
            tools: [],
            filter: {
                term: '',
                category: [],
                tag: [],
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
            },
            valueChainVisible: false,
        }
    },
    created() {
        // Map query parameters to data
        if('search' in this.$route.params) {
            const input = this.decodeFilter;
            if(input.term) {
                this.filter.term = input.term;
            }
            if(input.category) {
                this.filter.category = input.category;
                if(input.category.length > 0) {
                    this.valueChainVisible = true;
                }
            }
            if(input.tag) {
                this.filter.tag = input.tag;
            }
            if(input.sortBy) {
                this.filter.sortBy = input.sortBy;
            }

            if(input.revertedSort) {
                this.filter.revertedSort = input.revertedSort;
            }
        }

        // Set sort by correctly if this is the "value chain view"
        if(this.$route.name == 'tools-value-chain-category' && this.$route.fullPath != '/tools/value-chain') {
            this.filter.sortBy = 'categoryRelevance';
        }
    },
    methods: {
        addTagToFilter(tag) {
            const filter = this.filter.tag;
            if(filter.indexOf(tag) < 0) {
                filter.push(tag);
            }
        },
        removeTagFromFilter(tag) {
            const filter = this.filter.tag;
            if(filter.indexOf(tag) > -1) {
                filter.splice(filter.indexOf(tag), 1);
            }
        },
        addCategoryToFilter(category) {
            const filter = this.filter.category;
            if(filter.indexOf(category) < 0) {
                filter.push(category);
            }
        },
        removeCategoryFromFilter(category) {
            const filter = this.filter.category;
            if(filter.indexOf(category) > -1) {
                filter.splice(filter.indexOf(category), 1);
            }
        },
        pushCategoryToFilter(category) {
            this.addCategoryToFilter(category);
        },
        unpushCategoryToFilter(category) {
            this.removeCategoryFromFilter(category);
        },
    },
    watch: {
        'filter.tag': function(newTags, oldTags) {
            this.$router.push(`/tools/${this.encodeFilter}`);
        },
        'filter.category': function(newCategory, oldCategory) {
            this.$router.push(`/tools/${this.encodeFilter}`);
        },
        // 'filter.sortBy': function(newSortBy, oldSortBy) {
        //     this.$router.push(`/tools/${this.encodeFilter}`);
        // },
        // 'filter.revertedSort': function(newRevertedSort, oldRevertedSort) {
        //     this.$router.push(`/tools/${this.encodeFilter}`);
        // },
        // Watch filter term and wait for user input
        'filter.term': function(newTerm, oldTerm) {
            if(!this.awaitingSearch) {
                if(newTerm.length < 1) {
                    this.$router.push(`/tools/${this.encodeFilter}`);
                } else {
                    setTimeout(() => {
                        this.$router.push(`/tools/${this.encodeFilter}`);
                        this.awaitingSearch = false;
                    }, 1000);
                }
            }
            this.awaitingSearch = true;
        },
    },
    computed: {
        // Encode filter to be ready for use in URL
        encodeFilter: function() {
            return JSON.stringify({
                term: this.filter.term,
                category: this.filter.category,
                tag: this.filter.tag,
                sortBy: this.filter.sortBy,
                revertedSort: this.filter.revertedSort
            })
        },
        // Decode filter from URL parameters
        decodeFilter() {
            return JSON.parse(this.$route.params.search);
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
            return this.tools.sort(function compare(a, b) {
                // Regular sorting
                if(sortBy != 'categoryRelevance') {
                    if(a[sortBy] < b[sortBy]) {
                        return down;
                    }
                    if(a[sortBy] > b[sortBy]) {
                        return up;
                    }
                // by Title
                } else if(sortBy == 'title') {
                    if(a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
                        return down;
                    }
                    if(a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) {
                        return up;
                    }
                // by Category relevance
                } else {
                    if(a.Categories[0].ToolCategory.relevance < b.Categories[0].ToolCategory.relevance) {
                        return down;
                    }
                    if(a.Categories[0].ToolCategory.relevance > b.Categories[0].ToolCategory.relevance) {
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
    async fetch() {
        try {
            // Define API url prefix
            let url = `${process.env.API_URL}/tools`;

            // Fetch search parameters
            if('search' in this.$route.params) {
                if(this.filter.category.length > 0 || this.filter.tag.length > 0 || this.filter.term.length > 0) {
                    url = `${url}/${this.encodeFilter}`;
                }
            }
            const { data } = await this.$axios.get(url);
            this.tools = data;
        } catch (error) {
            console.error('Error occured. Please try again.', error);
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
.filter-term-cancel {
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

.tag-selector, .tag-unselector {
    cursor: pointer;
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
