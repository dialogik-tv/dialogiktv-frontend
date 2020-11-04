<template>
    <div>
        <b-navbar toggleable="md" variant="primary" type="dark">
            <!-- <b-navbar-brand href="/">
                <img class="logo" src="/logo.svg" alt="dialogikTV Brand">
            </b-navbar-brand> -->

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- <b-navbar-nav>
                    <b-nav-item href="/tools">Tools</b-nav-item>
                </b-navbar-nav> -->

                <b-navbar-nav class="ml-auto text-center">
                    <div v-if="$auth.loggedIn">
                        <small class="text-light">{{ $auth.user.username }}</small>
                        <button @click="$auth.logout()" class="btn btn-sm btn-danger ml-3">Logout</button>
                    </div>
                    <div v-else class="mt-5 mt-md-0">
                        <div class="d-inline">
                            <n-link :to="'/login'" class="btn btn btn-outline-light">Login</n-link>
                        </div>
                        <div class="d-inline">
                            <n-link :to="'/register'" class="btn btn btn-light">Registrieren</n-link>
                        </div>
                    </div>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <nuxt id="main" class="bg-primary text-light" />
    </div>
</template>

<style scoped>
#main {}
</style>
