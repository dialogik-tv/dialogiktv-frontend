<template>
    <div>
        <div class="container">
            <div v-if="!tool" class="mb-3">
                <small><n-link :to="'/tutorials'" class="text-light">← zurück zu den Tutorials</n-link></small>
            </div>
            <div v-else class="mb-3">
                <small><n-link :to="`/tool/${tool.id}`" class="text-light">← zurück zu {{ tool.title }}</n-link></small>
            </div>


            <div v-if="tool">
                <h1 class="mt-3">Tutorial hinzufügen zu</h1>
                <div class="card bg-primary text-light mb-5 p-3">
                    <h2 class="mb-0">{{ tool.title }}</h2>
                    <p class="mb-0"><small>{{ tool.description }}</small></p>
                </div>
            </div>
            <div v-else>
                <h1 class="mt-3">Tutorial hinzufügen</h1>
            </div>

            <form @submit.prevent="addTutorial" autocomplete="off">
                <div class="form-group">
                    <div class="form-group mb-5">
                        <label for="tutorialData-title">Name des Tutorials</label>
                        <input type="text" v-model="tutorialData.title" class="form-control" id="tutorialData-title" required />
                        <small class="form-text">Ein überdachter und wohlformulierter Titel mit 8-120 Zeichen.</small>
                    </div>
                    <div class="form-group mb-5">
                        <label for="tutorialData-link">Link</label>
                        <input type="text" v-model="tutorialData.link" class="form-control" id="tutorialData-link" />
                        <small v-if="!tutorialData.link" class="form-text">(optional)</small>
                    </div>
                    <div class="form-group mb-5">
                        <label for="tutorialData-description">Inhalt</label>
                        <!-- <textarea v-model="tutorialData.description" class="form-control" id="tutorialData-description"></textarea> -->
                        <textarea-autosize
                            class="form-control"
                            v-model="tutorialData.description"
                            id="tutorialData-description"
                        />
                        <small class="form-text">
                            <span v-if="tutorialData.link">Kurze Beschreibung der verlinkten Quelle. (optional)</span>
                            <span v-else>Inhalt deines Tutorials. Du kannst <a target="_blank" href="https://de.wikipedia.org/wiki/Markdown">Markdown</a> verwenden.</span>
                        </small>
                    </div>
                    <button type="submit" class="btn btn-primary">Tutorial hinzufügen</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tool: false,
            tutorialData: {
                title: null,
                description: null,
                link: null
            }
        }
    },
    mounted() {
        this.fetchTool();
    },
    methods: {
        async fetchTool() {
            const tool = this.$route.params.tool;
            if(typeof tool !== 'undefined') {
                const url = `${process.env.API_URL}/tool/${tool}`;
                const { data } = await this.$axios.get(url);
                this.tool = data;
            }
        },
        async addTutorial() {
            // If tool ID param is set, add to payload
            if(typeof this.$route.params.tool !== 'undefined') {
                this.tutorialData.tool = this.$route.params.tool;
            }
            const url = `${process.env.API_URL}/tutorial/create`;
            try {
                const { status, data } = await this.$axios.post(url, this.tutorialData);
                if(status == 200) {
                    const redirect = `/tutorial/${data.id}`;
                    this.$router.push(redirect);
                }
            } catch (e) {
                const text = 'Error adding tutorial';
                alert(text);
                console.log(text, e);
            }
        }
    }
}
</script>
