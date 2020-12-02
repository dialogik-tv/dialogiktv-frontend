<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 offset-lg-2">
                    <div class="mb-3">
                        <small><n-link :to="'/tools'" class="text-light">← zurück zu den Tools</n-link></small>
                    </div>

                    <h1 class="mt-3 mb-5">Tool hinzufügen</h1>

                    <b-form @submit.stop.prevent="addTool" autocomplete="off">
                        <!-- Title -->
                        <b-form-group id="input-title-group" label="Name" label-for="input-title">
                            <b-form-input
                                id="input-title"
                                name="input-title"
                                v-model="$v.form.title.$model"
                                :state="validateState('title')"
                                aria-describedby="input-title-feedback"
                            ></b-form-input>

                            <b-form-invalid-feedback
                                id="input-title-feedback"
                            >Dieses Feld ist ein Pflichtfeld und muss zwischen 3 und 40 Zeichen lang sein.</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- Description -->
                        <b-form-group id="input-description-group" label="Beschreibung" label-for="input-description">
                             <b-form-textarea
                                id="input-description"
                                name="input-description"
                                v-model="$v.form.description.$model"
                                rows="3"
                                ></b-form-textarea>
                        </b-form-group>

                        <!-- Link -->
                        <b-form-group id="input-link-group" label="Link" label-for="input-link">
                            <b-form-input
                                id="input-link"
                                name="input-link"
                                v-model="$v.form.link.$model"
                                :state="validateState('link')"
                                aria-describedby="input-link-feedback"
                            ></b-form-input>

                            <b-form-invalid-feedback
                                id="input-link-feedback"
                            >Dieses Feld ist ein Pflichtfeld und muss eine gültige URL (inkl. http[s]) sein.</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- Documentation Link -->
                        <b-form-group id="input-doclink-group" label="Link zur Dokumentation" label-for="input-doclink">
                            <b-form-input
                                id="input-doclink"
                                name="input-doclink"
                                v-model="$v.form.doclink.$model"
                                :state="validateState('doclink')"
                                aria-describedby="input-doclink-feedback"
                            ></b-form-input>

                            <b-form-invalid-feedback
                                id="input-doclink-feedback"
                            >Dieses Feld muss eine gültige URL (inkl. http[s]) sein.</b-form-invalid-feedback>
                        </b-form-group>

                        <h2 class="mt-5 mb-3">Informationen zum Anbieter</h2>

                        <!-- Vendor -->
                        <b-form-group id="input-vendor-group" label="Anbieter" label-for="input-vendor">
                            <b-form-input
                                id="input-vendor"
                                name="input-vendor"
                                v-model="$v.form.vendor.$model"
                                :state="validateState('vendor')"
                                aria-describedby="input-vendor-feedback"
                            ></b-form-input>

                            <b-form-invalid-feedback
                                id="input-vendor-feedback"
                            >Dieses Feld muss zwischen 2 und 40 Zeichen lang sein.</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- Vendor Link -->
                        <b-form-group id="input-vendorlink-group" label="Link zum Anbieter" label-for="input-vendorlink">
                            <b-form-input
                                id="input-vendorlink"
                                name="input-vendorlink"
                                v-model="$v.form.vendorlink.$model"
                                :state="validateState('vendorlink')"
                                aria-describedby="input-vendorlink-feedback"
                            ></b-form-input>

                            <b-form-invalid-feedback
                                id="input-vendorlink-feedback"
                            >Dieses Feld muss eine gültige URL (inkl. http[s]) sein.</b-form-invalid-feedback>
                        </b-form-group>

                        <div class="mt-5">
                            <button type="submit" class="btn btn-lg btn-primary">Tool hinzufügen</button>
                        </div>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const { validationMixin, default: Vuelidate } = require('vuelidate')
const { required, minLength, maxLength, url, alphaNum } = require('vuelidate/lib/validators')

export default {
    mixins: [validationMixin],
    data() {
        return {
            form: {
                title: null,
                description: null,
                link: null,
                vendor: null,
                vendorlink: null,
                doclink: null
            }
        };
    },
    validations: {
        form: {
            title: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(40)
            },
            description: {},
            link: {
                required,
                url
            },
            doclink: {
                url
            },
            vendor: {
                minLength: minLength(2),
                maxLength: maxLength(40)
            },
            vendorlink: {
                url
            }
        }
    },
    methods: {
        async addTool() {
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            }

            const url = `${process.env.API_URL}/tool/create`;
            try {
                const { status, data } = await this.$axios.post(url, this.form);
                if(status == 200) {
                    const redirect = `/tool/${data.slug}`;
                    this.$router.push(redirect);
                }
            } catch (e) {
                const text = 'Error adding tool';
                alert(text);
                console.log(text, e);
            }
        },
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        resetForm() {
            this.form = {
                title: null,
                description: null,l,
                link: null,
                doclink: null,
                vendor: null,
                vendorlink: null
            };

            this.$nextTick(() => {
                this.$v.$reset();
            });
        }
    }
}
</script>
