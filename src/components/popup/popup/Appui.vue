<template>
    <v-card>
        <v-container>
            <v-row class="pa-2 pt-0">
                <v-card-title>Contrat d'appui</v-card-title>
                <v-checkbox color="accent" v-model="show"></v-checkbox>
            </v-row>
            <div v-show="show">
                <v-row>
                    <v-col>
                        <v-select :items='items_appui' label="choix des statuts déposés" outlined v-model="StatutsEurl"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <h3>Contrat d'appui</h3>
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
                            label="Fin de contrat"
                            readonly
                            outlined
                            v-bind="attrs"
                            dense
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
                        <v-text-field v-model='AppuiSiren' dense outlined label="SIREN du responsable"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field v-model='AppuiDenom' dense outlined label="Dénomination"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col><v-text-field v-model='AppuiRue' dense outlined label="Rue"></v-text-field></v-col>
                    <v-col><v-text-field v-model='AppuiZip' dense outlined label="Code postal"></v-text-field></v-col>
                    <v-col><v-text-field v-model='AppuiVille' dense outlined label="Ville"></v-text-field></v-col>
                </v-row>
            </div>
        </v-container>
    </v-card>
</template>

<script>
    import dateMixin from '../../../mixins/dateMixin'
    export default {
        data() {
            return {
                items_appui: [
                    { text : 'Statuts types complétés sans modification', value: 'CB_StatutType'},
                    { text : 'Statuts différents', value : 'CB_StatutDiff'},
                    { text : 'Option pour le régime des micro-entrepreneurs', value : 'CB_MicroEntrepreneur'}],
                    
                StatutsEurl: null,
                AppuiRue: null,
                AppuiZip: null,
                AppuiVille: null,
                AppuiSiren: null,
                AppuiDenom: null,
                dater: '',
                show: false,
                menu: false,
                on: false,
                activator: null,
                date: null,

            }
        },
        computed: {
            postData() {
                let data = {
                StatutsEurl: this.StatutsEurl,
                AppuiFin: this.computedDate,
                AppuiRue: this.AppuiRue,
                AppuiZip: this.AppuiZip,
                AppuiVille: this.AppuiVille,
                AppuiSiren: this.AppuiSiren,
                AppuiDenom: this.AppuiDenom,
    };
    return data;
  },
},
        mixins: [dateMixin]
    }
</script>