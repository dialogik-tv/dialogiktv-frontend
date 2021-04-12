<template>
    <div class="logo-holder text-center">
        <img class="logo" :src="logoUrl" alt="dialogikTV Logo">
    </div>
</template>

<script>
export default {
    computed: {
        logoUrl() {
            let url = '/logo';
            if(this.dark) {
                url += '_dark';
            }
            url += '.svg';
            return url;
        }
    },
    props: ["dark"]
}
</script>

<style scoped>
.logo {
    max-width: 640px;
}
</style>
