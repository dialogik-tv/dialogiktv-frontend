<template>
    <div>
        <navbar />
        <div class="container">
            <tools />
        </div>
    </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Tools from '~/components/Tools.vue';

export default {
    components: {
        Navbar,
        Tools
    }
}
</script>
