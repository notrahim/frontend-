<template>
    <div>
        <v-card
        class="rounded-xl mt-5"
        width="500"
        color="white"
        :elevation="hover ? 0 : 12"
        :class="{ 'on-hover': hover }">
        <v-card-title class="font-weight-black" style="font-size: 20px"
        >Documents nécessaires</v-card-title>
        <v-card-text class="mt-0 pt-2 mb-0 pb-0 pr-0">
            <v-chip-group v-for="i in document_list" :key="i">
                {{i}} 
            <v-chip v-if="i.includes('cap_reducPertes')">1</v-chip>
            <v-chip v-if="i.includes('siege_horsRessort')">2</v-chip>
            <v-chip v-if="i.includes('disso_Simple')">3</v-chip>
            <v-chip v-if="i.includes('cap_augNature')">4</v-chip>
            <v-chip v-if="i.includes('cap_moitieCapital')">5</v-chip>
            <v-chip v-if="i.includes('cap_reducSansPerte')">6</v-chip>
            <v-chip v-if="i.includes('disso_Simple')">7</v-chip>
            <v-chip v-if="i.includes('obetSoc_SansModif')">8</v-chip>
            <v-chip v-if="i.includes('disso_Main')">9</v-chip>
            <v-chip v-if="i.includes('denom')">10</v-chip>
            <v-chip v-if="i.includes('forme')">11</v-chip>
            <v-chip v-if="i.includes('cloture')">12</v-chip>
            <v-chip v-if="i.includes('duree')">13</v-chip>
            <v-chip v-if="i.includes('nomCom')">14</v-chip>
        </v-chip-group>
            
        </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    computed: {
        document_list() {
            return this.$store.state.formalities.doc_list[0]
        },
    },
}
</script>

[ 
"", 
"cap_augNumeraire", 
"siege_horsRessort", 
"disso_Simple", 
"cap_augNature", 
"cap_reducSansPerte", 
"cap_reconstPropres", 
"cap_moitieCapital", 
"siege_memeRessort", 
"obetSoc_Modif", 
"obetSoc_SansModif", 
"disso_Main", 
"denom", 
"forme", 
"cloture", 
"duree", 
"nomCom" 
]