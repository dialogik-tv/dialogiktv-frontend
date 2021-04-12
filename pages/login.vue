<template>
    <div>
        <div class="container">
            <div class="login-container">
                <h1 class="display-1 mb-5">Login</h1>

                <div v-if="error">
                    <b-alert variant="danger" show><strong>Fehler:</strong> {{ error }}</b-alert>
                </div>

                <user-auth-form buttonText="Login" :submitForm="loginUser" />
            </div>
        </div>
    </div>
</template>

<script>
import UserAuthForm from '~/components/UserAuthForm.vue';

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
        async loginUser(loginInfo) {
            try {
                await this.$auth.loginWith('local', {
                    data: {
                        email: loginInfo.email,
                        password: loginInfo.password
                    }
                });
                this.error = false;
                this.$router.push('/tools');
            } catch(e) {
                const status = e.response.status;
                if(status == 401) {
                    this.error = "Der Login ist fehlgeschlagen, bitte überprüfe Benutzername und Passwort.";
                } else {
                    this.error = "Es ist ein Fehler beim Login aufgetreten. Bitte versuche es erneut.";
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

.login-container {
    margin-top: -6em;
    min-width: 420px;
}
</style>
