<template>
    <v-row>
      <v-col>
      <v-card-text>
        <v-row v-if="mode">
          <v-text-field label="Entrez le SIREN" v-model="siren" dense :rules="sirenRules" outlined></v-text-field>
          <v-btn 
          @click="
          get_siren();
          to_results()"> chercher
          </v-btn>
        </v-row>

        <v-row v-else>
          <v-select @change="postData()" v-model="pappers_data"
          :items="filteredData" label="Etablissements" :item-text="
          (item) => item.adresse_ligne_1 + '-' + item.code_postal + '-' + item.ville" return-object>
          </v-select>
          <v-btn
          @click="get_back()">Retour</v-btn>
        </v-row>
      </v-card-text>
    </v-col>
  </v-row>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ["id"],
    data() {
      return {
        mode: true,
        siren: null,
        pappers_res: [],
        pappers_data: [],
        etablissements: [],
        sirenRules: [v => (v && v.length == 9) || 'SIREN has 9 digits']
      };
    },
    computed: {
      filteredData() {
        return this.pappers_res.etablissements
          ? this.pappers_res.etablissements.filter((g) => {
            return g.etablissement_cesse == false;
          })
          : [];
      },
      postData() {
      let data = {
        ancien_etab_rue: this.pappers_data.adresse_ligne_1,
        ancien_etab_zip: this.pappers_data.code_postal,
        ancien_etab_ville: this.pappers_data.ville,
        siren: this.siren
      };
      return data;
      },
    },
    methods: {
      mapData() {
        console.log('test')
      },
      to_results() {
        this.mode = false
      },
      get_back() {
        this.mode = true
      },
      async get_siren() {
        try {
          let pappers_res = await axios.get(`https://api.pappers.fr/v2/entreprise?api_token=e0fdd0b00bf09b45a56d8bfcba777cbcbe718d0cc63716d9&siren=${this.siren}`)
          this.pappers_res = pappers_res.data
        } catch (err) {
          console.log(err)
        }
      }
    },
  };
  </script>