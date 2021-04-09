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
                category: [],
                tag: [this.$route.params.index],
                sortBy: 'createdAt',
                sort: 'desc'
            }))
        }
    }
}
</script>