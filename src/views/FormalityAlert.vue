<template>
  <v-container>
  <v-card 
    width="400" 
    height="100%" 
    class="rounded-xl pa-5 ma-5" 
    :elevation="12" 
    v-for="project in suivi_formalite" 
    :key="project.id">
    <v-row align="center" class="justify-space-between">
      <div>
      <v-card-title class="font-weight-black py-0">{{project.company}}</v-card-title>
      <v-card-text class="py-0">{{project.task}}</v-card-text>
    </div> 
      <v-chip color="accent" class="font-weight-black">{{getDifferenceInDays(project.day)}}</v-chip>
  </v-row>
  </v-card>
</v-container>
</template>


<script>
import axios from "axios";

export default {
  data(){ return {

    alert:[],
    values:[],
    suivi_formalite:[],
    formaliteName:'',
    dateAction:'',
    formaliteName:'',
    companyName:'',
    status:'',
    datesArray: [],
  
  }},
   async mounted() {
       await this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const headers = {
          authorization: "Bearer " + this.$store.state.auth.user.token,
        };
        let suivi_formalite = await axios.get("task", {
          headers,
        });
          this.suivi_formalite = suivi_formalite.data
          this.eventsObjects = suivi_formalite.data.map(function (value) 
        {
        return {
          date : value.day,
        };
      });
      this.alert = this.eventsObjects.filter((value) => value.date )
      console.log("Alert" , this.alert)
      }catch (error) {
          console.log(error)
      }

    },
    getDifferenceInDays(b) {
      const date1 = new Date()
      const date2 = new Date(b)
      const diffdata = Math.abs(date2- date1)
      const diffDays = Math.ceil(diffdata / (1000 * 60 * 60 * 24)); 
      if (date1 < date2){
        return `Il vous reste ${diffDays} jours`
      } else {
          return `${diffDays} jours de retard`
      }
    }   
  },
};
</script>

<style>
.chart {
  width: 100%;
  height: 400px;
}

.project.true{
border-left: 4px solid green;
}
.project.false{
border-left: 4px solid red
}

</style>
```