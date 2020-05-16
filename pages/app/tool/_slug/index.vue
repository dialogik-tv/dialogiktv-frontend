<template>
    <div>
        <navbar />
        <div class="container">
            <tool />
        </div>
    </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Tool from '~/components/Tool.vue';

export default {
    components: {
        Navbar,
        Tool
    }
}
</script>
