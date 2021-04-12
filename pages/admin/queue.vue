<template>
    <div>
        <b-container>
            <p v-if="$fetchState.pending" class="text-light text-center py-5 h3">Fetching tools...</p>
            <div v-else-if="$fetchState.error" class="alert alert-danger" role="alert">
                <h2>Error</h2>
                <p class="mb-0">Error fetching tools <code>{{ $fetchState.error.message }}</code></p>
            </div>
            <p v-else-if="tools.length < 1" class="text-light text-center py-5 h3">No entries.</p>
            <div v-else>
                <ul class="list-group">
                    <li class="list-group-item text-body py-3" v-for="tool in tools" :key="tool.id">
                        <b-row>
                            <b-col md="8">
                                <n-link class="h4 mb-0" :to="`/tool/${tool.slug}`">{{ tool.title }}</n-link>
                                <small class="text-muted">Gepostet von {{ tool.User.username }} am {{ tool.createdAt }}</small>
                            </b-col>
                            <b-col md="4" class="text-md-right mt-4 mt-md-0">
                                <button class="btn btn-sm btn-danger" @click="rejectTool(tool.id)">Ablehnen</button>
                                <button class="btn btn-sm btn-primary" @click="publishTool(tool.id)">Veröffentlichen</button>
                            </b-col>
                        </b-row>
                    </li>
                </ul>
            </div>
        </b-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tools: [],
        }
    },
    created() {
        if(!this.$auth.user || !this.$auth.user.isAdmin) {
            this.$router.push('/tools');
        }
    },
    async fetch() {
        try {
            const url = `${process.env.API_URL}/tools/unpublished`;
            const { status, data } = await this.$axios.get(url);
            this.tools = data;
        } catch (error) {
            console.error('Error occured. Please try again.', error);
        }
    },
    methods: {
        async publishTool(id) {
            try {
                const url = `${process.env.API_URL}/tool/publish/${id}`;
                const { data } = await this.$axios.patch(url);
                this.$fetch();
            } catch (error) {
                console.error('Error occured. Please try again.', error);
            }
        },
        async rejectTool(id) {
            try {
                const url = `${process.env.API_URL}/tool/reject/${id}`;
                const { data } = await this.$axios.patch(url);
                this.$fetch();
            } catch (error) {
                console.error('Error occured. Please try again.', error);
            }
        }
    }
}
</script>