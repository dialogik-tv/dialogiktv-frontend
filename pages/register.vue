<template>
    <div>
        <h1>Register</h1>

        <UserAuthForm buttonText="Register" v-bind:submitForm="registerUser" isRegistration="true" />
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
