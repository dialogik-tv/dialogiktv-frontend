<script>
export default {
    layout: 'redirect',
    created() {
        // Use replace() instead of push() to prevent history
        this.$router.replace(`/tools/${this.encodeFilter}`);
    },
    computed: {
        encodeFilter: function() {
            return JSON.stringify({
                term: '',
                category: [],
                tag: [this.$route.params.index],
                sortBy: 'createdAt',
                sort: 'desc'
            }).substring(1).slice(0, -1);
        }
    }
}
</script>