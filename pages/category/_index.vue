<script>
export default {
    layout: 'redirect',
    created() {
        this.$router.push(`/tools/${this.encodeFilter}`);
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