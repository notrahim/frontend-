<template>
  <v-card color="transparent" elevation="0">
    <v-card-title class="font-weight-black" style="font-size: 20px"
      >Evenements à venir</v-card-title
    >
    <v-card class="pa-2 ma-2 pb-0 mb-0 rounded-xl" max-height="400">
      <v-row>
        <v-col cols="4" class="month-card flex-column my-0">
          <calendar-sidebar :fetchData="fetchData" :date="date" @change-picker-date="onClickChild" />
        </v-col>
        <v-col cols="8">
          <v-date-picker
            v-model="date"
            no-title
            :events="datesArray"
            locale="fr"
            full-width
            first-day-of-week="0"
            :weekday-format="getDay"
            event-color="secondary"
            @change="getDayEvents(date)"
            :picker-date.sync="pickerDate"
          ></v-date-picker>
          <calendar-events
            :eventsArray="eventsArray"
            :date="date"
            class="event-card"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
export default {
  components: {
    CalendarSidebar: () =>
      import("@/components/widget/Calendar/CalendarSidebar.vue"),
    CalendarEvents: () =>
      import("@/components/widget/Calendar/CalendarEvents.vue"),
  },
  props:['fetchData'],
  data: () => ({
    datesArray: [],
    eventsArray: [],
    eventsObjects:[],
    daysOfWeek: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
    pickerDate: "",
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substring(0, 10),
  }),
  mounted() {
    this.calendar();
    this.datesArray = this.eventsObjects.map((value) => value.date);
  },
  methods: {
    async calendar() {
        this.eventsObjects = this.fetchData.map(function (value) {
          return {
            date: value.day,
            event: value.company + " : " + value.task,
          };
        });
        this.datesArray = this.eventsObjects.map((value) => value.date);
      },
    onClickChild(value) {
      this.pickerDate = value;
    },
    getDay(date) {
      var i = new Date(date).getDay(date);
      return this.daysOfWeek[i];
    },
    getDayEvents(date) {
      var dayEventsArray = this.eventsObjects.filter(
        (obj) => obj.date === date
      );
      this.eventsArray = dayEventsArray.map((value) => value.event);
    },
  },
};
</script>
<style lang="scss">
.month-badge .v-badge__badge {
  height: 15px !important;
  min-width: 15px !important;
  font-size: 10px !important;
}
.month-card {
  border-right: 1px solid rgba(128, 128, 128, 0.2) !important;
}
.event-card {
  border-top: 1px solid rgba(128, 128, 128, 0.2) !important;
}
.v-date-picker-header {
  display: none !important;
}
.v-date-picker-table {
  min-height: 190px !important;
}
.v-date-picker-table table {
  height: 100% !important;
}
.v-btn--active .v-date-picker-table__events {
  display: none !important;
}
.no-uppercase {
  text-transform: unset !important;
}
.v-card .v-card--link::before {
  background: none;
}
</style>
