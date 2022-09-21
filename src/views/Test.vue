<template>
    <div>
      <v-treeview :items="items" item-key="name" ref="mytreeview">
        <template v-slot:label="{ item }">
          <a @click="openDialog(item)">{{ item.name }}</a>
        </template>
      </v-treeview>
      <formality-documents-list
        v-if="show"
        :show="show"
        :nameTask="nameTask"
        :form="form"
        :documents="documents"
        :additionalFields="additionalFields"
        @close="show = false"
        :selectedItem="selectedItem"
      ></formality-documents-list>
    </div>
  
  </template>
  <script>
  import axios from "axios";
  export default {
    components: {
      FormalityDocumentsList: () =>
        import("../components/popup/FormalityDocumentsList.vue"),
    },
    data() {
      return {
        selectedFormalite : null,
        selectedModif : null,
        response: [],
        show: false,
        lastItem: null,
        expanded: false,
        selectedItem: null,
        additionalFields: [],
        documents: [],
        items: [
          {
            id: 1,
            name: "Immatriculation",
            children: [
              { name: "SARL", id: "62c40e2faba699b309005102", popup: "ImmatriculationSARL" },
              { name: "EURL", id: "62c40e2faba699b309005102", popup: "ImmatriculationEURL" },
              { name: "SELARL", id: "62c40e33aba699b309005104", popup: "ImmatriculationSELARL" },
              { name: "SCI", id: "62c40e1baba699b3090050fe", popup: "ImmatriculationSCI" },
              { name: "SAS", id: "62c40e26aba699b309005100", popup: "ImmatriculationSAS" },
              { name: "SELAS", id: "62c40e26aba699b309005100", popup: "ImmatriculationSELAS"  }
            ],
          },
          {
            id: 2,
            name: "Modification de capital",
            children: [
              { name: "Augmentation en numéraire", id: "62c409112bd68daa69483478", popup: 'Observation' },
              { name: "Augmentation en nature", id: "62c409192bd68daa6948347a", popup: 'Observation' },
              { name: "Réduction motivée par les pertes", id: "62c408c52bd68daa69483472", popup: 'Observation' },
              { name: "Réduction non motivée par les pertes", id: "62c408cf2bd68daa69483474", popup: 'Observation' },
              { name: "Reconstitution des capitaux propres", id: "62c408b52bd68daa69483470", popup: 'Observation' },
              { name: "Capitaux propres en dessous de la moitié du capital", id: "62c408f32bd68daa69483476", popup: 'Observation' },
            ],
          },
          {
            id : 3,
            name : 'Transfert de siège',
            children: [
              { name : "Dans le même ressort", id : '62c408352bd68daa6948346a', popup: 'TransfertSiege'},
              { name : "Dans un autre ressort", id : '62c4088f2bd68daa6948346e', popup: 'TransfertSiege'}
            ]
          },
          {
            id : 4,
            name: "Modification de l'objet social",
            children: [
              { name: "Avec modification des activités", id : '62c408162bd68daa69483468', popup : 'Observation'},
              { name: "Sans modification des activités", id : '62c4080e2bd68daa69483466', popup : 'Observation'}
            ]
          },
          {
            id: 5,
            name: "Formalité sans actes",
            children: [
              { name: "Transfert établissement principal autre ressort", id: "62c41ad7aba699b309005113", popup: "TransfertEtabPrincipalMemeRessort" },
              { name: "Transfert établissement secondaire ou complémentaire même ressort", id: "62c41b03aba699b309005115", popup: "TransfertEtabPrincipalAutreRessort" },
              { name: "Fermeture d'un établissement complémentaire ou secondaire", id: "62c40fadaba699b309005108", popup: "FermetureEtabSecondaireComplementaire" },
              { name: "Ouverture d'un établissement complémentaire", id: "62c410baaba699b30900510b", popup: "OuvertureEtabComplementaire" },
              { name: "Ouverture d'un établissement secondaire", id: "62c410d5aba699b30900510d", popup: "OuvertureEtabSecondaire"},
              { name: "Prise d'activité", id: "62c41110aba699b30900510f", popup: "PriseActivite"},
              { name: "Nom commercial ou enseigne", id: "62c406302bd68daa69483456", popup: "NomEnseigne"},
              { name: "Mise en sommeil ", id: "62c40e86aba699b309005106", popup: "MiseEnSommeil"}
            ],
          },
          {
            id: 6,
            name: "Autres modifications",
            children: [
              { name: "Modification de la forme juridique", id: "62c41b03aba699b309005115"},
              { name: "Prorogation de la durée de la Personne morale", id: "62c4094d2bd68daa6948347e"},
              { name: "date de clôture", id: "62c409332bd68daa6948347c" },
              { name: 'Changement de dénomination sociale', id: '62c404228ce80aac470a1339', popup: 'Observation' }
            ],
          },
          {
            id: 7,
            name: "Dissolution sans poursuite d’activité",
            children: [
              { name: "Simple", id: "62c407ac2bd68daa6948345e" },
              { name: "Avec réunion de toutes les parts", id: "62c407692bd68daa6948345c" },
            ],
          },
          {
            id: 8,
            name: "Radiation",
            children: [
              { name: "Radiation simple", id: "62c41c76aba699b30900511a" },
              { name: "Par suite d’une fusion de SARL", id: "62c41c9daba699b30900511c"},
              { name: "Filiale détenue à 100%", id: "62c41ce1aba699b30900511e" },
            ],
          },
        ],
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
  
  </style>