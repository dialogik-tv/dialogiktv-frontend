<template>
    <div class="mt-5 pt-3">
        <h1>Tools</h1>
        <p class="lead mb-5">Hier findet ihr eine umfangreiche Sammlung von Tools, Apps und Scripten, die dir das Streamen und das Inhalteerzeugen erleichtern oder ein bisschen verschönern.</p>

        <div class="mb-2 d-flex justify-content-between">
            <div class="w-50">
                <input type="text" v-model="filter.term" class="form-control form-control-sm d-inline w-auto" placeholder="Suche" />
                <font-awesome-icon icon="search" class="filtersubmit text-muted d-none d-lg-inline" />
            </div>
            <button v-on:click="$fetch" class="btn btn-sm btn-light"><font-awesome-icon icon="sync-alt" class="text-primary" /></button>

            <!-- <select class="form-control form-control-sm">
                <optgroup label="Test">
                    <option value="">Test</option>
                    <option value="">Test2</option>
                    <option value="">Test3</option>
                    <option value="">Test4</option>
                    <option value="">Test5</option>
                </optgroup>
            </select> -->
        </div>

        <p v-if="$fetchState.pending" class="text-muted text-center py-4 h3">Fetching tools...</p>
        <div v-else-if="$fetchState.error" class="alert alert-danger" role="alert">
            <h2>Error</h2>
            <p class="mb-0">Error fetching tools <code>{{ $fetchState.error.message }}</code></p>
        </div>
        <div v-else>
            <ul class="list-group">
                <li class="list-group-item py-3" v-for="tool in filteredTools" :key="tool.slug">
                    <n-link :to="`/app/tool/${tool.slug}`">{{ tool.title }} <small v-if="tool.vendor" class="text-muted">von {{ tool.vendor }}</small></n-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tools: [],
            filter: {
                term: ''
            }
        };
    },
    computed: {
        filteredTools() {
            return this.tools.filter(tool => {
                if(this.filter.term == null) {
                    return;
                }
                let inTitle  = tool.title.toLowerCase().indexOf(this.filter.term.toLowerCase()) > -1;
                let inVendor = false;
                if(tool.vendor != null) {
                    inVendor = tool.vendor.toLowerCase().indexOf(this.filter.term.toLowerCase()) > -1;
                }

                return inTitle || inVendor;
            })
        }
    },
    async fetch() {
        const url = `${process.env.API_BASE}/api/tools`;
        const { data } = await this.$axios.get(url);
        this.tools = data;
    },
    head () {
        return {
            title: 'Tools, Apps und Scripte für Streamer und Inhaltserzeuger auf dialogikTV'
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
