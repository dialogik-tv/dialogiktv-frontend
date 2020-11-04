<template>
    <div class="logo-holder text-center">
        <img class="logo" src="/logo_dark.svg" alt="dialogikTV Logo">
    </div>
</template>

<style scoped>
.logo {
    animation: 1.5s appear;
    margin: auto;
    max-width: 420px;
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
