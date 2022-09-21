<template>
    <v-card>
      <v-row class="pa-2">
      <v-card-title>L'activité est exercé ailleurs qu'au siège</v-card-title>
      <v-checkbox v-model="ShowSiegeAilleurs" color="accent"></v-checkbox>
    </v-row>
      <v-container v-if="ShowSiegeAilleurs">
      <h4>Adresse:</h4>
      <v-row>
        <v-col cols="4">
          <v-text-field
            label="Rue"
            v-model="street"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Code Postal"
            dense
            v-model="zip"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Commune"
            v-model="city"
            dense
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    </v-card>
</template>

<script>
export default {
props: ["id"],

data() {
  return {
    ShowSiegeAilleurs: false,
    dialog: false,
    street: "",
    zip: "",
    city: "",
  };
},
computed: {
  postData() {
    const data = {
      hors_siege_rue: this.street,
      hors_siege_zip: this.zip,
      hors_siege_ville: this.city,
    };
    return data;
  },
},
};
</script>