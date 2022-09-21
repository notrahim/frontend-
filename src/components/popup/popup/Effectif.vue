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
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dater"
        transition="scale-transition"
        offset-y
        min-width="290px">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dater"
            label="Date du premier contrat"
            readonly
            v-bind="attrs"
            dense
            outlined
            v-on="on"
            prepend-inner-icon="mdi-calendar-month"
          ></v-text-field>
        </template>
        <v-date-picker locale="fr-FR" v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)"
            >OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    </v-row>
    <v-row v-if="cerfa=='M2'" class="rows">
      <v-col>
      <v-text-field class="rows" outlined v-model="Etab" dense label="Effectif etablissement"></v-text-field>
    </v-col>
    <v-col>
      <v-text-field class="rows" outlined v-model="VRP" dense label="VRP"></v-text-field>
    </v-col>
    </v-row>
    </v-container>
  </v-card>
</template>

<script>  
  import dateMixin from '../../../mixins/dateMixin'
  export default {
  props: ['id', 'cerfa'],
  
  data() {
    return {
      date: null,
      menu: false,
      on: false,
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
        EffectifDernierContrat: this.computedDate,
        EffectifEffectif: this.Effectif,
        EffectifApprenti: this.Apprenti,
        EffectifVRP: this.VRP,
        EffectifEtab: this.Etab,
      };
      return data;
    },
  },
  mixins: [dateMixin]
  };
  </script>
  
  <style>
    .rows {
      padding-top: 0;
      padding-bottom: 0;
      margin-top: 0;
    }
  </style>