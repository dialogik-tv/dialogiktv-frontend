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
                                v-model.trim="$v.form.title.$model"
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
                                v-model.trim="$v.form.description.$model"
                                rows="3"
                                max-rows="20"
                                ></b-form-textarea>
                        </b-form-group>

                        <!-- Link -->
                        <b-form-group id="input-link-group" label="Link" label-for="input-link">
                            <b-form-input
                                type="url"
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
                        <b-form-group id="input-docLink-group" label="Link zur Dokumentation" label-for="input-docLink">
                            <b-form-input
                                type="url"
                                id="input-docLink"
                                name="input-docLink"
                                v-model="$v.form.docLink.$model"
                                :state="validateState('docLink')"
                                aria-describedby="input-docLink-feedback"
                            ></b-form-input>

                            <b-form-invalid-feedback
                                id="input-docLink-feedback"
                            >Dieses Feld muss eine gültige URL (inkl. http[s]) sein.</b-form-invalid-feedback>
                        </b-form-group>

                        <h2 class="mt-5 mb-3">Informationen zum Anbieter</h2>

                        <!-- Vendor -->
                        <b-form-group id="input-vendor-group" label="Anbieter" label-for="input-vendor">
                            <b-form-input
                                id="input-vendor"
                                name="input-vendor"
                                v-model.trim="$v.form.vendor.$model"
                                :state="validateState('vendor')"
                                aria-describedby="input-vendor-feedback"
                            ></b-form-input>

                            <b-form-invalid-feedback
                                id="input-vendor-feedback"
                            >Dieses Feld muss zwischen 2 und 40 Zeichen lang sein.</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- Vendor Link -->
                        <b-form-group id="input-vendorLink-group" label="Link zum Anbieter" label-for="input-vendorLink">
                            <b-form-input
                                type="url"
                                id="input-vendorLink"
                                name="input-vendorLink"
                                v-model="$v.form.vendorLink.$model"
                                :state="validateState('vendorLink')"
                                aria-describedby="input-vendorLink-feedback"
                            ></b-form-input>

                            <b-form-invalid-feedback
                                id="input-vendorLink-feedback"
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
const { validationMixin, default: Vuelidate } = require('vuelidate');
const { required, minLength, maxLength, url, helpers } = require('vuelidate/lib/validators');
const alphaNumAndWhitespaces = helpers.regex('alphaNumAndWhitespaces', /^[0-9A-Za-zÀ-ž\u0370-\u03FF\u0400-\u04FF\s]+$/);

export default {
    mixins: [validationMixin],
    data() {
        return {
            form: {
                title: null,
                description: null,
                link: null,
                vendor: null,
                vendorLink: null,
                docLink: null
            }
        };
    },
    validations: {
        form: {
            title: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(40),
                alphaNumAndWhitespaces
            },
            description: {},
            link: {
                required,
                url
            },
            docLink: {
                url
            },
            vendor: {
                minLength: minLength(2),
                maxLength: maxLength(40)
            },
            vendorLink: {
                url
            }
        }
    },
    methods: {
        async addTool() {
            // Transform empty string ('') to null value (API allows null but no empty strings)
            const keys = Object.keys(this.form);
            keys.forEach((key, index) => {
                if(this.form[key] === '') {
                    this.form[key] = null
                }
            });

            // Check for form errors before submit
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            }

            // Pass user data to API
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
                description: null,
                link: null,
                docLink: null,
                vendor: null,
                vendorLink: null
            };

            this.$nextTick(() => {
                this.$v.$reset();
            });
        }
    },
    created() {
        if(!this.$auth.user) {
            this.$router.push('/tools');
        }
    },
}
</script>
