<script>
export default {
    layout: 'redirect',
    created() {
        // Use replace() instead of push() to prevent history
        this.$router.replace(`/tools/${this.encodeFilter}`);
    },
    computed: {
        encodeFilter: function() {
            return encodeURIComponent(JSON.stringify({
                term: '',
                category: [this.$route.params.index],
                tag: [],
                sortBy: 'createdAt',
                sort: 'desc'
            }))
        }
    }
}
</script>