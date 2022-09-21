```<template>
  <v-card color="transparent" elevation="0">
    <v-card-title class="font-weight-black" style="font-size: 20px"
      >Tableau de bord</v-card-title>
      
    <v-row class="py-0">
      <v-col
        v-for="(card, i) in summaryCards"
        :key="i"
        cols="5"
        class="px-0 py-2 d-flex justify-center"
      >
        <summary-card
          :value="card.value"
          :type="card.type"
          :icon="card.icon"
          :color="card.color"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
import SummaryCard from "./SummaryCard.vue";
export default {
  props: ['propz'],
  components: { SummaryCard },
  data: () => ({
      summaryCards: [
      {
        value: [],
        type: "formalités en attente",
        icon: "mdi-paperclip",
        color: "accent",
      },
      {
        value: [],
        type : "alertes<br/>à venir" ,
        icon: "mdi-bell-ring-outline",
        color: "accent",
        
      },
      {
        type: "Créer demande de régularisation",
        icon: "mdi-plus",
        color: "secondary",
      },
      {
        value: 3,
        type: "demandes<br/>de<br/>régularisation",
        icon: "mdi-clock-time-five-outline",
        color: "accent",
      },
    ],
  }),
  test: '',
      alert:[],
      status:'',

   async mounted() {
         await this.fetchData()
         this.summaryCards[1].value.push(this.alert.length )
    },
    computed: {
  deadline() {
    const d = new Date()
    d.setDate(d.getDate() + 30)
    return d.toISOString()
  },
  today() {
    const d = new Date()
    return d.toISOString()
  }
},
    methods: {
      async fetchData() {
        try {
          const headers = {
            authorization: "Bearer " + this.$store.state.auth.user.token,
          };
          let formalite_pending = await axios.get("task" ,  {
            headers,
          });
          this.eventsObjects = formalite_pending.data.map(function (value) 
          {
          return {
            date : value.day,
            status: value.status,
          };
        });
        this.alert = this.eventsObjects.filter((value) => this.today < value.date  && value.date < this.deadline )
        }catch (error) {
            console.log(error)
        }
  
      },
      
    },

};
</script>
```