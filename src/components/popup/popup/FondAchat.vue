<template>
    <v-container>
      <v-combobox :items="specifyFond" v-model="comboFond" dense outlined></v-combobox>
      <div ref="form">
        <h4>Précédent exploitant</h4>
        <v-row class="try">
          <v-col cols="4">
            <v-text-field
              label="SIREN"
              dense
              outlined
              v-model="PrecSirenAchat"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Nom"
              outlined
              dense
              v-model="PrecNameAchat"    
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Prénoms"
              outlined
              dense
              v-model="PrecFirstAchat"
            ></v-text-field>
          </v-col>
        </v-row>
      <h4>Journal d'annonce légale</h4>
      <v-row>
        <v-col cols="4">
          <v-menu
            ref="menus"
            v-model="menus"
            :close-on-content-click="false"
            :return-value.sync="dater"
            transition="scale-transition"
            offset-y
            min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dater"
                readonly
                v-bind="attrs"
                outlined
                v-on="on"
                dense
                prepend-inner-icon="mdi-calendar-month"
              ></v-text-field>
            </template>
            <v-date-picker locale="fr-FR" v-model="date" no-title scrollable outlined>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menus = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menus.save(date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="8">
          <v-text-field
            label="Nom du support"
            v-model="PrecJALName"
            dense
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    </v-container>
  </template>
  
  <script>
  import dateMixin from '../../../mixins/dateMixin'

  export default {
    props: ["id"],
  
    data() {
      return {
        data: {},
        date: null,
        menus: false,
        dater: '',
        on: false,
        PrecJALName: "",
        PrecNameAchat: '',
        PrecFirstAchat: '',
        PrecSirenAchat: null,
        activator: null, 
        comboFond: null,
        specifyFond: [
        {text:'achat', value: 'Check Bo98'}, 
        {text:'apport', value: 'Check Bo99'}, 
        {text:'reprise', value: 'Check Bo97'}, 
        {header:'Si autre, précisez'}] // Check Bo102
      };
    },
    computed: {
      postData() {
        let data = {
          JAL_Date: this.computedDate,
          JAL_nomdusupport: this.PrecJALName,
          AchatPrecedentSiren : this.PrecSirenAchat,
          AchatPrecedentName : this.PrecNameAchat,
          AchatPrecedentFirstname : this.PrecFirstAchat,
          ComboFond : this.comboFond
        };
        return data;
      },
    },
    mixins: [dateMixin],
  };
  </script>
  
  <style>
    .compact-form {
      transform: scale(0.875);
      transform-origin: left;
  }
  </style>





