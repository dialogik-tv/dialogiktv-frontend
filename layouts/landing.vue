<template>
    <div>
        <NavbarItem :variant="'primary'" :type="'light'" />
        <nuxt id="main" class="bg-primary text-light" />
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
</style>
