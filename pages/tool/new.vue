<template>
    <div>
        <div class="container">
            <div class="mb-3">
                <small><n-link :to="'/tools'" class="text-light">← zurück zu den Tools</n-link></small>
            </div>

            <h1 class="mt-3 mb-5">Tool hinzufügen</h1>

            <div class="row">
                <div class="col-lg-6">
                    <form @submit.prevent="addTool" autocomplete="off">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="toolData-title">Name</label>
                                <input type="text" v-model="toolData.title" class="form-control" id="toolData-title" />
                                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                            </div>
                            <div class="form-group">
                                <label for="toolData-description">Beschreibung</label>
                                <textarea-autosize
                                    class="form-control"
                                    v-model="toolData.description"
                                    id="toolData-description"
                                />
                            </div>
                            <div class="form-group">
                                <label for="toolData-link">Link</label>
                                <input type="text" v-model="toolData.link" class="form-control" id="toolData-link" />
                            </div>
                            <div class="form-group">
                                <label for="toolData-vendor">Anbieter</label>
                                <input type="text" v-model="toolData.vendor" class="form-control" id="toolData-vendor" />
                            </div>
                            <div class="form-group">
                                <label for="toolData-vendorLink">Link zum Anbieter</label>
                                <input type="text" v-model="toolData.vendorLink" class="form-control" id="toolData-vendorLink" />
                            </div>
                            <button type="submit" class="btn btn-primary">Tool hinzufügen</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            toolData: {
                title: null,
                description: null,
                link: null,
                vendor: null,
                vendorLink: null
            }
        }
    },
    methods: {
        async addTool() {
            const url = `${process.env.API_URL}/tool/create`;
            try {
                const { status, data } = await this.$axios.post(url, this.toolData);
                if(status == 200) {
                    const redirect = `/tool/${data.slug}`;
                    this.$router.push(redirect);
                }
            } catch (e) {
                const text = 'Error adding tool';
                alert(text);
                console.log(text, e);
            }
        }
    }
}
</script>
