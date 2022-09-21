<template>
    <v-container>
                    <h4>Précédent exploitant</h4>
                  <v-row class="try">
                    <v-col cols="4">
                      <v-text-field
                        label="SIREN"
                        dense
                        outlined
                        v-model="PrecSiren_Loc"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="Nom"
                        outlined
                        dense
                        v-model="PrecName_Loc"    
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="Prénoms"
                        outlined
                        dense
                        v-model="PrecFirstame_Loc"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="6">
                        <v-menu
                          ref="menus"
                          v-model="menus"
                          :close-on-content-click="false"
                          :return-value.sync="dates"
                          transition="scale-transition"
                          offset-y
                          outlined
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="computedDate"
                              label="Début"
                              readonly
                              v-bind="attrs"
                              outlined
                              dense
                              v-on="on"
                              prepend-inner-icon="mdi-calendar-month"
                            ></v-text-field>
                          </template>
                          <v-date-picker locale="fr-FR" v-model="dates" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menus = false"
                              >Cancel</v-btn
                            >
                            <v-btn text color="primary" @click="$refs.menus.save(dates)"
                              >OK</v-btn
                            >
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="6">
                        <v-menu
                          ref="menuone"
                          v-model="menuone"
                          :close-on-content-click="false"
                          :return-value.sync="dateone"
                          transition="scale-transition"
                          outlined
                          offset-y
                          min-width="290px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="computedDate_1"
                              label="Fin"
                              readonly
                              dense
                              v-bind="attrs"
                              outlined
                              v-on="on"
                              prepend-inner-icon="mdi-calendar-month"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            locale="fr-FR"
                            v-model="dateone"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menuone = false"
                              >Cancel</v-btn
                            >
                            <v-btn text color="primary" @click="$refs.menuone.save(dateone)"
                              >OK</v-btn
                            >
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                  </v-row>


                  <v-row align="center">
                    <v-col cols="6">
                      <h4>Renouvellement par tacite reconduction?</h4>
                    </v-col>
                    <v-col cols="2">
                      <v-switch v-model="switch2" color="accent"> </v-switch>
                    </v-col>
                  </v-row>

                  <h3>Le loueur du fonds:</h3>

                  <v-row>
                    <v-col cols="4">
                      <v-text-field label="Nom" dense v-model="nom" outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="Prénoms" dense v-model="prenom" outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        label="Rue" dense v-model="LoueurRue" outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field label="Code Postal" dense v-model="LoueurZip" outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field label="Commune" dense v-model="LoueurVille" outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
      <v-col cols="6">
        <v-text-field
          label="SIREN du mandant "
          hide-details="auto"
          outlined
          dense
          v-model="sirenmandant"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Greffe du mandant "
          hide-details="auto"
          outlined
          dense
          v-model="greffemandant"
        ></v-text-field>
      </v-col>
    </v-row>

  </v-container>
  
</template>

<script>
import dateMixin from '../../../mixins/dateMixin'

export default {
props: ["id", "mode"],

data() {
return {
  menus: false,
  menuone: false,
  activator: null,
  dates: null,
  dateone: null,
  switch2: false,
  PrecSiren_Loc: "",
  nom: "",
  prenom: "",
  on: false,
  LoueurRue: "",
  LoueurZip: "",
  LoueurVille: "",
  PrecName_Loc: '', 
  PrecFirstame_Loc: '',
  sirenmandant: '',
  greffemandant: ''
};
},
computed: {
computedDate() {
  return this.formatDate(this.dates);
},
computedDate_1() {
  return this.formatDate(this.dateone);
},
postData() {
  const data = {
    GerMandat_Debut: this.computedDate,
    GerMandat_Fin: this.computedDate_1,
    GerMandat_TaciteBool : this.switch2,
    GerMandat_LouNom : this.nom,
    GerMandat_LouPrenom : this.prenom,
    GerMandat_LouRue : this.LoueurRue,
    GerMandat_LouZip : this.LoueurZip,
    GerMandat_LouVille : this.LoueurVille,
    GerMandat_MandSiren : this.sirenmandant,
    GerMandat_MandGreffe : this.greffemandant,


    GerMandatPrecedentSiren : this.PrecSiren_Loc,
    GerMandatPrecedentName : this.PrecName_Loc,
    GerMandatPrecedentFirstname : this.PrecFirstame_Loc
  };
  return data;
},
},
mixins: [dateMixin]
};
</script>
