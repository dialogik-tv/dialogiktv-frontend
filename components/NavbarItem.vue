<template>
    <div>
        <b-navbar toggleable="md" :variant="variant" :type="type">
            <b-navbar-brand href="/">
                <LogoDark class="logo" />
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="mx-md-2">
                    <b-nav-item :class="{ 'nav-item-light': type == 'light' }" href="/tools">Tools</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="mx-md-2">
                    <b-nav-item :class="{ 'nav-item-light': type == 'light' }" href="/tutorials">Tutorials</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="mx-md-2">
                    <b-nav-item :class="{ 'nav-item-light': type == 'light' }" href="/collections">Sammlungen</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-if="$auth.user && $auth.user.isAdmin" class="mx-md-2">
                    <b-nav-item :class="{ 'nav-item-light': type == 'light' }" href="/admin/queue">Queue</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto text-center">
                    <div class="mr-md-3 mb-3 mb-md-0 mt-md-1">
                        <a target="_blank" href="https://twitter.com/dialogikTV"><font-awesome-icon :icon="['fab', 'twitter']" class="text-light mr-1" /></a>
                        <a target="_blank" href="https://www.twitch.tv/dialogikTV"><font-awesome-icon :icon="['fab', 'twitch']" class="text-light mr-1" /></a>
                        <a target="_blank" href="http://discord.dialogik.tv"><font-awesome-icon :icon="['fab', 'discord']" class="text-light mr-1" /></a>
                        <a target="_blank" href="http://youtube.dialogik.tv"><font-awesome-icon :icon="['fab', 'youtube']" class="text-light mr-1" /></a>
                        <a target="_blank" href="https://www.github.com/dialogik-tv"><font-awesome-icon :icon="['fab', 'github']" class="text-light mr-1" /></a>
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
    </div>
</template>

<script>
import LogoDark from '~/components/LogoDark.vue';
import Logo from '~/components/Logo.vue';

export default {
    layout: 'landing',
    props: ['type', 'variant'],
    components: {
        Logo,
        LogoDark
    }
}
</script>

<style scoped>
.logo {
    width: 100px;
}

.nav-item-light > a {
    color: #ffffff !important;
}
</style>