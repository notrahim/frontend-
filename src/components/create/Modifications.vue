<template>
    <v-container>
    <v-card
      class="rounded-xl mt-5"
      width="500"
      color="white"
      :elevation="12"
      >
      <v-card-title class="font-weight-black" style="font-size: 20px"
      >Choisir une formalité 
      <v-tooltip class="pl-3" right>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-on="on">mdi-comment-question-outline</v-icon>
        </template>
        <span>Effectuez en une fois tous les formalités présentes dans un seul PV d'AG</span>
        </v-tooltip>
    </v-card-title>
      <v-card-text class="ma-3">
        <v-row>
          <v-col>
            <v-row><h3>Transfert de siège</h3></v-row>
            <v-row>
                <v-chip-group v-model="model_item" multiple outlined column active-class="accent--text">
                    <v-chip v-for="item in infoCap" :value=item.key :key="item.key">{{item.name}}</v-chip>
                </v-chip-group>
            </v-row>
            <v-row><h3>Capital social</h3></v-row>
            <v-row>
                <v-chip-group v-model="model_item" multiple outlined column active-class="accent--text">
                    <v-chip v-for="item in infoSiege" :value=item.key :key="item.key">{{item.name}}</v-chip>
                </v-chip-group>
            </v-row>
            <v-row><h3>Objet social</h3></v-row>
            <v-row>
                <v-chip-group v-model="model_item" multiple outlined column active-class="accent--text">
                    <v-chip v-for="item in infoObjet" :value=item.key :key="item.key">{{item.name}}</v-chip>
                </v-chip-group>
            </v-row>
            <v-row><h3>Dissolution</h3></v-row>
            <v-row>
                <v-chip-group v-model="model_item" multiple outlined column active-class="accent--text">
                    <v-chip v-for="item in infoDisso" :value=item.key :key="item.key">{{item.name}}</v-chip>
                </v-chip-group>
            </v-row>
            <v-row><h3>Autres formalités</h3></v-row>
            <v-row>
                <v-chip-group v-model="model_item" outlined column multiple active-class="accent--text">
                    <v-chip v-for="item in infoAutre" :value=item.key :key="item.key">{{item.name}}</v-chip>
                </v-chip-group>
            </v-row>
          </v-col>
        </v-row>
      <v-btn @click="addToFormalities(model_item)"></v-btn>
    </v-card-text>
  </v-card>
</v-container>
</template>

<script>
    export default {
      props: ['company', 'items_formalities'],
      data () {  
        return {
        model_item: [],
        picked_formalities: []
        }
      },
      computed: {
        infoSiege(){ 
            return this.items_formalities.filter(i => i.group === 'siege')
        },
        infoCap(){ 
            return this.items_formalities.filter(i => i.group === 'cap')
        },
        infoObjet(){ 
            return this.items_formalities.filter(i => i.group === 'objet')
        },
        infoDisso(){ 
            return this.items_formalities.filter(i => i.group === 'disso')
        },
        infoAutre() { 
            return this.items_formalities.filter(i => i.group === 'autre')
        },
      },
      methods: {
        addToFormalities(a) {
            this.picked_formalities = a
            this.$store.dispatch('addFormality', {
                formalities : this.picked_formalities,
            })
        }
      }
    }
</script>