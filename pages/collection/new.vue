<template>
    <div>
        <div class="container">
            <div class="mb-3">
                <small><n-link :to="'/collections'" class="text-light">← zurück zu den Sammlungen</n-link></small>
            </div>

            <h1 class="mt-3">Tutorial hinzufügen</h1>

            <form @submit.prevent="addCollection" autocomplete="off">
                <div class="form-group">
                    <div class="form-group mb-5">
                        <label for="collectionData-title">Name der Sammlung</label>
                        <input type="text" v-model="collectionData.title" class="form-control" id="collectionData-title" required />
                        <small class="form-text">Ein überdachter und wohlformulierter Titel mit 8-120 Zeichen.</small>
                    </div>
                    <div class="form-group mb-5">
                        <label for="collectionData-description">Beschreibung</label>
                        <textarea-autosize
                            class="form-control"
                            v-model="collectionData.description"
                            id="collectionData-description"
                        />
                        <small class="form-text">
                            Beschreibung deiner Sammlung. Du kannst <a target="_blank" href="https://de.wikipedia.org/wiki/Markdown">Markdown</a> verwenden.
                        </small>
                    </div>
                    <button type="submit" class="btn btn-primary">Sammlung erstellen</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            collectionData: {
                title: null,
                description: null
            }
        }
    },
    methods: {
        async addCollection() {
            const url = `${process.env.API_URL}/collection/create`;
            try {
                const { status, data } = await this.$axios.post(url, this.collectionData);
                if(status == 200) {
                    const redirect = `/collection/${data.id}`;
                    this.$router.push(redirect);
                }
            } catch (e) {
                const text = 'Error adding collection';
                alert(text);
                console.log(text, e);
            }
        }
    }
}
</script>
