<template>
    <div>
        <input type="text" v-model="userInfo.username" v-if="hasName" />
        <input type="email" v-model="userInfo.email" />
        <input type="password" v-model="userInfo.password" />
        <button v-on:click="submitForm(userInfo)">{{ buttonText }}</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {
                    email: 'moritz@dialogik.tv',
                    password: 'test-123!'
                }
            }
        },
        props: ["submitForm", "buttonText", "hasName"]
    }
</script>

<style lang="scss" scoped>

</style>
