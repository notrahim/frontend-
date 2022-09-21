<template>
    <v-card>
        <v-container>
        <v-row class="pa-2 pt-0" align="center">
        <v-card-title>Fonds de commerce</v-card-title>
        <v-checkbox color="accent" v-model="switch_fonds"></v-checkbox>
      </v-row>
      <div v-show="switch_fonds">
      <v-container>
        <v-radio-group
        v-model="rowFonds" row>
        <v-radio label="Création"
        value="creation" color="accent"></v-radio>
        <v-radio label="Location gérance"
        value="location" color="accent"></v-radio>
        <v-radio label="Gérance mandat"
        value="gerancemandat"></v-radio>
        <v-radio label="Achat, apport, reprise, autre"
        value="achat" color="accent"></v-radio>
        </v-radio-group>
      </v-container>

      <v-row v-show="rowFonds=='achat'"><FondAchat ref="FondAchatForm"/></v-row>
      <v-row v-show="rowFonds=='location'"><FondLocGerance ref="LocGerForm"/></v-row>
      <v-row v-show="rowFonds=='gerancemandat'"><FondGerMandat ref="GerMandatForm"/></v-row>
<!-- 
    <v-row v-show="rowFonds=='location'"><FondLocGerance ref="LocGerForm"/></v-row>
    <v-row v-show="rowFonds=='gérancemandat'"><FondLocGerance ref="FondGeranceForm"/></v-row> -->
    </div>
</v-container>
</v-card>
</template>

<script>   
    export default {
        props: ['id'],
        components: {
            FondLocGerance: () =>
            import("@/components/popup/popup/FondLocGerance.vue"),
            FondAchat: () =>
            import("@/components/popup/popup/FondAchat.vue"),
            FondGerMandat: () =>
            import("@/components/popup/popup/FondGerMandat.vue")
        },
        data() {
            return {
                box_location: false,
                box_gerance: false,
                box_else: false,
                switch_fonds: false,
                rowFonds: null,
            }
        },
        computed: {
            postData() {
            const data = {
                fonds_row : this.rowFonds,
                ...this.$refs.FondAchatForm.postData,
                ...this.$refs.LocGerForm.postData,
                ...this.$refs.GerMandatForm.postData

                // ...this.$refs.LocGerForm.postData,
                // ...this.$refs.FondGeranceForm.postData,
                };
                return data
            },
        },
        methods: {
            reset() {
                this.$refs.form.reset()
            }
        }
    };
</script>