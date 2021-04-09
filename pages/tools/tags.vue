<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-10 offset-lg-1">
                    <div class="mb-3">
                        <small><n-link :to="'/tools'" class="text-light">← zurück zu den Tools</n-link></small>
                    </div>
                    <h1 class="display-1">Schlagwörter</h1>
                    <div class="pt-3 pb-5 px-0">
                        <div class="mb-3">
                            <input type="text" v-model="filter.term" class="form-control form-control-lg d-inline" placeholder="Suche" />
                        </div>
                        <div class="row">
                            <div v-for="tag in filteredTags" :key="tag.name" class="col-md-4 col-lg-3">
                                <div class="card bg-light text-muted p-3">
                                    <n-link :to="`/tag/${tag.name}`" :style="getTagSize(tag)" class="d-flex justify-content-between">
                                        {{ tag.name }}
                                        <span class="badge badge-primary">{{ tag.Tools.length }}</span>
                                    </n-link>
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
            tags: [],
            filter: {
                term: ''
            }
        }
    },
    computed: {
        filteredTags() {
            return this.tags.filter(tag => {
                return tag.name.toLowerCase().indexOf(this.filter.term.toLowerCase()) > -1;
            })
        }
    },
    methods: {
        getTagSize(tag) {
            const size = 5 * Math.log(tag.Tools.length * 10);
            return {
                'font-size': `${size}pt`
            }
        }
    },
    async fetch() {
        let url = `${process.env.API_URL}/tags`;
        const { data } = await this.$axios.get(url);
        this.tags = data;
    },
    head () {
        return {
            title: 'Tools, Apps und Scripte für Streamer und Inhaltserzeuger auf dialogikTV'
        }
    }
}
</script>

<style scoped>
.card .badge.badge-primary {
    line-height: initial;
}
</style>
