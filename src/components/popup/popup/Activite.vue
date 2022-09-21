<template>
    <v-card>

        <v-row class="pa-2 pt-0">
        <v-card-title>Activité</v-card-title>
        <v-checkbox v-if="cerfa=='M0'" color="accent" v-model="show" readonly></v-checkbox>
        <v-checkbox v-if="cerfa=='M2'" color="accent" v-model="show"></v-checkbox>
      </v-row>

       <v-container v-show="show" class="activite">
        <v-row>
            <v-col>
                <v-text-field
                label="activités exercés dans l'établissement" outlined v-on="on"
                dense
                v-model="ActiviteExerce"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                label="la plus importante" outlined v-on="on"
                dense
                v-model="ActiviteImportante"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-menu
                ref="menu"
                :close-on-content-click="false"
                :return-value.sync="dater"
                transition="scale-transition"
                offset-y
                v-model="menu">
                    <template v-slot:activator="{on, attrs}">
                    <v-text-field
                    label="Date"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                    prepend-inner-icon="mdi-calendar-month"
                    v-model="dater">
                    </v-text-field>
                    </template>
                    <v-date-picker locale="fr-FR"
                    v-model="date"
                    no-title scrollable>
                    <v-spacer/>
                    <v-btn text color="primary" 
                    @click="menu=false">Cancel</v-btn>
                    <v-btn text color="primary"
                    @click="$refs.menu.save(date)">Ok</v-btn>
                    </v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="4">
                <v-select
                :items="destination"
                label="Destination"
                dense
                outlined
                v-model="ActiviteDestination">
                </v-select>
            </v-col>

            <v-col cols="4">
                <v-combobox
                :filter="filter"
                :hide-no-data="!search_a"
                :items="item_nature"
                :search-input.sync="search_a"
                hide-selected
                dense
                outlined
                label="Nature de l'opération"
                :value="value"
                v-model="ActiviteNature">
                </v-combobox>
            </v-col>
        </v-row>
        <v-row v-if="cerfa=='M2'">
            <v-col>
                <v-combobox
                :filter="filter"
                :hide-no-data="!search_b"
                :items="item_modif"
                dense
                persistent-hint
                outlined
                :value="value"
                :search-input.sync="search_b"
                hide-selected
                label="Si modification d'activité, précisez"
                v-model="ActiviteModif">
            </v-combobox>
            </v-col>
        </v-row>
        </v-container>

        
    </v-card>
</template>

<script>
import dateMixin from '../../../mixins/dateMixin'
import comboMixin from '../../../mixins/comboMixin'

export default {
    props: ['id', 'cerfa'],
    data() {
        return {
            ActiviteExerce: "",
            show: true,
            ActiviteImportante: "",
            date: null,

            ActiviteDestination: null,
            destination: [
                { text : 'Permanente', value : 'CB_Permanent'},
                { text : 'Saisonnière', value : 'CB_Saisonnier'},
                { text : 'Ambulante', value : 'CB_Ambulant'}
            ], // ActiviteDestination
            
            ActiviteNature: null,
            item_nature : [
                { text : 'fabrication, production', value : 'CB_FabProd'},
                { text : 'Bâtiment, travaux publics', value : 'CB_BTP'},
                { text : 'Commerce de gros', value : 'CB_CommerceGros'},
                { text : 'Commerce de détail en magasin', value : 'CB_DetMagasin'},
                { text : 'Commerce de détail sur marché', value : 'CB_DetMarche'},
                { text : 'Commerce de détail sur internet', value : 'CB_DetInternet'},
                { header : 'Si autre, précisez'}            
            ], // Check Bo89 + m2 (text)
            // ActiviteNature

            ActiviteModif: null,
            item_modif : [
                { text : "Adjonction (ajout) d'activité", value : 'Check Bo90'},
                { header : "suppression partielle par:"},
                { text : "Dsparition", value : 'Check Bo92'},
                { text : "Vente", value : 'Check Bo93'},
                { text : "Reprise par le propriétaire", value : 'Check Bo94'},
                { header : "Si autre, précisez"}
            ], // Check Bo95 + underfined_12 (text)
            // ActiviteModif
            
            dater: '',
            menu: false,
            on: false,
            activator: null,

            search_a: null,
            search_b: null
        }
    },
    computed: {
        postData() {
            let data = {
                activiteExerces: this.ActiviteExerce,
                activiteImportante: this.ActiviteImportante,
                activite_Date: this.computedDate,
                activiteDestination: this.ActiviteDestination,
                activiteNatureOperation: this.ActiviteNature,
                activitePrecisez: this.ActiviteModif,
            };
            return data
        }
    },
    mixins: [dateMixin, comboMixin]
    }
</script>

<style>
    .activite{
        padding-top: 0;
        padding-bottom : 0;
    }
</style>