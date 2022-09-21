<template>
    <v-card>
      <v-container class="pa-5" >
      <v-row align="center">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dater"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dater"
              readonly
              label="Date de la mise en sommeil"
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
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>
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
      date:null,
      menu: false,
      dater: '',
      on: false,
    };
  },
  computed: {
    postData() {
      const data = {
        date_sommeil: this.computedDate,
      };
      return data;
    },
  },
  mixins: [dateMixin]
};
</script>
