<template>
    <v-card>
    <v-container>
        <v-row>
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
        <v-row align="center">
        <v-col cols="10"><h4 class="font-weight-light">Etablissement permanent et dirigé par une personne ayant le pouvoir de lier des rapports juridiques avec les tiers?</h4></v-col>
        <v-col>
          <v-checkbox
            color="accent"
            v-model="switch_rapports"
          ></v-checkbox>
        </v-col>
     </v-row>
    </v-container>
    </v-card>
</template>

<script>
import comboMixin from '../../../mixins/comboMixin'
export default {
    data() {
        return {
            TransfertActivite: null,
            ItemsActivite: [
                { text : 'Etablissement principal', value : 'Check Bo50'},
                { text : 'Etablissement secondaire', value : 'Check Bo51'},
                ], // TransfertActivite
            TransfertDestination : null, 
            TransfertDestinationItems : [
                { text : 'vendu', value : 'Check Bo46'},
                { text : 'fermé', value : 'Check Bo47'},
                { header : 'Si autre, précisez'}
            ], // Check Bo48 + undefined_9
            // TransfertDestination
            menu_1: false,
            search: null,
            activator: null,
            switch_rapports: false
        }
    }, 
    computed: {
        postData() {
            let data = {

                EtabRapports : this.switch_rapports,
                transfertDestination : this.TransfertDestination,
                transfertActivite : this.TransfertActivite
            };
            return data
        },
    },
    mixins: [comboMixin]
}
</script>