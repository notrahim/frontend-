<template>
  <v-card>
    <v-container>
      <v-card-title v-if="version=='cree'">Etablissement créé</v-card-title>
      <v-card-title v-if="version=='modif'">Etablissement modifié</v-card-title>
  <div>
  <v-row>
    <v-col cols="6">
      <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="dater"
      transition="scale-transition"
      offset-y
      outlined
      min-width="290px">
      <template v-slot:activator="{on, attrs}">
      <v-text-field
        v-model="dater"
        label="Date de création"
        dense
        readonly
        outlined
        v-bind='attrs'
        v-on='on'
        prepend-inner-icon="mdi-calendar-month">
      </v-text-field>
      </template>
      <v-date-picker locale="fr-FR" v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="accent" @click="menu = false">Cancel</v-btn>
      <v-btn text color="accent" @click="$refs.menu.save(date)">Ok</v-btn>
      </v-date-picker>
    </v-menu>
    </v-col>
    <!-- <v-col cols="6">
      <v-select
      :items="etab_items"
      v-model="etab_devient"
      outlined
      label="L'établissement devient"
      ></v-select>
    </v-col> -->
    </v-row>
      <h4>Nouvel Etablissement:</h4>
      <v-row align='center'>
        <v-col cols="4">
          <v-text-field
            label="Rue"
            v-model="etab_rue"
            dense
            outlined
          ></v-text-field>
        </v-col>

         <v-col cols="4">
          <v-text-field
            label="Code Postal"
            v-model="etab_zip"
            dense
            outlined
          ></v-text-field>
        </v-col> 
        <v-col cols="4">
          <v-text-field
            label="Commune"
            v-model="etab_city"
            dense
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
      <v-row align="center" v-show="version=='cree'">
        <v-col><h4 class="font-weight-medium">Permanent et dirigé par une personne ayant le pouvoir de lier des rapports juridiques avec les tiers?</h4></v-col>
        <v-col>
          <v-checkbox
            color="accent"
            v-model="switch_rapports"
          ></v-checkbox>
        </v-col>
     </v-row>
     <v-row align="center" v-show="version=='modif'">
          <v-col><h4 class="font-weight-medium">Présence de salariés?</h4></v-col>
          <v-col>
          <v-checkbox
            color="accent"
            v-model="switch_salaries"
          ></v-checkbox>
        </v-col>
     </v-row>
    </v-container>
    </v-card>
</template>

<script>
  import dateMixin from '../../../mixins/dateMixin'
  export default {
    props : ['id', 'version', 'sansActe'],
    data() {
      return {
        menu: false,
        date: null,
        menu: false,
        on: null,
        attrs: null,
        dater: '',
        activator: null,
        etab_items: [
          { text : 'Etablissement principal', value : 'Check Bo57' },
          { text : 'Etablissement secondaire', value: 'Check Bo58' }],
        etab_devient: null,
        switch_rapports: false,
        switch_salaries: false,
        etab_city: null,
        etab_zip: null,
        etab_rue: null
      }
    },
    computed: {
      postData() {
        let data = {
          EtabCreeModif : this.computedDate,
          EtabCreeModifDevient : this.etab_devient,
          EtabNouvRue : this.etab_rue,
          EtabNouvZip : this.etab_zip,
          EtabNouvVille : this.etab_city, 
          EtabRapports : this.switch_rapports,
          EtabSalaries : this.switch_salaries
        };
        return data;
      }
    },
    mixins: [dateMixin]
  }
</script>