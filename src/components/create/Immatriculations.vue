<template>
    <v-container>
        <v-card
        class="rounded-xl mt-5"
        width="500"
        color="white"
        :elevation="12">
            <v-card-title 
            class="font-weight-black" style="font-size: 20px"
            >Immatriculation
            </v-card-title>
                <v-card-text  
                class="mt-0 pt-2 mb-0 pb-0 pr-0">
      <v-chip-group v-model="immat_model" column active-class="accent--text">
        <v-chip v-for="item in infoImmat" 
        :value=item.key
        :key="item.key"
        @click="openDialog()"
        >{{item.name}}
        </v-chip>
        </v-chip-group>
        <div v-show="show">
        <v-row class="mb-0 mt-0 ml-3 pt-0 pb-0" align="center">
        Le commissaire aux comptes a été désigné
        <v-switch v-model="immat_extra" value="CAC"></v-switch>
        </v-row>
        <v-row class="mb-0 mt-0 ml-3 pt-0 pb-0" align="center" v-show="merge.includes('5') || merge.includes('6') || merge.includes('7')">
        Le conjoint du gérant est collaborateur dans l'entreprise
        <v-switch v-model="immat_extra" value="Conjoint-collab"></v-switch>
        </v-row>
        <v-row class="mb-0 mt-0 ml-3 pt-0 pb-0" align="center">
        La nomination du représentant légal n'est pas dans les statuts
        <v-switch v-model="immat_extra" value="Nomination"></v-switch>
        </v-row>
        <v-row class="mb-0 mt-0 ml-3 pt-0 pb-0" align="center">
        Il s'agit d'une reprise d'activité (fonds, activité libérale, location-gérance, etc...)
        <v-switch v-model="immat_extra" value="Reprise"></v-switch>
        </v-row>
        <v-btn @click="addToFormalities(merge)"></v-btn>
        {{merge}}
        </div>
    </v-card-text>
    </v-card>
</v-container>
</template>

<script>
export default {
    props: ['company', 'items_formalities'],
    data () {  
    return {
        immat_model: [],
        selectedFormalite : null,
        selectedModif : null,
        response: [],
        show: false,
        lastItem: null,
        expanded: false,
        selectedItem: null,
        immat_extra: [],
        active: null,
        additionalFields: [],
        documents: [],
        cac: false
        }
    },
    computed: {
        infoImmat(){ 
            return this.items_formalities.filter(i => i.group === 'immat')
        },
        otherDocs(){
            return this.other_docs.filter(i => i.is === true)
        },
        merge() {
            var newArray = []
            newArray = [...this.immat_model, ...this.immat_extra]
            return newArray    
        }
    },
    methods: {
        openDialog(){
            this.show = true
        },
        addToFormalities(a) {
            this.picked_formalities = a
            console.log(this.picked_formalities)
            this.$store.dispatch('addFormality', {
                formalities : this.picked_formalities
            })
        }
    }
}
</script>