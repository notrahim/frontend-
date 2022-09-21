<template>
  <v-card elevation="0">
    <div class="d-flex justify-center align-center mb-2 year-card">
      <v-btn icon @click="updateYear(1)">
        <v-icon color="secondary">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="font-weight-bold" v-text="pickerYear"></span>
      <v-btn icon @click="updateYear(2)">
        <v-icon color="secondary">mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <v-item-group v-model="selectedItem" mandatory>
      <div v-for="month in monthArray" :key="month">
        <v-item v-slot="{ active, toggle }">
          <v-card
            tile
            elevation="0"
            @click="
              toggle();
              updateMonth(month);
            "
            :ripple="false"
          >
            <v-card-text
              :class="
                active
                  ? 'py-1 mb-0 font-weight-bold accent--text'
                  : 'py-1 mb-0 font-weight-bold'
              "
            >
              <v-row align="center" no-gutters>
                <v-col cols="10" v-text="month"> </v-col>
                <v-col cols="2">
                  <v-badge
                    color="secondary"
                    :content="datesArray.length"
                    inline
                    class="month-badge"
                  >
                  </v-badge>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-item>
      </div>
    </v-item-group>
  </v-card>
</template>

<script>
export default {
  props: ['date' , 'fetchData'],
  data: () => ({
    datesArray: [],
    monthArray: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    pickerYear: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substring(0, 4),
    pickerDate: "",
    selectedItem: "",
  }),
  computed: {
  deadline() {
    var lastday = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return lastday.toISOString()
  },
  today() {
    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstday.toISOString()
  }
}, 
  mounted() {
    this.calendar()
    this.pickerDate = this.date;
    this.selectedItem = parseInt(this.date.substring(5, 2)) - 1;
  },
  methods: {
    async calendar() {
        this.eventsObjects = this.fetchData.map(function (value) {
          return {
            date: value.day,
            event: value.company + " : " + value.task,
          };
        });
        // this.datesArray = this.eventsObjects.filter((value) => this.today < value.date  && value.date < this.deadline )
        this.datesArray = this.eventsObjects.filter((value) => value.date )
      },
    updateMonth(month) {
      var monthNumber = this.monthArray.indexOf(month) + 1;
      var tmp = this.pickerYear + "-" + monthNumber.toString();
      this.pickerDate = tmp;
      this.updateDate();
    },
    updateYear(nb) {
      var yearInt = parseInt(this.pickerYear);
      if (nb == 1) {
        yearInt = yearInt - 1;
      } else {
        yearInt = yearInt + 1;
      }
      this.pickerYear = yearInt.toString();
      this.pickerDate = this.pickerDate.replace(
        this.pickerDate.substring(0, 4),
        this.pickerYear
      );
      this.updateDate();
    },
    updateDate() {
      this.$emit("change-picker-date", this.pickerDate);
    },
  },
};
</script>
