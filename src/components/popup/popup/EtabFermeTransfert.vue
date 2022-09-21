<template>
    <v-card>
      <v-container>
        <v-card-title v-if="version=='transfert'">Etablissement transferé</v-card-title>
        <v-card-title v-if="version=='ferme'">Etablissement fermé</v-card-title>
      <v-row>
        <v-row>
          <v-col cols="3">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            dense
            offset-y
            outlined
            min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDate"
                label="Date"
                readonly
                v-bind="attrs"
                dense
                v-on="on"
                outlined
                prepend-inner-icon="mdi-calendar-month"
              ></v-text-field>
            </template>
            <v-date-picker locale="fr-FR" v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="9">
        <PopSiren ref="PopSiren"/>
      </v-col>
      </v-row>
  
      </v-row>

      <v-row v-if="version=='transfert'">
        <v-col>
          <v-combobox
            :items="TransfertDestinationItems"
            v-model="TransfertDestination"
            label="Ancien établissement"
            outlined
            hide-selected
            :filter="filter"
            dense
            :hide-no-data="!search"
            :search-input.sync="search"
          ></v-combobox>
      </v-col>
      <v-col>
        <v-select
        :items="ItemsActivite"
        v-model="TransfertActivite"
        label="Si maintien d'activité"
        dense
        outlined
        ></v-select>
      </v-col>

      </v-row>

      <v-row align="center" v-show="version=='ferme'">
          <v-col>
          <v-combobox
            :items="FermetureDestinationItems"
            v-model="FermeDestination"
            label="Ancien établissement"
            outlined
            hide-selected
            dense
            :filter="filter"
            :hide-no-data="!search"
            :search-input.sync="search"
          ></v-combobox>

        </v-col>
          <v-col cols="4">
            <h3>Présence de salariés?</h3>
          </v-col>
          <v-col>
            <v-checkbox
              color="accent"
              v-model="switch_salarie">
            </v-checkbox>
          </v-col>
          <v-col v-if="switch_salarie" cols="3">
            <v-menu
            ref="menu_1"
            v-model="menu_1"
            :close-on-content-click="false"
            :return-value.sync="dateone"
            transition="scale-transition"
            offset-y
            min-width="290px"
            >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDate_1"
                label="Date de fin"
                readonly
                v-bind="attrs"
                dense
                outlined
                v-on="on"
                prepend-inner-icon="mdi-calendar-month"
              ></v-text-field>
            </template>
            <v-date-picker locale="fr-FR" v-model="dateone" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu_1 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu_1.save(dateone)"
                >OK</v-btn>
            </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
</template>

<script>
import dateMixin from '../../../mixins/dateMixin'
import comboMixin from '../../../mixins/comboMixin'

export default {
  props: ["id", "version", "sansActe"],
  components: {
    PopSiren: () =>
    import("@/components/popup/popup/Siren.vue"),
  },
  data() {
    return {
      TransfertActivite: null,
      ItemsActivite: [
        { text : 'Siège', value : 'Check Bo49'},
        { text : 'Principal', value : 'Check Bo50'},
        { text : 'Secondaire', value : 'Check Bo51'},
        ], // TransfertActivite
      
      TransfertDestination : null, 
      TransfertDestinationItems : [
        { text : 'vendu', value : 'Check Bo46'},
        { text : 'fermé', value : 'Check Bo47'},
        { header : 'Si autre, précisez'}
      ], // Check Bo48 + undefined_9
      // TransfertDestination

      FermeDestination : null,
      FermetureDestinationItems : [
        { text : 'supprimé', value : 'Check Bo52'},
        { text : 'vendu', value : 'Check Bo53'},
        { header : 'Si autre, précisez'}
      ], // Check Bo54 + 'Suite sur M'
      // FermeDestination
      date: null,
      dateone: null,
      menu: false,
      on: false,
      activator: null,
      switch_salarie: false,
      menu_1: false,
      search: null,
      activator: null,
    };
  },
  computed: {
    computedDate() {
      return this.formatDate(this.date);
    },
    computedDate_1() {
      return this.formatDate(this.dateone);
    },
    postData() {
      let data = {
        fermeTransDate : this.computedDate,
        fermeDateSalarie : this.computedDate_1,

        fermeDestination : this.FermeDestination,
        transfertDestination : this.TransfertDestination,
        transfertActivite : this.TransfertActivite,

        ...this.$refs.PopSiren.postData
      };
      return data;
    },
  },
  mixins: [dateMixin, comboMixin]
};
</script>