<template>
    <v-container>
        <v-row>
            <navigation-board mode='create' :value="value" @theCurrentView="value=$event"/>
        <v-col cols="6">
            <immatriculations v-if="value=='Immatriculation'" :items_formalities="items_formalities"/>
            <modifications v-if="value=='Modification'" :items_formalities="items_formalities"/>
            <etablissements v-if="value=='Etablissement'" :items_formalities="items_formalities"/>
            <radiations v-if="value=='Radiation'" :items_formalities="items_formalities"/>
        </v-col>
        <v-col cols="6">
            <doc-list/>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
export default {
    components: {
        FormalityDocumentsList: () => import("../components/popup/FormalityDocumentsList.vue"),
        navigationBoard: () => import("../components/widget/TabNavigation/NavigationBoard.vue"),
        Immatriculations: () => import("../components/create/Immatriculations.vue"),
        Modifications: () => import("../components/create/Modifications.vue"),
        Etablissements: () => import("../components/create/Etablissements.vue"),
        Radiations: () => import("../components/create/Radiations.vue"),
        DocList: () => import("../components/create/DocList.vue")
    },
    data() {
        return {
            selectedFormalite : null,
            selectedModif : null,
            response: [],
            show: false,
            lastItem: null,
            value: null,
            expanded: false,
            selectedItem: null,
            additionalFields: [],
            documents: [],
            formalities: [],
            items_formalities: [
                { name: 'hors ressort', 
                  key : 'siege_horsRessort', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'siege'},            
                { name: 'même ressort', 
                  key: 'siege_memeRessort', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'siege'},            
                { name: 'Augmentation en numéraire', 
                  key: 'cap_augNumeraire', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'cap'},            
                { name: 'augmentation en nature', 
                  key: 'cap_augNature', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'cap'},            
                { name: 'Réduction avec pertes', 
                  key: 'cap_reducPertes', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'cap'},            
                { name: 'Réduction sans pertes', 
                  key: 'cap_reducSansPerte', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'cap'},            
                { name: 'Reconstitution des capitaux propres', 
                  key: 'cap_reconstPropres', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'cap'},            
                { name: 'Fonds à la moitié du capital', 
                  key: 'cap_moitieCapital', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'cap'},            
                { name: "Avec modification de l'activité", 
                  key: 'obetSoc_Modif', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'objet'},            
                { name: 'Sans modifications', 
                  key: 'obetSoc_SansModif', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'objet'},            
                { name: 'Simple', 
                  key: 'disso_Simple', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'disso'},            
                { name: 'Avec réunion en une main', 
                  key: 'disso_Main', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'disso'},            
                { name: 'Dénomination', 
                  key: 'denom', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'autre'},            
                { name: 'Forme juridique', 
                  key: 'forme', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'autre'},            
                { name: 'Clôture', 
                  key: 'cloture', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'autre'},            
                { name: 'Durée', 
                  key: 'duree', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'autre'},            
                { name: 'Nom commercial ou enseigne', 
                  key: 'nomCom', 
                  docs : ['','','',''],
                  popups: ['', '', '', ''],
                  group : 'autre'},

                { name: 'immatriculation',
                  key: 'immatriculation',
                  docs: ["Attestation de parution (JAL)", 'Non condamnation et filiation', "Pièce d'identité du responsable légal", "Pouvoir", 'Statuts', 'Justificatif domicile'],
                  other_docs: ['fonds, activité ou location-gérance', 'autorisation exercice activité réglementée'],
                  popups: []},
                { name: 'SASU',
                  key: '1',
                  popups: [],
                  group: 'immat'},
                { name: 'SELAS',
                  key: '2',
                  popups: [],
                  group: 'immat'},
                { name: 'SA',
                  key: '3',
                  popups: [],
                  group: 'immat'},
                { name: 'SCI',
                  key: '4',
                  popups: [],
                  group: 'immat'},
                { name: 'SARL',
                  key: '5',
                  popups: [],
                  group: 'immat'},
                { name: 'EURL',
                  key: '6',
                  popups: [],
                  group: 'immat'},
                { name: 'SELARL',
                  key: '7',
                  popups: [],
                  group: 'immat'},


                { name: 'principal ouverture meme ressort',
                  key: '',
                  docs: [],
                  group: ''},
                { name: 'principal ouverture hors ressort',
                  key: '',
                  docs: [],
                  group: ''},
                  { name: 'principal transfert meme ressort',
                  key: '',
                  docs: [],
                  group: ''},
                  { name: 'principal transfert hors ressort',
                  key: '',
                  docs: [],
                  group: ''},
                { name: 'principal fermeture',
                  key: '',
                  docs: [],
                  group: ''},
                  
                { name: 'complementaire ouverture meme ressort',
                  key: '',
                  docs: [],
                  group: ''},
                { name: 'complementaire ouverture hors ressort',
                  key: '',
                  docs: [],
                  group: ''},
                { name: 'complementaire transfert meme ressort',
                  key: '',
                  docs: [],
                  group: ''},
                { name: 'complementaire transfert hors ressort',
                  key: '',
                  docs: [],
                  group: ''},
                { name: 'complementaire fermeture',
                  key: '',
                  docs: [],
                  group: ''},

                { name: 'secondaire ouverture meme ressort',
                  key: '',
                  docs: [],
                  group: ''},
                { name: 'secondaire ouverture hors ressort',
                  key: '',
                  docs: [],
                  group: ''},
                { name: 'secondaire transfert meme ressort',
                  key: '',
                  docs: [],
                  group: ''},
                { name: 'secondaire transfert hors ressort',
                  key: '',
                  docs: [],
                  group: ''},
                { name: 'secondaire fermeture',
                  key: '',
                  docs: [],
                  group: ''},

                



                // SARL


                // ouverture complémentaire 
                    // (création fonds : activité réglementée?)
                // ouvetture complémentaire 
                    // (achat de fonds : JAL, contrat, activité réglementée)
                // ouverture complémentaire 
                    // (location gérance : JAL, contrat, activité réglementée ?)

                // ouverture secondaire 
                    // (création fonds : KBIS)
                // ouverture secondaire 
                    // (achat fonds : JAL, acte de vente, KBIS)
                // ouvetture secondaire 
                    // (location gérance : KBIS, JAL, contrat)

                // transfert complémentaire ou secondaire 
                    // (achat de fonds : contrat, JAL, activité réglementée)
                // transfert complémentaire ou secondaire 
                    // (transfert d'activité : activité réglementée)
                // transfert complémentaire ou secondaire 
                    // (location-gérance : activité réglementé, JAL, contrat)
                // transfert complémentaire ou secondaire 
                    // (achat de fonds : activité réglemnté, JAL, contrat)

                // transfert principal (autre ressort) (réglementé)

            ]
        };
    },
    methods: {
    async openDialog(item) {
        if (item.children) {
        if (this.lastItem !== item.id - 1) {
            this.expanded = false;
            this.$refs.mytreeview.updateAll(this.expanded);
            this.lastItem = item.id - 1;
        }
        document
            .querySelectorAll(".v-treeview-node button")
            [item.id - 1].click();
        return false;
        }
          try {
        this.selectedItem = item;
        const headers = {
            authorization: "Bearer " + this.$store.state.auth.user.token,
        };
        let response = await axios.get("formalite/find?exId=" + item.id, {
            headers,
        });
        this.documents = response.data.documents;
        this.additionalFields = response.data.additionalFields;
        this.form = response.data.form;
        this.nameTask = response.data.name;
        this.show = true;
        } catch (err) {
        console.log(err);
        }
        console.log(item);
    },
    },
};
</script>


<style>
    .select {
    max-width: 60px;
    max-height: 60px;
    font-size: 11px;
    }

</style> -->
  