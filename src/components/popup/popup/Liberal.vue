<template>
    <v-card>
        <v-container>
            <v-row class="pa-2 pt-0">
            <v-card-title v-if="company=='SELARL'">Activité libérale</v-card-title>
            <v-card-title v-if="company=='SCI'">Origine de l'activité</v-card-title>
            </v-row>

            <div>
                <v-container>
                <v-radio-group v-model="row" row>
                    <v-radio label="Création" value="creation"></v-radio>
                    <v-radio label="Reprise" value="reprise"></v-radio>
                </v-radio-group>
                </v-container>
                
                <v-row v-show="row=='reprise'">
                    <v-col>
                    <v-text-field outlined label="SIREN"  dense v-model="LiberalSiren"></v-text-field>
                    </v-col>
                    <v-col>
                    <v-text-field outlined label="Nom"  dense v-model="LiberalNom"></v-text-field>
                    </v-col>
                    <v-col>
                    <v-text-field outlined label="Prénoms" dense  v-model="LiberalFirstName"></v-text-field>
                    </v-col>
                </v-row>

            </div>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        props: ['id', 'company'],
        data() {
            return {
                show: false,
                LiberalSiren: '',
                LiberalNom: '',
                LiberalFirstName: '',
                row: null
            }
        },
        computed: {
            postData() {
            const data = {
                LiberalCreation : this.LiberalCreation,
                TestLiberalSiren : this.LiberalSiren,
                LiberalNom : this.LiberalNom,
                LiberalFirstName : this.LiberalFirstName,
                CreaOuReprise: this.row
            };
            return data;
    },
  },
}
</script>