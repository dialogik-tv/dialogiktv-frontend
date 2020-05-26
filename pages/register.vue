<template>
    <div class="container">
        <h1 class="mb-5">Neuen Account anlegen</h1>

        <UserAuthForm buttonText="Registrieren" v-bind:submitForm="registerUser" isRegistration="true" />
    </div>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
    components: {
        UserAuthForm
    },
    methods: {
        async registerUser(registrationInfo) {
            let url = `${process.env.API_URL}/register`;
            await this.$axios.post(url, registrationInfo);
            this.$auth.loginWith('local', {
                data: registrationInfo
            });
        }
    }
}
</script>

<style scoped>
</style>
