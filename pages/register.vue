<template>
    <div>
        <h1>Register</h1>

        <UserAuthForm buttonText="Login" v-bind:submitForm="loginUser" hasName="true" />
    </div>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
    components: {
        UserAuthForm
    },
    methods: {
        loginUser(registrationinfo) {
            alert('Log in!');
        }
    }
}
</script>

<style scoped>
</style>
