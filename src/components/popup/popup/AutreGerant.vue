<template>
    <v-card>
      <v-row class="pa-2 pt-0">
        <v-card-title>Une autre personne que le gérant peut engager la société</v-card-title>
        <v-checkbox color="accent" v-model="ShowGerant"></v-checkbox>
      </v-row>
      <v-container v-if="ShowGerant">
      <h4>Infos personnelles :</h4>
      <v-row>
        <v-col cols="4">
          <v-text-field
            label="Nom"
            v-model="AutreNom"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Prenom"
            v-model="AutrePrenom"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Nationalite"
            v-model="AutreNat"
            dense
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <div>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            color="accent"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Date de naissance"
                prepend-inner-icon="mdi-calendar"
                readonly
                color="accent"
                dense
                outlined
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              color="accent"
              :active-picker.sync="activePicker"
              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
              min="1940-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </div>
        </v-col>
        <v-col cols="2">
          <v-text-field
            label="Departement"
            v-model="AutreNeDpt"
            dense
            outlined
            
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Commune"
            dense
            v-model="AutreNeVille"
            outlined
            
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Pays"
            v-model="AutreNePays"
            dense
            outlined
            
          ></v-text-field>
        </v-col>
      </v-row>
      <h4>Adresse :</h4>
      <v-row>
        <v-col cols="4">
          <v-text-field
            label="Rue"
            v-model="AutreRue"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Code Postal"
            v-model="AutreZip"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Commune"
            dense
            v-model="AutreVille"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-container>
      <v-row align="center">
          <h4>Pouvoir limité à l'établissement</h4>
          <v-checkbox
            v-model="SwitchPouvoir"
            color="accent"
          >
          </v-checkbox>
      </v-row>
      </v-container>
    </v-container>
    </v-card>
</template>

<script>

import dateMixin from '../../../mixins/dateMixin'

export default {
props: ["id"],

data() {
  return {      
    date: null,
    on: false,
    ShowGerant: false,
    menu: false,
    SwitchPouvoir: false,
    activator: null,
    AutreNom: null,
    AutrePrenom: null,
    AutreNat: null,
    AutreNeDpt: null,
    AutreNeVille: null,
    AutreNePays: null,
    AutreRue: null,
    AutreZip: null,
    AutreVille: null,
  };
},
computed: {
  postData() {
    let data = {
      AutrePouvoirLimite: this.SwitchPouvoir,
      AutreBirth_nom: this.AutreNom,
      AutreBirth_prenom: this.AutrePrenom,
      AutreBirth_nationalite: this.AutreNat,
      AutreBirth_date: this.date,
      AutreBirth_departement: this.AutreNeDpt,
      AutreBirth_commune: this.AutreNeVille,
      AutreBirth_pays: this.AutreNePays,
      AutreAdress_rue: this.AutreRue,
      AutreAdress_codepostal: this.AutreZip,
      AutreAdress_commune: this.AutreVille,
    };
    return data;
  },
},
mixins: [dateMixin]
};
</script>
