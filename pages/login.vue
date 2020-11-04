<template>
    <div>
        <div class="container">
            <div class="login-container">
                <h1 class="display-1 mb-5">Login</h1>
                <UserAuthForm buttonText="Login" :submitForm="loginUser" />
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
        async loginUser(loginInfo) {
            await this.$auth.loginWith('local', {
                data: {
                    email: loginInfo.email,
                    password: loginInfo.password
                }
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

.login-container {
    margin-top: -6em;
    min-width: 420px;
}
</style>
