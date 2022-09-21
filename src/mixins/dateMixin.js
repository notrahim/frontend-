export default {
    methods: {
    formatDate(dates) {
        if (!dates) return null;
        const [year, month, day] = dates.split("-");
        return `${day}${month}${year}`;
        },
    },
    save (date) {
        this.$refs.menu.save(date)
    },
    computed: {
    computedDate() {
        return this.formatDate(this.date);
      },
    },
    watch: {
        menu (val) {
          val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
}