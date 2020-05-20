<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <n-link :to="'/'" class="navbar-brand">dialogikTV</n-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <n-link :to="'/app/tools'" class="nav-link">Tools</n-link>
                </li>
                <!-- <li class="nav-item">
                    <a class="nav-link" href="/app/tutorials">Tutorials</a>
                </li> -->
                <!-- <li class="nav-item">
                    <a class="nav-link" href="/app/news">News</a>
                </li> -->
                <!-- <li class="nav-item">
                    <a class="nav-link" href="/app/users">Users</a>
                </li> -->
            </ul>
            <div>
                <div v-if="$auth.loggedIn">
                    {{ $auth.user.username }}
                    <button class="btn btn-danger">Logout</button>
                </div>
                <div v-else>
                    <button class="btn btn-sm btn-outline-light">Login</button>
                    <button class="btn btn-sm btn-light">Register</button>
                </div>
                <UserAuthForm buttonText="Login" v-bind:submitForm="loginUser" />
            </div>
            <!-- <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> -->
        </div>
    </nav>
</template>

<script>
    import UserAuthForm from '@/components/UserAuthForm'

    export default {
        components: {
            UserAuthForm
        },
        methods: {
            loginUser () {
                alert('You pressed login button')
            }
        }
    }
</script>
