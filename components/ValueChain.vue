<template>
    <div class="row">
        <div class="col-md-8">
            <svg id="value-chain" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544.31 143.97">
                <g v-for="category in categories" @click="filterValueChain" :key="category.id" :id="category.id" :class="{ active: isActive(category.id) }">
                    <polygon :points="category.polygon.points" />
                    <text v-for="text in category.texts" :key="text.content" :x="text.x" :y="text.y">{{ text.content }}</text>
                </g>
            </svg>
        </div>
        <div class="col-md">
            <div v-if="phaseDescription" class="d-flex justify-content-between">
                <div>
                    <div class="h6">{{ phaseTitle }}</div>
                    <small class="mb-0">{{ phaseDescription }}</small>
                </div>
                <n-link :to="'/tools/value-chain'" class="ml-4"><font-awesome-icon icon="times-circle" class="text-light mr-1" /></n-link>
            </div>
            <small v-else class="text-muted mb-0">Wähle eine Wertschöpfungsphase aus, um weitere Informationen anzuzeigen.</small>
        </div>
    </div>
</template>

<script>
import ValueChainData from '~/components/ValueChainData.vue';

export default {
    components: {
        ValueChainData
    },
    data() {
        return {
            categories: []
        }
    },
    props: ['selected', 'filterString'],
    created() {
        this.categories = ValueChainData.data().categories;
    },
    computed: {
        phaseDescription() {
            const categoryID = this.$parent.$route.params.category;
            if(categoryID) {
                let found = this.categories.find(function(category, index) {
                	if(category.id == categoryID) { return true; }
                });
                return found.description;
            } else {
                return false;
            }
        },
        phaseTitle() {
            const categoryID = this.$parent.$route.params.category;
            if(categoryID) {
                let found = this.categories.find(function(category, index) {
                	if(category.id == categoryID) { return true; }
                });
                let title = found.texts[0].content;
                if(found.texts.length > 1) {
                    title += ' ' + found.texts[1].content;
                }
                return title;
            } else {
                return false;
            }
        }
    },
    methods: {
        filterValueChain(e) {
            const category = e.target.parentElement.id;
            this.$emit('pushCategoryToFilter', category);
            this.$router.push(`/tools/${this.filterString}`);
        },
        isActive(id) {
            let result = false;
            if(this.selected.indexOf(id) > -1) {
                result = true;
            }
            return result;
        }
    }
}
</script>

<style scoped>
#value-chain {
    max-height: 240px;
}

#value-chain g:hover {
    cursor: pointer;
}

#value-chain polygon {
    fill: #00acee;
}

#value-chain g:hover > polygon,
#value-chain g.active:hover > polygon {
    fill: #0090c8;
}

#value-chain g.active > polygon {
    fill: #fff;
}

#value-chain g.active > text {
    fill: #0090c8;
}

#value-chain g.active:hover > text {
    fill: #fff;
}

#value-chain text {
    fill: white;
    font-size: .75rem;
}
</style>
