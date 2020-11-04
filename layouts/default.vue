<template>
    <div>
        <b-navbar toggleable="md" variant="secondary" type="dark">
            <b-navbar-brand href="/">
                <img class="logo" src="/logo.svg" alt="dialogikTV Brand">
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="mx-md-2">
                    <b-nav-item href="/tools">Tools</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="mx-md-2">
                    <b-nav-item href="/tutorials">Tutorials</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="mx-md-2">
                    <b-nav-item href="/collections">Sammlungen</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto text-center">
                    <div class="mr-md-3 mb-3 mb-md-0 mt-md-1">
                        <a target="_blank" href="https://twitter.com/dialogikTV"><font-awesome-icon :icon="['fab', 'twitter']" class="text-light mr-1" /></a>
                        <a target="_blank" href="https://www.twitch.tv/dialogikTV"><font-awesome-icon :icon="['fab', 'twitch']" class="text-light mr-1" /></a>
                        <a target="_blank" href="https://discord.com/invite/EB6BQPf"><font-awesome-icon :icon="['fab', 'discord']" class="text-light mr-1" /></a>
                        <a target="_blank" href="https://www.youtube.com/channel/UC3_VXw2npQMGZwfqMXuHRdA"><font-awesome-icon :icon="['fab', 'youtube']" class="text-light mr-1" /></a>

                    </div>
                    <div v-if="$auth.loggedIn">
                        <small class="text-light">{{ $auth.user.username }}</small>
                        <button @click="$auth.logout()" class="btn btn-sm btn-danger ml-3">Logout</button>
                    </div>
                    <div v-else class="mt-5 mt-md-0">
                        <div class="d-inline">
                            <n-link :to="'/login'" class="btn btn-sm btn-light">Login</n-link>
                        </div>
                        <div class="ml-1 d-inline">
                            <n-link :to="'/register'" class="btn btn-sm btn-primary">Registrieren</n-link>
                        </div>
                    </div>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <nuxt id="main" class="bg-secondary text-light py-5" />
    </div>
</template>

<style scoped>
#main {
    /* Subtract navbar (56px) from first container */
    min-height: calc(100vh - 56px);
}

.logo {
    width: 100px;
}
</style>
