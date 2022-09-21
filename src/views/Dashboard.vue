<template>
  <v-container>
    <v-row><navigation-board mode='dashboard'/></v-row>
    <v-row width="100%">
      <v-col cols="6">
        <v-row width="100%">
          <summary-board :fetchData="task"/>
        </v-row>
        <v-row width="100%">
          <formalities-board :fetchData="pending"/>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-row width="100%">
          <progress-board :fetchData="pending"/>
        </v-row>
        <v-row width="100%">
          <calendar  :fetchData="task"/>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  
  components: {
    Calendar: () => import("@/components/widget/Calendar/Calendar.vue"),
    SummaryBoard: () => import("@/components/widget/Summary/SummaryBoard.vue"),
    ProgressBoard: () => import("@/components/widget/Progress/ProgressBoard.vue"),
    FormalitiesBoard: () => import("@/components/widget/Formalities/FormalitiesBoard.vue"),
    NavigationBoard: () => import("@/components/widget/TabNavigation/NavigationBoard.vue"),
},
data(){ return {
  fetchData:[],
  mode: null,
}},
computed: {
    pending(){
    return this.$store.state.fiche.pending
      },
    task(){
    return this.$store.state.fiche.task
      },
    },
    mounted(){
      this.$store.dispatch("fetchPending", this.$store.state.auth.user.token)
      this.$store.dispatch("fetchTask", this.$store.state.auth.user.token)

    }
};
</script>
<style lang="scss"></style>