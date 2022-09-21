<template>
  <v-card elevation="0" color="transparent" width="97%" class="pr-0">
    <v-card-title class="font-weight-black" style="font-size: 20px"
      >Statistiques</v-card-title>
      <v-row class="py-2 pl-6 pr-0">
      <progress-card mode='Formalités à venir' :fetchData="fetchData" :valid="total.length" :pending="eventsObjects.length" :progressValue="progressValue" />
    </v-row>
    <v-row class="py-2 pl-6 pr-0">
      <progress-card mode='Demande de régularisation :' :fetchData="fetchData" :valid="total.length" :pending="eventsObjects.length" :progressValue="progressValue" />
    </v-row>
 
  </v-card>
</template>

<script>
  import axios from "axios";

export default {
  components: {
    ProgressCard: () => import("@/components/widget/Progress/ProgressCard.vue"),
  },
  data() {
    return {
      mode: null,
      valid: null,
      pending: null,
      total:[],
      eventsObjects: [],
      test: null,
    }
    
  },
  props:['fetchData'],
  async mounted() {
         await this.progressBoard()
    },
computed: {
  progressValue() {
   return (100 * this.total.length / this.eventsObjects.length).toFixed(0)
  },

},
    methods: {
      async progressBoard() {
          this.eventsObjects = this.fetchData.map(function (resp) {
          return {
            status: resp.status,
          };
        });
        this.total = this.eventsObjects.filter((resp) =>  resp.status === true);
        }
  
      },
};
</script>