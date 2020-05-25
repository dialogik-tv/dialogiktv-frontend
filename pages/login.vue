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
        loginUser(logininfo) {
            alert('Log in!');
        }
    }
}
</script>

<style scoped>
</style>
