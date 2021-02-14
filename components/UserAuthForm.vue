<template>
    <b-form @submit.prevent="checkAndSubmitForm(form)" autocomplete="off">
        <!-- Username -->
        <b-form-row v-if="isRegistration">
            <b-col md="3">
                <label id="input-username-label" label-for="input-username">Username</label>
            </b-col>
            <b-col md="9">
                <b-form-input
                    id="input-username"
                    name="input-username"
                    v-model.trim="$v.form.username.$model"
                    :state="validateState('username')"
                    aria-describedby="input-username-feedback"
                ></b-form-input>

                <b-form-invalid-feedback
                    id="input-username-feedback"
                >Dieses Feld ist ein Pflichtfeld, muss zwischen 4 und 24 Zeichen lang sein und darf nur alphanumerische Zeichen enthalten.</b-form-invalid-feedback>
            </b-col>
        </b-form-row>

        <!-- Email -->
        <b-form-row class="mt-2">
            <b-col md="3">
                <label id="input-email-label" label-for="input-email">Email</label>
            </b-col>
            <b-col md="9">
                <b-form-input
                    type="email"
                    id="input-email"
                    name="input-email"
                    v-model.trim="$v.form.email.$model"
                    :state="validateState('email')"
                    aria-describedby="input-email-feedback"
                ></b-form-input>

                <b-form-invalid-feedback
                    id="input-email-feedback"
                >Dieses Feld ist ein Pflichtfeld und muss eine gültige Emailadresse sein.</b-form-invalid-feedback>
            </b-col>
        </b-form-row>

        <!-- Password -->
        <b-form-row class="mt-2">
            <b-col md="3">
                <label id="input-password-label" label-for="input-password">Passwort</label>
            </b-col>
            <b-col md="9">
                <b-form-input
                    type="password"
                    id="input-password"
                    name="input-password"
                    v-model="$v.form.password.$model"
                    :state="validateState('password')"
                    aria-describedby="input-password-feedback"
                ></b-form-input>

                <b-form-invalid-feedback
                    id="input-email-feedback"
                >Dieses Feld darf (selbstverständlich) nicht leer sein.</b-form-invalid-feedback>
            </b-col>
        </b-form-row>

        <!-- Firstname -->
        <b-form-row v-if="isRegistration" class="mt-2">
            <b-col md="3">
                <label id="input-firstname-label" label-for="input-firstname">Vorname</label>
            </b-col>
            <b-col md="9">
                <b-form-input
                    id="input-firstname"
                    name="input-firstname"
                    v-model.trim="$v.form.firstname.$model"
                    :state="validateState('firstname')"
                    aria-describedby="input-firstname-feedback"
                ></b-form-input>

                <b-form-invalid-feedback
                    id="input-firstname-feedback"
                >Dieses Feld muss zwischen 2 und 30 Zeichen lang sein.</b-form-invalid-feedback>
            </b-col>
        </b-form-row>

        <!-- Lastname -->
        <b-form-row v-if="isRegistration" class="mt-2">
            <b-col md="3">
                <label id="input-lastname-label" label-for="input-lastname">Nachname</label>
            </b-col>
            <b-col md="9">
                <b-form-input
                    id="input-lastname"
                    name="input-lastname"
                    v-model.trim="$v.form.lastname.$model"
                    :state="validateState('lastname')"
                    aria-describedby="input-lastname-feedback"
                ></b-form-input>

                <b-form-invalid-feedback
                    id="input-lastname-feedback"
                >Dieses Feld muss zwischen 2 und 40 Zeichen lang sein.</b-form-invalid-feedback>
            </b-col>
        </b-form-row>
        
        <div class="text-right mt-3">
            <button type="submit" class="btn btn-lg btn-light">{{ buttonText }}</button>
        </div>
    </b-form>
</template>

<script>
const { validationMixin, default: Vuelidate } = require('vuelidate');
const { required, requiredIf, minLength, maxLength, email, alphaNum, helpers } = require('vuelidate/lib/validators');
const alphaNumAndUmlaute = helpers.regex('alphaNumAndUmlaute', /^[A-Za-zÀ-ž0-9\u0370-\u03FF\u0400-\u04FF]+$/);

export default {
    mixins: [validationMixin],
    data() {
        return {
            form: {
                username: null,
                firstname: null,
                lastname: null,
                email: null,
                password: null
            }
        }
    },
    props: ["submitForm", "buttonText", "isRegistration"],
    computed: {
        isRegistrationForm() {
            return this.isRegistration;
        }
    },
    validations: {
        form: {
            username: {
                required: requiredIf('isRegistrationForm'),
                minLength: minLength(4),
                maxLength: maxLength(24),
                alphaNumAndUmlaute
            },
            email: {
                required,
                email
            },
            password: {
                required
            },
            firstname: {
                minLength: minLength(2),
                maxLength: maxLength(30)
            },
            lastname: {
                minLength: minLength(2),
                maxLength: maxLength(40)
            }
        }
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        checkAndSubmitForm(form) {
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

    	    // Pass to parent form submission handling
            return this.submitForm(form);
        }
    }
}
</script>

<style scoped>

</style>
