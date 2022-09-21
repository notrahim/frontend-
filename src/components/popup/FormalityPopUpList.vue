<template>
  <div>
    <div v-for="comp in componentsFormalite[selectedItem.popup]"
      v-bind:key="comp.id" class="px-5 py-5">
    <div>
      <component
      :is="comp.component" 
      :ref="comp.component" 
      :cerfa="comp.cerfa"
      :company="comp.company"
      :version="comp.version"
      :sansActe="comp.sansActe">
    </component>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ["selectedItem"],
  data() {
    return {
    }
  },
  components: {
    Questions: () => import("@/components/popup/popup/Questions.vue"),
    SiegeAilleurs: () => import("@/components/popup/popup/SiegeAilleurs.vue"),
    NomEnseigne: () => import("@/components/popup/popup/NomEnseigne.vue"),
    Activite: () => import("@/components/popup/popup/Activite.vue"),
    Appui: () => import("@/components/popup/popup/Appui.vue"),
    Effectif: () => import("@/components/popup/popup/Effectif.vue"),
    EffectifM0: () => import("@/components/popup/popup/EffectifM0.vue"),
    AutreGerant: () => import("@/components/popup/popup/AutreGerant.vue"),
    Fonds: () => import("@/components/popup/popup/Fonds.vue"),
    Fiscal: () => import('@/components/popup/popup/Fiscal.vue'),
    Liberal: () => import('@/components/popup/popup/Liberal.vue'),
    Observations: () => import('@/components/popup/popup/Observations.vue'),
    EtabFermeTransfert : () => import('@/components/popup/popup/EtabFermeTransfert.vue'),
    Sommeil: () => import('@/components/popup/popup/Sommeil.vue'),
    EtabCreeModif: () => import('@/components/popup/popup/EtabCreeModif.vue'),
    Siren: () => import('@/components/popup/popup/Siren.vue'),
    Siege: () => import('@/components/popup/popup/Siege.vue')
  },
  computed: {
    componentsFormalite() {
      return {
        // immatriculations
        ImmatriculationSARL: [
          { id : 1, component: 'Questions', company: 'SARL'},
          { id : 4, component: 'Activite', cerfa: 'M0'},
          { id : 8, component: 'Fiscal', company: 'SARL'},
          { id : 2, component: 'SiegeAilleurs'},
          { id : 3, component: 'NomEnseigne', cerfa: 'M0'},
          { id : 5, component: 'EffectifM0'},
          { id : 6, component: 'AutreGerant'},
          { id : 7, component: 'Fonds'},
        ],
        ImmatriculationEURL: [
          { id : 1, component: 'Questions', company: 'SARL'},
          { id : 4, component: 'Activite', cerfa: 'M0'},
          { id : 8, component: 'Fiscal', company: 'EURL'},
          { id : 2, component: 'SiegeAilleurs'},
          { id : 3, component: 'NomEnseigne', cerfa: 'M0'},
          { id : 5, component: 'EffectifM0'},
          { id : 6, component: 'AutreGerant'},
          { id : 7, component: 'Fonds'},
          { id : 9, component: 'Appui'},
        ],
        ImmatriculationSELARL: [
          { id : 1, component: 'Questions', company: 'SARL'},
          { id : 2, component: 'Activite', cerfa: 'M0'},
          { id : 3, component: 'Fiscal', company: 'SARL'},
          { id : 4, component: 'SiegeAilleurs'},
          { id : 5, component: 'NomEnseigne', cerfa: 'M0'},
          { id : 6, component: 'EffectifM0'},
          { id : 7, component: 'AutreGerant'},
          { id : 8, component: 'Liberal', company: 'SELARL'},
        ],
        ImmatriculationSCI: [
          { id : 1, component: 'Questions', company: 'SCI'},
          { id : 8, component: 'Fiscal', company: 'SCI'},
          { id : 2, component: 'SiegeAilleurs'},
          { id : 5, component: 'EffectifM0'},
          { id : 6, component: 'Liberal', company: 'SCI'}
        ],
        ImmatriculationSAS: [
          { id : 1, component: 'Questions', company: 'SARL'},
          { id : 4, component: 'Activite', cerfa: 'M0'},
          { id : 8, component: 'Fiscal', company: 'SARL'},
          { id : 2, component: 'SiegeAilleurs'},
          { id : 3, component: 'NomEnseigne', cerfa: 'M0'},
          { id : 5, component: 'EffectifM0'},
          { id : 7, component: 'Fonds'},
        ],
        ImmatriculationSELAS: [
          { id : 1, component: 'Questions', company: 'SARL'},
          { id : 4, component: 'Activite', cerfa: 'M0'},
          { id : 8, component: 'Fiscal', company: 'SARL'},
          { id : 2, component: 'SiegeAilleurs'},
          { id : 3, component: 'NomEnseigne', cerfa: 'M0'},
          { id : 5, component: 'EffectifM0'},
          { id : 6, component: 'AutreGerant'},
          { id : 7, component: 'Fonds'},
          { id : 9, component: 'Liberal'},
        ],
        // Sans actes
        TransfertEtabPrincipalMemeRessort: [
          { id : 2, component: 'EtabFermeTransfert', version : 'transfert'},
          { id : 3, component: 'EtabCreeModif', version : 'cree'},

          { id : 4, component: 'NomEnseigne'},
          { id : 5, component: 'Activite', cerfa: 'M2'},
          { id : 6, component: 'Effectif', cerfa: 'M2'},
          { id : 7, component: 'Observations'},
        ],
        TransfertEtabPrincipalAutreRessort: [
          { id : 1, component: 'EtabFermeTransfert', version : 'transfert'},
          { id : 2, component: 'Fonds'},
          
          { id : 3, component: 'NomEnseigne'},
          { id : 4, component: 'Activite', cerfa: 'M2'},
          { id : 5, component: 'Effectif', cerfa: 'M2'},
          { id : 6, component: 'Observations'},
        ],
        FermetureEtabSecondaireComplementaire: [
          { id : 1, component: 'EtabFermeTransfert', version : 'ferme'},
          { id : 2, component: 'Observations'}
        ],
        OuvertureEtabComplementaire: [
          { id : 1, component: 'EtabCreeModif', version: 'cree'},
          { id : 2, component: 'Fonds'},

          { id : 3, component: 'NomEnseigne'},
          { id : 4, component: 'Activite', cerfa: 'M2'},
          { id : 5, component: 'Effectif', cerfa: 'M2'},
          { id : 6, component: 'Observations'}
        ],
        OuvertureEtabSecondaire: [
          { id : 1, component: 'EtabCreeModif', version: 'cree'},
          { id : 2, component: 'Fonds'},
          
          { id : 3, component: 'NomEnseigne'},
          { id : 4, component: 'Activite', cerfa: 'M2'},
          { id : 5, component: 'Effectif', cerfa: 'M2'},
          { id : 6, component: 'Observations'}
        ],
        PriseActivite: [
          { id : 1, component: 'EtabCreeModif', version: 'modif'},
          { id : 2, component: 'Fonds'},
          { id : 3, component: 'NomEnseigne'},
          { id : 4, component: 'Activite', cerfa: 'M2'},
          { id : 5, component: 'Effectif', cerfa: 'M2'},
          { id : 6, component: 'Observations'}
        ],
        NomEnseigne: [
          { id : 1, component: 'NomEnseigne'},
          { id : 2, component: 'Observations'}
        ],
        MiseEnSommeil: [
          { id : 2, component: 'EtabFermeTransfert', version : 'ferme'},
          { id : 3, component: 'Observations'},
          { id : 4, component: 'Sommeil'}
        ],
        Observation: [
          { id : 1, component: 'Observations'}
        ],
        TransfertSiege: [
          { id : 1, component: 'Siege'},
          { id : 4, component: 'Observations'}
        ]
      };
    },
  }
};
</script>

<style>
  .compact-form {
    transform: scale(0.875);
}
</style>