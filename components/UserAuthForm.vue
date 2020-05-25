<template>
    <form>
        <input type="text" v-model="userInfo.username" v-if="hasName" />

        <input type="email" v-model="userInfo.email" />

        <input type="password" v-model="userInfo.password" />

        <button v-on:click="submitForm(userInfo)">{{ buttonText }}</button>
    </form>
</template>

<script>
    import validations from "@/utils/validations";

    export default {
        data() {
            return {
                valid: false,
                showPassword: false,
                hasName: false,
                userInfo: {
                    email: '',
                    password: ''
                },
                ...validations
            }
        },
        props: ["submitForm", "buttonText", "hasName"]
    }
</script>

<style lang="scss" scoped>

</style>
