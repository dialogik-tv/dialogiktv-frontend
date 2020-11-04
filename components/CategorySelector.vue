<template>
    <div class="mt-5">
        <span class="h3">Kategorien</span>
        <ul class="list-group">
            <li v-for="category in categories" class="list-group-item">
                <input type="checkbox" :id="'id-'+category.id" v-model="category.selected" @change="updateCategory(tool, category.id, category.selected);" />
                <label :for="'id-'+category.id">{{ category.name }} <code>{{ category.selected }}</code></label>
                <div v-if="category.selected">
                    <label :for="'range-'+category.id">Relevanz für diese Kategorie</label>
                    <b-form-input :id="'range-'+category.id" v-model.lazy="category.relevance" type="range" min="1" max="100" @change="updateRelevance(tool, category.id, category.relevance);"></b-form-input>
                    <div class="mt-2">Relevanz: {{ category.relevance }} / 100</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: []
        }
    },
    props: ['tool'],
    async fetch() {
        try {
            const url = `${process.env.API_URL}/categories`;
            const id = this.$route.params.category;
            const { data } = await this.$axios.get(url);
            for(const [key, category] of Object.entries(this.tool.Categories)) {
                let found = data.find(function(dataCategory, index) {
                	if(category.id == dataCategory.id) { return true; }
                });
                found.selected  = true;
                found.relevance = Math.round(category.ToolCategory.relevance * 100);
            }
            this.categories = data;
        } catch (e) {
            console.log('Error', e);
        }
    },
    computed: {
        getSelectedIds() {
            const selectedIds = [];
            for(const [key, category] of Object.entries(this.tool.Categories)) {
                selectedIds.push(category.id);
            }
            return selectedIds;
        }
    },
    methods: {
        async updateCategory(tool, category, checked) {
            let url = `${process.env.API_URL}/category/`;
            let action = 'add';
            if(!checked) {
                action = 'remove';
            }
            url += action;
            const body = {
                tool: tool.id,
                category: category
            };
            await this.$axios.post(url, body);
            body.checked = checked;
            body.action = action;
            this.$emit(`update-category:tool`, body);
        },
        async updateRelevance(tool, category, relevance) {
            relevance = relevance / 100;
            const url = `${process.env.API_URL}/category/add`;
            const body = {
                tool: tool.id,
                category: category,
                relevance: relevance
            };
            await this.$axios.post(url, body);
            this.$emit('update-category-relevance:tool', body);
        }
    }
}
</script>

<style scoped>
.list-group-item, .list-group-item * {
    cursor: pointer;
}
</style>
