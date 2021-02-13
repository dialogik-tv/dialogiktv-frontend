<template>
    <div class="parent">
        <div class="box">
            <font-awesome-icon icon="circle-notch" class="fa-spin fa-3x" />
            <nuxt />
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.parent {
    display: grid;
    place-items: center;
    background-color: #00acee;
    height: 100vh;
    color: #fff;
    font-size: 3em;
}
</style>
