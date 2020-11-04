<template>
    <div>
        <div class="container">
            <div class="registration-container">
                <h1 class="display-4 mb-5">Neuen Account anlegen</h1>
                <UserAuthForm buttonText="Registrieren" :submitForm="registerUser" isRegistration="true" />
            </div>
        </div>
    </div>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
    layout: 'landing',
    components: {
        UserAuthForm
    },
    methods: {
        async registerUser(registrationInfo) {
            let url = `${process.env.API_URL}/register`;
            await this.$axios.post(url, registrationInfo);
            await this.$auth.loginWith('local', {
                data: registrationInfo
            });
            this.$router.push('/');
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
