<template>
    <div>
        <div v-if="isRegistration" class="form-group row">
            <label class="col-sm-2 col-form-label" for="inputUsername">Username</label>
            <div class="col-sm-10">
                <input v-model="userInfo.username" type="text" class="form-control" id="inputUsername">
            </div>
        </div>
        <div v-if="isRegistration" class="form-group row">
            <label class="col-sm-2 col-form-label" for="inputFirstname">Vorname</label>
            <div class="col-sm-10">
                <input v-model="userInfo.firstname" type="text" class="form-control" id="inputFirstname" placeholder="(optional)">
            </div>
        </div>
        <div v-if="isRegistration" class="form-group row">
            <label class="col-sm-2 col-form-label" for="inputLastname">Nachname</label>
            <div class="col-sm-10">
                <input v-model="userInfo.lastname" type="text" class="form-control" id="inputLastname" placeholder="(optional)">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label" for="inputEmail">E-Mail</label>
            <div class="col-sm-10">
                <input v-model="userInfo.email" type="email" class="form-control" id="inputEmail">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label" for="inputPassword">Passwort</label>
            <div class="col-sm-10">
                <input v-model="userInfo.password" type="password" class="form-control" id="inputPassword" aria-describedby="passwordHelp">
                <small v-if="isRegistration" id="passwordHelp" class="form-text text-muted">Sei weise und wähle ein sicheres Passwort!</small>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-10 offset-sm-2">
                <button v-on:click="submitForm(userInfo)" type="submit" class="btn btn-lg btn-primary">{{ buttonText }}</button>
            </div>
        </div>
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
