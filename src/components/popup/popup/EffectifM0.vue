<template>
    <v-card>
      <v-row class="pa-2 pt-0">
        <v-card-title>Effectif à déclarer</v-card-title>
        <v-checkbox color="accent" v-model="show">
        </v-checkbox>
      </v-row>
      <v-container v-if="show">
      <v-row class="rows">
          <v-col cols="4">
            <v-text-field
              label="Effectif"
              v-model="Effectif"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Apprentis"
              v-model="Apprenti"
              dense
              outlined 
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            Premier salarié
        <v-switch v-model="PremierEmploi"></v-switch>
        </v-col>
      </v-row>
      </v-container>
    </v-card>
  </template>
  
  <script>  
    export default {
    props: ['id', 'cerfa'],
    
    data() {
      return {
        menu: false,
        on: false,
        PremierEmploi: false,
        activator: null,
        show: false,
        activator: null,
        dater: '',
        Effectif: null,
        Apprenti: null,
        VRP: null,
        Etab: null
      };
    },
    computed: {
      postData() {
        const data = {
          EffectifEffectif: this.Effectif,
          EffectifApprenti: this.Apprenti,
          PremierEmploi: this.PremierEmploi
        };
        return data;
      },
    },
    };
    </script>
    
    <style>
      .rows {
        padding-top: 0;
        padding-bottom: 0;
        margin-top: 0;
      }
    </style>