<template>
    <v-card
      :loading="isUpdating">
      <v-row class="pa-2 pt-0">
        <v-card-title>Options fiscales</v-card-title>
        <v-checkbox color="accent" v-model="ShowFiscal" readonly></v-checkbox>
      </v-row>
      <v-container v-if="ShowFiscal">
          <v-row>
            <v-col>
              <v-autocomplete
                v-model="taxes"
                :disabled="isUpdating"
                :items="tax_sarl"
                chips
                outlined
                label="Options fiscales"
                item-text="name"
                item-value="value"
                multiple>
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)">
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </template>
            </v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
    </v-card>
  </template>

<script>
    export default {
      props: ['company'],
      data () {  
        return {
          autoUpdate: true,
          taxes: [],
          ShowFiscal: true,
          isUpdating: false,
          tax_sarl: [
            { header: 'Impôt sur les sociétés' },
            { name : 'Revenu foncier', value: 'Taxe_RevenuFoncier'},
            { name: 'Réel simplifié (IS)', value : 'TaxCB_IS_ReelSimplifie'},
            { name: 'Réel normal (IS)', value : 'TaxCB_IS_ReelNormal'},
            { divider: true },
            { header: 'Bénéfices Industriels et Commerciaux' },
            { name: 'Réel simplifié (BIC)', value : 'Taxe_CB_BICReelSimplifie'},
            { name: 'Réel normal (BIC)', value : 'Taxe_CB_BICReelNormal'},
            { divider: true },
            { header: 'Bénéfices Non Commerciaux' },
            { name: 'Déclaration contrôlée (BNC)', value : 'Taxe_CB_BNCDeclaControle'},
            { divider: true },
            { header: 'Options particulières' },
            { name: "Assujettissement à l'IS", value : 'Taxe_CB_OptionParticuliereIS'},
            { name: 'Régime des sociétés de personnes', value : 'Taxe_CB_OptionParticuliereRSP'},
            { divider: true },
            { header: 'Si associé unique' },
            { name: 'Spécial BNC (micro)', value : 'TaxCB_SARLAssoUnique_BNC'},
            { name: 'Micro BIC', value : 'TaxCB_SARLAssoUnique_MicroBIC'},
            { divider: true },
            { header: 'TVA' },
            { name: 'Franchise en base (TVA)', value : 'TVA_FranchiseBase'},
            { name: 'Réel simplifié (TVA)', value : 'TVA_ReelSimplifie'},
            { name: 'Mini-réel (TVA)', value : 'TVA_MiniReel'},
            { name: 'Réel normal (TVA)', value : 'TVA_ReelNormal'},
            { name: 'Opération imposables sur options (TVA)', value : 'Tax_ImposableSurOption'},
            { name: 'Déclarations trimestrielles (TVA)', value : 'TVA_DepotTrimestre4k'},
            { name: 'Option déclaration annuelle (TVA)', value : ''}
          ],
        }
      },
      watch: {
        isUpdating (val) {
          if (val) {
            setTimeout(() => (this.isUpdating = false), 3000)
          }
        },
      },
      computed: {
        postData() {
            const data = {
                taxes: this.taxes
            };
            return data;
        },
      },
      methods: {
        remove (item) {
          const index = this.taxes.indexOf(item.name)
          if (index >= 0) this.taxes.splice(index, 1)
        },
      },
    }
  </script>