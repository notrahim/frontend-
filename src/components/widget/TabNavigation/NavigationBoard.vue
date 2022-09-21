<template>
  <v-card elevation="0" color="transparent" width="100%" class="pa-2">
    <v-row>
      <v-col
        cols="12" class="d-flex justify-center">  
      <v-list-item v-if="mode=='dashboard'" v-for="(link, i) in links_dashboard" :key="i" :to="link.to">
      <NavigationCard :value="link.title"/>
    </v-list-item>
      <v-list-item v-if="mode=='create'" v-for="i in links_create" :key="i">
        <v-hover v-slot="{ hover }">
        <v-card
          height="65"
          width="250"
          class="rounded-xl"
          color="#2C2C2C"
          :elevation="hover ? 0 : 12"
          :class="{ 'on-hover': hover }">
          <div class="d-flex align-center justify-center pa-2" @click="activeTab(i.title)">
            <v-card-title
              v-text=i.title
              class="white--text text-center"
            ></v-card-title>
          </div>
        </v-card>
      </v-hover>
      </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    components: {
      NavigationCard: () =>
        import("@/components/widget/TabNavigation/NavigationCard.vue"),
    },
    props: ['data', 'mode', 'value'],
    data: () => ({
      test : null,
      links_dashboard: [
        {
          title: "Publication au JAL",
          to: "/dashboard",
        },
        {
          title: "Générer une nouvelle formalité",
          to: "/create#",
        },
        { title: "Suivi de formalités",  
          to: "/pending" 
        },
        { title: "Alerte de formalités",
          to: "/alert" },
      ],
      links_create: [
        { title: "Immatriculation"},
        { title: "Modification"},
        { title: "Etablissement"},
        { title: "Radiation"},
      ],
    }),
    computed: {
      show: {
        get() {
          return this.value;
        },
      },
      isLoggedIn: function () {
        return this.$store.getters.isAuthenticated;
      },
    },
    methods: {
      activeTab(a){
        this.value = a
        console.log(this.value)
        this.$emit('theCurrentView', this.value)
      }
    }
  };
  </script>



<style lang="scss">
  .v-card .on-hover {
    background: linear-gradient(136.7deg, #f0a443 0.28%, #3136cb 101.37%);
    color: white;
  }
  </style>