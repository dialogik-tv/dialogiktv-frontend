<template>
    <div>
        <input type="text" v-model="userInfo.username" v-if="isRegistration" placeholder="Username" />
        <input type="text" v-model="userInfo.firstname" v-if="isRegistration" placeholder="Vorname" />
        <input type="text" v-model="userInfo.lastname" v-if="isRegistration" placeholder="Nachname" />
        <input type="email" v-model="userInfo.email" placeholder="E-Mail" />
        <input type="password" v-model="userInfo.password" placeholder="Passwort" />
        <button v-on:click="submitForm(userInfo)">{{ buttonText }}</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {
                    username: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: ''
                }
            }
        },
        props: ["submitForm", "buttonText", "isRegistration"]
    }
</script>

<style lang="scss" scoped>

</style>
