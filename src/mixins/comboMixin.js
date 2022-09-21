export default {
    methods: {
        filter(item, queryText, itemText) {
              if (item.header) return false;
              const hasValue = (val) => (val != null ? val : "");
              const text = hasValue(itemText);
              const query = hasValue(queryText);
              return (
                text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
                -1
              );
          },
      },
}