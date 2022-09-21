<template>
  <v-card>

    <v-container class="pa-5" >
      <v-row class="pa-2 pt-0">
        <v-card-title>Observations</v-card-title>
        <v-checkbox color="accent" dense v-model="Observation_switch"></v-checkbox>
      </v-row>
    <v-row v-show="Observation_switch">
      <v-col cols="12">
        <v-text-field label="Observation" dense v-model="observation" outlined></v-text-field>
      </v-col>
    </v-row>
  </v-container>

  </v-card>
</template>

<script>
import dateMixin from '../../../mixins/dateMixin'
export default {
  props: ["id"],
  data() {
    return {
      observation: "",
      Observation_switch: false,
    };
  },
  computed: {
    postData() {
      const data = {
        Observation: this.observation,
      };
      return data;
    },
  },
  mixins: [dateMixin]
};
</script>