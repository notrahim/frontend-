<template>
    <v-card>
      <v-row class="pa-2 pt-0">
        <v-card-title>Nom commerciel et enseigne</v-card-title>
        <v-checkbox color="accent" v-model="ShowNomEnseigne"></v-checkbox>
      </v-row>
      <v-container v-if="ShowNomEnseigne">
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Nom Commercial "
            v-model="nomcomm"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Enseigne"
            v-model="enseigne"
            dense
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    </v-card>
</template>

<script>
import dateMixin from '../../../mixins/dateMixin'
export default {
props: ['id'],

data() {
  return {
    ShowNomEnseigne: false,
    enseigne: "",
    nomcomm: "",
    menu: false,
    on: false,
    activator: null,
  };
},
computed: {
  postData() {
    const data = {
      NomComm: this.nomcomm,
      Enseigne: this.enseigne,
    };
    return data;
  },
},
mixins: [dateMixin]
};
</script>