<template>
    <div>
        <NavbarItem :variant="'secondary'" :type="'dark'" />
        <nuxt id="main" class="bg-secondary text-light py-5" />
    </div>
</template>

<script>
import NavbarItem from '~/components/NavbarItem.vue';

export default {
    components: {
        NavbarItem
    }
}
</script>

<style scoped>
#main {
    /* Subtract navbar (56px) from first container */
    min-height: calc(100vh - 56px);
}
</style>
