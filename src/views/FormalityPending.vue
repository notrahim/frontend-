<template>
  <v-container>
  <v-card 
    width="400" 
    height="100%" 
    class="rounded-xl pa-5 ma-5" 
    :elevation="8" 
    v-for="project in products" 
    :key="project.id">
    <v-row align="center" class="justify-space-between">
      <div>
        <v-card-title class="font-weight-black py-0">{{project.companyName}}</v-card-title>
        <v-card-text class="py-0">{{project.formaliteName}}</v-card-text>
      </div>
      <v-chip v-if="project.status" class="ma-2" color="green" right outlined>Validé</v-chip>
      <v-chip v-else class="ma-2" color="orange" right outlined>En attente</v-chip>
  </v-row>
  </v-card>
</v-container>
</template>

<script>
 export default {
   data() { 
    return {
     companyName:'',
     datesArray: [],
   }},
  computed: {
    products(){
    return this.$store.state.fiche.pending
      },
    },
    mounted(){
      this.$store.dispatch("fetchPending", this.$store.state.auth.user.token)
    }
}
 </script>

<style lang="scss">
  .chart {
   width: 100%;
   height: 400px;
 }
  .disableEvent {
    pointer-events: none;
  }
  .v-card__title {
    word-break: normal !important;
    line-height: 1.3rem !important;
  }
  .v-card .on-hover {
    background: linear-gradient(136.7deg, #f0a443 0.28%, #3136cb 101.37%);
    cursor:grabbing;
    color: white;
  }
  </style>
  