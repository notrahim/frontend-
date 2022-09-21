<template>
    <v-container>
      <v-card
      class="rounded-xl mt-5"
      width="500"
      color="white"
      :elevation="12"
      >
      <v-card-title class="font-weight-black" style="font-size: 20px"
      >Choisir une formalité</v-card-title>
        <v-card-text class="mt-0 pt-2 mb-0 pb-0 pr-0">
        <h3 class="font-weight-black mb-0 mt-0">
            Je souhaite
        </h3>
        <v-chip-group active-class="accent--text"
            v-model="etablissement_1" column>
            <v-chip value="ouverture" outlined >Ouvrir</v-chip>
            <v-chip value="transfert" outlined >Transférer</v-chip>
            <v-chip value="fermeture" outlined >Fermer</v-chip>
        </v-chip-group>
        </v-card-text>

        <v-card-text class="mt-0 pt-0">
        <h3 class="font-weight-black mb-0 mt-0">
            un établissement
        </h3>

        <v-chip-group active-class="accent--text"
            v-model="etablissement_2" column>
            <v-chip value="principal" outlined>Principal</v-chip>
            <v-chip value="secondaire" outlined>Secondaire</v-chip>
            <v-chip v-show="etablissement_1==='transfert'" value="complementaire" outlined>Complémentaire</v-chip>
        </v-chip-group>
        </v-card-text>

        <v-card-text class="mt-0 pt-0 mb-2" v-show="etablissement_2==='Transferé' || etablissement_2==='Ouvert'">
        <h3 class="font-weight-black mb-0 mt-0">
            Dans un ressort
        </h3>
        <v-chip-group active-class="accent--text"
            v-model="etablissement_3" column>
            <v-chip value="Identique" outlined>Identique</v-chip>
            <v-chip value="Différent" outlined>Différent</v-chip>
        </v-chip-group>
        </v-card-text>
        <v-btn @click="merge(etablissement_1, etablissement_2, etablissement_3)"></v-btn>
        {{output}}
        <div v-if="output.includes('Identique')">Hi</div>
    </v-card>
      </v-container>
</template>

<script>
    export default {
      components: {
      },
      data() {
        return {
          etablissement_1 : null,
          etablissement_2 : null,
          etablissement_3: null,
          output: ''
          }},
        methods: {
          merge(a, b, c){
            if (c != null){
              this.output = `établissement ${a} ${b} ${c}`
              return this.output
            } else {
              this.output = `établissement ${a} ${b}`
              return this.output
            }
          },
      },
    };
</script>