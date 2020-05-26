<template>
    <div class="logo-holder text-center">
        <img class="logo" src="/logo.svg" alt="dialogikTV Logo">
    </div>
</template>

<style scoped>
.logo {
    animation: 3s appear;
    margin: auto;
    max-width: 640px;
}

@keyframes appear {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
