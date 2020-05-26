<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <n-link :to="'/'" class="navbar-brand">
                <img class="logo" src="/logo.svg" alt="dialogikTV Brand">
            </n-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item px-md-3">
                        <n-link :to="'/app/tools'" class="nav-link text-primary">Tools</n-link>
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
                    <div v-if="$auth.loggedIn" class="mr-2">
                        <small class="text-muted">{{ $auth.user.username }}</small>
                        <!-- <button v-on:click="$auth.logout()" class="btn btn-danger">Logout</button> -->
                    </div>
                    <div v-else>
                        <n-link :to="'/login'" class="btn btn-sm btn-outline-light">Login</n-link>
                        <n-link :to="'/register'" class="btn btn-sm btn-light">Register</n-link>
                    </div>
                </div>
                <!-- <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> -->
            </div>
        </nav>
        <nuxt />
    </div>
</template>

<style scoped>
.logo {
    width: 100px;
}

.nav-item {
    font-weight: 600;
    text-transform: uppercase;
}

.nav-item::first-letter {
    font-size: 1.3em;
}
</style>
