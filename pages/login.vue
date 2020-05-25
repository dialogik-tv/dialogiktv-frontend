<template>
    <div>
        <h1>Login</h1>
        UH!
        <UserAuthForm buttonText="Login" v-bind:submitForm="loginUser" />
    </div>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
    components: {
        UserAuthForm
    },
    methods: {
        async loginUser(loginInfo) {
            await this.$auth.loginWith('local', {
                data: loginInfo
            });
            console.log(this.$auth.loggedIn);
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
</style>
