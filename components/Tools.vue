<template>
    <div>
        <div class="row">
            <div class="col-lg-10 offset-lg-1">

                <div class="d-flex justify-content-between">
                    <h1 class="display-1">Tools</h1>
                    <div>
                        <n-link class="btn btn-outline-light" :to="'/tools/tags'">Schlagwortsuche</n-link>
                        <n-link v-if="$auth.user" :to="'/tool/new'" class="card-link btn btn-light text-primary">
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
                            <div @click="typesVisible = !typesVisible" class="btn btn-sm btn-secondary text-right">Tool-Arten</div>
                            <transition name="roll-down">
                                <div id="types-selector" v-if="typesVisible">
                                    <!-- <div v-for="type in types" :key="type">
                                        <input type="checkbox" :id="`type-${type}`" :name="`type-${type}`" />
                                        <label :for="`type-${type}`" class="ml-1">{{ type }}</label>
                                    </div> -->
                                    <b-form-group class="bg-secondary text-light p-3 mb-0 border border-light">
                                        <b-form-checkbox-group
                                            id="types-group"
                                            v-model="selectedTypes"
                                            :options="types"
                                            name="types-group"
                                            stacked
                                        ></b-form-checkbox-group>
                                    </b-form-group>
                                </div>
                            </transition>
                        </div>
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
                                <b-dropdown-item @click="filter.sort='asc'"><font-awesome-icon icon="sort-amount-down-alt" /> aufsteigend</b-dropdown-item>
                                <b-dropdown-item @click="filter.sort='desc'"><font-awesome-icon icon="sort-amount-down" /> absteigend</b-dropdown-item>
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
                            <div class="d-flex justify-content-between">
                                <n-link :to="`/tool/${tool.slug}`">
                                    {{ tool.title }}
                                    <small v-if="tool.vendor" class="text-muted">von {{ tool.vendor }}</small>
                                </n-link>
                                <span class="text-muted"><small>{{ tool.views }} <font-awesome-icon icon="eye" class="ml-1" /></small></span>
                            </div>

                            <div class="row">
                                <div class="col-md">
                                    <div>
                                        <span v-for="tag in tagsWithoutToolTypes(tool.Tags)" :key="tag.name">
                                            <span class="badge badge-secondary tag-selector mr-1" @click="addTagToFilter(tag.name)">{{ tag.name }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-3 text-md-right">
                                    <span v-for="tag in tagsWithTypesOnly(tool.Tags)" :key="tag.name" @click="addTagToFilter(tag.name)" class="badge badge-primary tag-selector tag-type-badge mt-1 mr-1">{{ tag.name }}</span>
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
                sort: 'desc',
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
            types: [
                'Webapp',
                'Desktop Application',
                'Mobile Application',
                'API',
                'Script',
                'Plugin'
            ],
            typesVisible: false,
            selectedTypes: [],
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
                for(const tag of input.tag) {
                    if(this.types.indexOf(tag) > -1) {
                        this.selectedTypes.push(tag);
                    }
                }
            }
            if(input.sortBy) {
                this.filter.sortBy = input.sortBy;
            }
            if(input.sort) {
                this.filter.sort = input.sort;
            }
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
        tagsWithoutToolTypes(tags) {
            const types = this.types;
            return tags.filter(function(t) {
                return types.indexOf(t.name) < 0;
            });
        },
        tagsWithTypesOnly(tags) {
            const types = this.types;
            return tags.filter(function(t) {
                return types.indexOf(t.name) > -1;
            });
        },
        handleFilterChangeRequest() {
            this.$router.push(`/tools/${this.encodeFilter}`);
        }
    },
    watch: {
        'filter.tag': function(newTags, oldTags) {
            this.handleFilterChangeRequest();
        },
        'filter.category': function(newCategory, oldCategory) {
            this.handleFilterChangeRequest();
        },
        'filter.sortBy': function(newSortBy, oldSortBy) {
            this.handleFilterChangeRequest();
        },
        'filter.sort': function(newSort, oldSort) {
            this.handleFilterChangeRequest();
        },
        // Watch filter term and wait for user input
        'filter.term': function(newTerm, oldTerm) {
            if(!this.awaitingSearch) {
                if(newTerm.length < 1) {
                    this.handleFilterChangeRequest();
                } else {
                    setTimeout(() => {
                        this.handleFilterChangeRequest();
                        this.awaitingSearch = false;
                    }, 1000);
                }
            }
            this.awaitingSearch = true;
        },
        selectedTypes: function(newTypes, oldTypes) {
            for(const type of this.types) {
                if(this.selectedTypes.indexOf(type) > -1) {
                    this.addTagToFilter(type);
                } else {
                    this.removeTagFromFilter(type);
                }
            }
        }
    },
    computed: {
        // Encode filter to be ready for use in URL
        encodeFilter: function() {
            // return encodeURIComponent(JSON.stringify({
            //     term: this.filter.term,
            //     category: this.filter.category,
            //     tag: this.filter.tag,
            //     sortBy: this.filter.sortBy,
            //     sort: this.filter.sort
            // }))
            const str = JSON.stringify({
                term: this.filter.term,
                category: this.filter.category,
                tag: this.filter.tag,
                sortBy: this.filter.sortBy,
                sort: this.filter.sort
            }).substring(1).slice(0, -1);
            return str;
        },
        // Decode filter from URL parameters
        decodeFilter() {
            return JSON.parse("{" + this.$route.params.search + "}");
        },
        sortedTools() {
            // Make values static so we can use them later in the sort function
            const sort   = this.filter.sort; // asc/desc
            const sortBy = this.filter.sortBy;

            // Define our labels
            const labels = this.filter.labels;

            // Our increments for up and down
            let up   = +1;
            let down = -1;
            if(sort === 'desc') {
                up   = -1;
                down = +1;
            }

            // Get verbalized direction to sort
            const direction = (sort === 'desc' ? labels[sortBy].desc : labels[sortBy].asc);

            // Sort based on sortBy and sort parameters
            return this.tools.sort(function compare(a, b) {
                // Regular sorting
                if(sortBy != 'categoryRelevance' && sortBy != 'title') {
                    if(a[sortBy] < b[sortBy]) {
                        return down;
                    }
                    if(a[sortBy] > b[sortBy]) {
                        return up;
                    }
                // by Title
                } else if(sortBy == 'title') {
                    if(sort === 'desc') {
                        return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
                    } else {
                        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
                    }
                }
                // by Category relevance
                else {
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
            const sort = this.filter.sort;
            let icon = 'sort-amount-down-alt';
            if(sort === 'desc') {
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
                    url = `${url}/${encodeURIComponent("{" + this.encodeFilter + "}")}`;
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

.tag-type-badge {
    font-size: 1em;
}

.tag-type-badge:last-child {
    margin-right: 0 !important;
}

#types-selector {
    position: absolute;
    z-index: 100;
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
