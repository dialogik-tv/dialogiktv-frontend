<template>
    <div>
        <div class="container">
            <div class="registration-container">
                <h1 class="display-4 mb-5">Neuen Account anlegen</h1>

                <div v-if="error">
                    <b-alert variant="danger" show><strong>Fehler:</strong> {{ error }}</b-alert>
                </div>

                <UserAuthForm buttonText="Registrieren" :submitForm="registerUser" :isRegistration="true" />
            </div>
        </div>
    </div>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm';

export default {
    layout: 'landing',
    components: {
        UserAuthForm
    },
    data() {
        return {
            error: false
        };
    },
    methods: {
        async registerUser(registrationInfo) {
            try {
                let url = `${process.env.API_URL}/register`;
                await this.$axios.post(url, registrationInfo);
                await this.$auth.loginWith('local', {
                    data: registrationInfo
                });
                this.error = false;
                this.$router.push('/tools');
            } catch(e) {
                const status = e.response.status;
                if(status == 422) {
                    this.error = "Die eingebenen Daten sind nicht valide. Bitte achte auf die Hinweise.";
                } else {
                    this.error = "Es ist ein Fehler bei der Registrierung aufgetreten. Bitte versuche es erneut.";
                }
            }
        }
    }
}
</script>

<style scoped>
.container {
    margin: 0 auto;
    min-height: calc(100vh - 54px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.registration-container {
    margin-top: -6em;
}
</style>
